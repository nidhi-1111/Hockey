import React from "react";
import seasonData from "../data/season.json";
import "../styles/SeasonDropdown.css";

function SeasonDropdown(props) {
  return (
    <div className="dropdown-container">
      <label className="dropdownLabel">Season : </label>
      <select
        id="seasonIdSelect"
        className="dropdown-content"
        value={props.seasonId}
        onChange={props.handleSeasonChange}
      >
        {seasonData.map((season) => (
          <option key={season.value} value={season.value}>
            {season.label}
          </option>
        ))}
      </select>
    </div>
  );
}

export default SeasonDropdown;
