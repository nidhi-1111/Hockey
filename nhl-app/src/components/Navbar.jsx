import React from "react";
import { Link, useLocation } from "react-router-dom";
import NHL_LOGO from "../images/NHL_LOGO.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse, faFileInvoice } from "@fortawesome/free-solid-svg-icons";
import "../styles/navbar.css";

function Navbar(props) {
  const location = useLocation();

  return (
    <div className="navbar">
      <Link
        to={`/NHLSummary?seasonId=${props.seasonId}`}
        className={
          'link-style location.pathname === "/NHLSummary" ? "active-link" : ""'
        }
      >
        <div className="navbar-left">
          <img className="image" src={NHL_LOGO} alt="NHL Logo" />
          <h3 className="navbar-heading">NHL</h3>
        </div>
      </Link>
      <div className="navbar-center">
        <h3>{props.title}</h3>
      </div>
      <div className="navbar-right">
        <Link
          to={`/NHLSummary?seasonId=${props.seasonId}`}
          className={location.pathname === "/NHLSummary" ? "active-link" : ""}
        >
          <FontAwesomeIcon icon={faHouse} className="home-icon" />
        </Link>
        <Link
          to={`/NHLAllStats?seasonId=${props.seasonId}`}
          className={location.pathname === "/NHLAllStats" ? "active-link" : ""}
        >
          <FontAwesomeIcon icon={faFileInvoice} className="home-icon" />
        </Link>
      </div>
    </div>
  );
}

export default Navbar;
