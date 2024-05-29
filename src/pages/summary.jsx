import React, { useState, useEffect } from "react";
import axios from "axios";
import TeamCards from "../components/TeamCards";
import "../styles/summary.css";
import "../styles/global.css";
import SeasonDropdown from "../components/SeasonDropdown";
import Navbar from "../components/Navbar";
import SortBy from "../components/SortBy";
import { useLocation } from "react-router-dom";

function Summary() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const initialSeasonId = queryParams.get("seasonId") || "20232024";
  const [seasonId, setSeasonId] = useState(initialSeasonId);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [sortKey, setSortKey] = useState("points");

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `https://api.nhle.com/stats/rest/en/team/summary?isAggregate=false&isGame=false&sort=%5B%7B%22property%22:%22points%22,%22direction%22:%22DESC%22%7D,%7B%22property%22:%22wins%22,%22direction%22:%22DESC%22%7D,%7B%22property%22:%22teamId%22,%22direction%22:%22ASC%22%7D%5D&start=0&limit=50&cayenneExp=gameTypeId=3%20and%20seasonId%3C=${seasonId}%20and%20seasonId%3E=${seasonId}`
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
    <div className="main-container">
      <Navbar title="Summary" seasonId={seasonId} />
      <div className="summary-container">
        <div className="dropdown">
          {seasonId && ( // Check if seasonId is defined before rendering SeasonDropdown
            <SeasonDropdown
              seasonId={seasonId}
              handleSeasonChange={handleSeasonChange}
            />
          )}
          <SortBy sortKey={sortKey} handleSortKeyChange={handleSortKeyChange} />
        </div>
        {data && renderCards()}
      </div>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}
    </div>
  );
}

export default Summary;
