import React from "react";
import { Link } from "react-router-dom";
import "../styles/teamCards.css";
import Teams from "../pages/teamInfo";

function TeamCards(props) {
  const handleClick = () => {
    <Teams seasonId={props.seasonId} teamName={props.team.teamFullName} />;
  };
  return (
    <div className="card-page">
      <Link
        to={`/NHLTeams/${encodeURIComponent(
          props.team.teamFullName
        )}?seasonId=${props.seasonId}`}
        className="custom-link"
      >
        <div className="card" onClick={handleClick}>
          <div className="card-heading">
            <h2>{props.team.teamFullName}</h2>
          </div>
          <div className="card-content">
            <p>Games Played: {props.team.gamesPlayed}</p>
            <p>Losses: {props.team.losses}</p>
            <p>Wins: {props.team.wins}</p>
            <p>Points: {props.team.points}</p>
          </div>
          {/* <p>Point Percentage: {team.pointPercentage}</p> */}
        </div>
      </Link>
    </div>
  );
}

export default TeamCards;
