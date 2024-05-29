import React from "react";
import "../styles/SeasonDropdown.css";
function SortBy(props) {
  return (
    <div className="dropdown-container ">
      <label className="dropdownLabel">Sort By : </label>
      <select
        id="sortKeySelect"
        value={props.sortKey}
        onChange={props.handleSortKeyChange}
        className="dropdown-content"
      >
        <option value="points">Points</option>
        <option value="gamesPlayed">Games Played</option>
        <option value="wins">Wins</option>
        <option value="losses">Losses</option>
      </select>
    </div>
  );
}
export default SortBy;
