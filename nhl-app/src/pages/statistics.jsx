import React, { useState, useEffect } from "react";
import axios from "axios";
import SeasonDropdown from "../components/SeasonDropdown";
import Navbar from "../components/Navbar";

function Statistics() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState([]);
  const [seasonId, setSeasonId] = useState("20232024");
  //   const [columnHeaders, setColumnHeaders] = useState([]);
  const [selectedTeams, setSelectedTeams] = useState([]);
  const [teamNames, setTeamNames] = useState([]);

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

  const getColumnHeaders = (data) => {
    if (!data.length) return [];
    return Object.keys(data[0]);
  };

  const columnHeaders = getColumnHeaders(data);
  //   if (columnHeadersLocal) {
  //     setColumnHeaders(columnHeadersLocal);
  //   }

  const handleSeasonChange = (e) => {
    setSeasonId(e.target.value);
  };

  const handleTeamSelect = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setSelectedTeams([...selectedTeams, value]);
    } else {
      setSelectedTeams(selectedTeams.filter((team) => team !== value));
    }
  };

  const filteredData = data.filter((team) =>
    selectedTeams.includes(team.teamFullName)
  );

  console.log("Data Recieved", data);

  return (
    <div>
      <Navbar />
      <h3>All Statistics</h3>
      {seasonId && ( // Check if seasonId is defined before rendering SeasonDropdown
        <SeasonDropdown
          seasonId={seasonId}
          handleSeasonChange={handleSeasonChange}
        />
      )}
      <div>
        <label>
          Select Teams:
          {teamNames.map((team) => (
            <label key={team}>
              <input
                type="checkbox"
                value={team}
                checked={selectedTeams.includes(team)}
                onChange={handleTeamSelect}
              />
              {team}
            </label>
          ))}
          <label>
            <input
              type="checkbox"
              checked={selectedTeams.length === teamNames.length}
              onChange={(e) => {
                if (e.target.checked) {
                  setSelectedTeams(teamNames);
                } else {
                  setSelectedTeams([]);
                }
              }}
            />
            Select All
          </label>
        </label>
      </div>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}
      {!loading && !error && (
        <table>
          <thead>
            <tr>
              {columnHeaders.map((header) => (
                <th key={header}>{header}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filteredData.map((team, index) => (
              <tr key={index}>
                {columnHeaders.map((header) => (
                  <td key={header}>{team[header]}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default Statistics;
