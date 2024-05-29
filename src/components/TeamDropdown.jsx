import React from "react";
import "../styles/SeasonDropdown.css";

function TeamDropdown(props) {
  return (
    <div className="dropdown-container">
      <label className="dropdownLabel">Team : </label>
      <select
        id="teamNameSelect"
        value={decodeURIComponent(props.teamName)}
        onChange={props.handleTeamNameChange}
        className="dropdown-content"
      >
        {props.allTeams.map((team) => (
          <option key={team.teamFullName} value={team.teamFullName}>
            {team.teamFullName}
          </option>
        ))}
      </select>
    </div>
  );
}
export default TeamDropdown;
