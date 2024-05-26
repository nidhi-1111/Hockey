import React from "react";
import { Link } from "react-router-dom";
import "../styles/teamCards.css";
import Teams from "../pages/teamInfo";

function TeamCards(props) {
  const handleClick = () => {
    <Teams seasonId={props.seasonId} teamName={props.team.teamFullName} />;
  };
  return (
    <Link
      to={`/NHLTeams/${encodeURIComponent(props.team.teamFullName)}?seasonId=${
        props.seasonId
      }`}
      className="card"
    >
      <div className="card" onClick={handleClick}>
        <h2>{props.team.teamFullName}</h2>
        <p>Games Played: {props.team.gamesPlayed}</p>
        <p>Losses: {props.team.losses}</p>
        <p>Wins: {props.team.wins}</p>
        <p>Points: {props.team.points}</p>
        {/* <p>Point Percentage: {team.pointPercentage}</p> */}
      </div>
    </Link>
  );
}

export default TeamCards;
