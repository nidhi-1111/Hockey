import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import SeasonDropdown from "../components/SeasonDropdown";
import Navbar from "../components/Navbar";
import "../styles/allStats.css";
import { useLocation } from "react-router-dom";

function Statistics() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState([]);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const initialSeasonId = queryParams.get("seasonId") || "20232024";
  const [seasonId, setSeasonId] = useState(initialSeasonId);
  const [selectedTeams, setSelectedTeams] = useState([]);
  const [teamNames, setTeamNames] = useState([]);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `/stats/rest/en/team/summary?isAggregate=false&isGame=false&sort=%5B%7B%22property%22:%22points%22,%22direction%22:%22DESC%22%7D,%7B%22property%22:%22wins%22,%22direction%22:%22DESC%22%7D,%7B%22property%22:%22teamId%22,%22direction%22:%22ASC%22%7D%5D&start=0&limit=50&cayenneExp=gameTypeId=3%20and%20seasonId%3C=${seasonId}%20and%20seasonId%3E=${seasonId}`
        );
        setData(response.data.data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [seasonId]);

  useEffect(() => {
    const names = data.map((team) => team.teamFullName);
    setTeamNames([...new Set(names)]);
    setSelectedTeams([...new Set(names)]);
  }, [data]);

  const headerMapping = {
    teamFullName: "Team",
    gamesPlayed: "GP",
    wins: "W",
    losses: "L",
    otLosses: "OTL",
    goalsFor: "GF",
    goalsAgainst: "GA",
    goalsForPerGame: "GF/G",
    goalsAgainstPerGame: "GA/G",
    shotsForPerGame: "SF/G",
    shotsAgainstPerGame: "SA/G",
    pointPct: "P%",
    points: "Pts",
    powerPlayPct: "PP%",
    powerPlayNetPct: "PP Net%",
    penaltyKillPct: "PK%",
    penaltyKillNetPct: "PK Net%",
    faceoffWinPct: "FO%",
    regulationAndOtWins: "ROW",
    winsInRegulation: "WReg",
  };

  const originalHeaders = Object.keys(headerMapping);
  const columnHeaders = originalHeaders.map((header) => headerMapping[header]);

  const handleSeasonChange = (e) => {
    setSeasonId(e.target.value);
  };

  const handleTeamSelect = (team) => {
    setSelectedTeams((prevSelected) =>
      prevSelected.includes(team)
        ? prevSelected.filter((t) => t !== team)
        : [...prevSelected, team]
    );
  };

  const handleSelectAll = () => {
    if (selectedTeams.length === teamNames.length) {
      setSelectedTeams([]);
    } else {
      setSelectedTeams(teamNames);
    }
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const filteredData = data.filter((team) =>
    selectedTeams.includes(team.teamFullName)
  );

  const formatValue = (value) => {
    if (value === null) {
      return 0;
    }
    if (typeof value === "number" && value % 1 !== 0) {
      return value.toFixed(2);
    }
    return value;
  };

  const renderTable = (data, headers) => (
    <div className="card-container">
      <table className="custom-table">
        <thead>
          <tr>
            {headers.map((header, index) => (
              <th key={index}>{header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((team, index) => (
            <tr key={index} className="table-row">
              {originalHeaders.map((header, headerIndex) => (
                <td key={headerIndex} className="table-cell">
                  {formatValue(team[header])}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  return (
    <div className="main-container">
      <Navbar title="All Stats" seasonId={seasonId} />
      <div className="summary-container">
        <div className="dropdown">
          {seasonId && (
            <SeasonDropdown
              seasonId={seasonId}
              handleSeasonChange={handleSeasonChange}
            />
          )}
          <div className="multi-select-container" ref={dropdownRef}>
            <label className="dropdownLabel">Select Teams : </label>
            <button className="multi-dropdown-button" onClick={toggleDropdown}>
              Select Teams ({selectedTeams.length})
            </button>
            <div
              className={`multi-dropdown-menu ${dropdownOpen ? "show" : ""}`}
              style={{ left: 0 }} // Add this style to position the dropdown to the left
            >
              <div className="dropdown-item select-all-item">
                <input
                  type="checkbox"
                  checked={selectedTeams.length === teamNames.length}
                  onChange={handleSelectAll}
                />
                Select All
              </div>
              {teamNames.map((team) => (
                <div key={team} className="multi-dropdown-item">
                  <label>
                    <input
                      type="checkbox"
                      checked={selectedTeams.includes(team)}
                      onChange={() => handleTeamSelect(team)}
                    />
                    {team}
                  </label>
                </div>
              ))}
            </div>
          </div>
        </div>
        {!loading && !error && renderTable(filteredData, columnHeaders)}
      </div>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}
    </div>
  );
}

export default Statistics;
