import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate, useLocation } from "react-router-dom";

function Teams() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [teamData, setTeamData] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();
  const { teamName } = useParams();
  const queryParams = new URLSearchParams(location.search);
  const initialSeasonId = queryParams.get("seasonId") || "20232024"; // Default to "20232024" if not provided

  const [seasonId, setSeasonId] = useState(initialSeasonId);
  const [teamNameLocal, setTeamNameLocal] = useState(
    decodeURIComponent(teamName)
  );

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `/stats/rest/en/team/summary?isAggregate=false&isGame=false&sort=%5B%7B%22property%22:%22points%22,%22direction%22:%22DESC%22%7D,%7B%22property%22:%22wins%22,%22direction%22:%22DESC%22%7D,%7B%22property%22:%22teamId%22,%22direction%22:%22ASC%22%7D%5D&start=0&limit=50&cayenneExp=gameTypeId=3%20and%20seasonId%3C=${seasonId}%20and%20seasonId%3E=${seasonId}`
        );

        const dataArray = Object.values(response.data);
        const teamData = dataArray[0].find(
          (team) => team.teamFullName === decodeURIComponent(teamNameLocal)
        );
        setTeamData(teamData);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [seasonId, teamNameLocal, teamName]);

  //Function Triggered when drop down for teams clicked
  const handleTeamNameChange = (e) => {
    const newTeamName = e.target.value;
    setTeamNameLocal(newTeamName);
    navigate(`/NHLTeams/${encodeURIComponent(newTeamName)}`);
  };

  //Function Triggered when season Id changed
  const handleSeasonChange = (e) => {
    setSeasonId(e.target.value);
  };

  const renderTeamData = () => {
    if (Object.keys(teamData).length === 0) return null;

    return (
      <div>
        {Object.entries(teamData).map(([key, value]) => (
          <p key={key}>
            <strong>{key}:</strong> {value !== null ? value : "N/A"}
          </p>
        ))}
      </div>
    );
  };

  return (
    <div>
      <select
        id="teamNameSelect"
        value={decodeURIComponent(teamName)}
        onChange={handleTeamNameChange}
      >
        <option value="New York Rangers">New York Rangers</option>
        <option value="Edmonton Oilers">Edmonton Oilers</option>
        <option value="Florida Panthers">Florida Panthers</option>
        {/* Add more options as needed */}
      </select>

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
      <h3>{teamData[0]?.teamFullName}</h3>

      {loading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}
      {teamData && renderTeamData()}
    </div>
  );
}

export default Teams;
