import React from "react";
import seasonData from "../data/season.json";

function SeasonDropdown(props) {
  return (
    <div>
      <label htmlFor="seasonIdSelect">Select Season ID:</label>
      <select
        id="seasonIdSelect"
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
