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
            <div className="card-values">
              <p className="card-numbers">{props.team.gamesPlayed}</p>
              <p className="card-labels">Games</p>
            </div>
            <div className="card-values">
              <p className="card-numbers">{props.team.wins}</p>
              <p className="card-labels">Wins</p>
            </div>
            <div className="card-values">
              <p className="card-numbers">{props.team.losses}</p>
              <p className="card-labels">Losses</p>
            </div>
            <div className="card-values">
              <p className="card-numbers">{props.team.points}</p>
              <p className="card-labels">Points</p>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}

export default TeamCards;
