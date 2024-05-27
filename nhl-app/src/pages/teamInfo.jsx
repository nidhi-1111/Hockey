import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import SeasonDropdown from "../components/SeasonDropdown";
import Navbar from "../components/Navbar";
import TeamDropdown from "../components/TeamDropdown";
import "../styles/teamInfo.css";

function Teams() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [teamData, setTeamData] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();
  const { teamName } = useParams();
  const queryParams = new URLSearchParams(location.search);
  const initialSeasonId = queryParams.get("seasonId") || "20232024"; // Default to "20232024" if not provided

  const [allTeams, setAllTeams] = useState([]);
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
        setAllTeams(dataArray[0]);
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
    if (!teamData) return null;

    const fieldsToRender = {
      gamesPlayed: "Games Played",
      points: "Points",
      wins: "Wins",
      losses: "Losses",
      ties: "Ties",
      otLosses: "OT Losses",
      goalsAgainst: "Goals Against",
      goalsFor: "Goals For",
      pointPct: "Point %",
      winsInRegulation: "Wins in Regulation",
      winsInShootout: "Wins in Shootout",
      faceoffWinPct: "Faceoff Win%",
    };

    return (
      <div className="team-card-page">
        <div className="team-card">
          {Object.entries(fieldsToRender).map(([key, label]) => (
            <div className="team-values" key={key}>
              <p className="team-numbers">
                {teamData[key] !== null
                  ? key === "pointPct" || key === "faceoffWinPct"
                    ? Number(teamData[key]).toFixed(2)
                    : teamData[key]
                  : "0"}
              </p>
              <p className="team-labels">{label}</p>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="main-container">
      <Navbar title={teamNameLocal} seasonId={seasonId} />
      <div className="summary-container">
        <div className="dropdown">
          {seasonId && ( // Check if seasonId is defined before rendering SeasonDropdown
            <SeasonDropdown
              seasonId={seasonId}
              handleSeasonChange={handleSeasonChange}
            />
          )}
          <TeamDropdown
            teamName={teamName}
            handleTeamNameChange={handleTeamNameChange}
            allTeams={allTeams}
          />
        </div>
        {teamData && renderTeamData()}
      </div>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}
    </div>
  );
}

export default Teams;
