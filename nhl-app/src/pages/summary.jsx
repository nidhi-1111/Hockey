import React, { useState, useEffect } from "react";
import axios from "axios";
import TeamCards from "../components/TeamCards";
import "../styles/summary.css";

function Summary() {
  const [seasonId, setSeasonId] = useState("20232024"); // Default seasonId
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [sortKey, setSortKey] = useState("points");

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `/stats/rest/en/team/summary?isAggregate=false&isGame=false&sort=%5B%7B%22property%22:%22points%22,%22direction%22:%22DESC%22%7D,%7B%22property%22:%22wins%22,%22direction%22:%22DESC%22%7D,%7B%22property%22:%22teamId%22,%22direction%22:%22ASC%22%7D%5D&start=0&limit=50&cayenneExp=gameTypeId=3%20and%20seasonId%3C=${seasonId}%20and%20seasonId%3E=${seasonId}`
        );
        setData(response.data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [seasonId]);

  console.log("Data Recieved", data);

  const handleSeasonChange = (e) => {
    setSeasonId(e.target.value);
  };

  const handleSortKeyChange = (e) => {
    setSortKey(e.target.value);
    renderCards();
  };

  const sortData = (data) => {
    return data.sort((a, b) => {
      if (a[sortKey] === b[sortKey]) {
        return a["pointPercentage"] < b["pointPercentage"] ? 1 : -1; //If any 2 teams have similar then it will look at Point Percentage
      }
      return a[sortKey] < b[sortKey] ? 1 : -1; //By Default set for descending
    });
  };

  const renderCards = () => {
    if (!data) return null;

    const dataArray = Object.values(data);

    const extractedData = dataArray[0].map((item) => ({
      gamesPlayed: item.gamesPlayed,
      losses: item.losses,
      wins: item.wins,
      points: item.points,
      pointPercentage: item.pointPct,
      teamFullName: item.teamFullName,
    }));

    const sortedData = sortData(extractedData);

    return (
      <div className="card-container">
        {sortedData.map((team, index) => (
          <TeamCards key={index} team={team} seasonId={seasonId} />
        ))}
      </div>
    );
  };

  return (
    <div>
      <h3>Summary Page</h3>
      <label htmlFor="seasonIdSelect">Select Season ID:</label>
      <select
        id="seasonIdSelect"
        value={seasonId}
        onChange={handleSeasonChange}
      >
        <option value="20222023">2022-2023</option>
        <option value="20232024">2023-2024</option>
        <option value="20212022">2021-2022</option>
        {/* Add more options as needed */}
      </select>

      <label htmlFor="sortBy">Sort By</label>
      <select id="sortKeySelect" value={sortKey} onChange={handleSortKeyChange}>
        <option value="points">Points</option>
        <option value="gamesPlayed">Games Played</option>
        <option value="wins">Wins</option>
        <option value="losses">Losses</option>
        {/* Add more options as needed */}
      </select>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}
      {data && renderCards()}
    </div>
  );
}

export default Summary;
