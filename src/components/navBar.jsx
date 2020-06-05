import React, { Component } from "react";
import { NavLink } from "react-router-dom";

class NavBar extends Component {
  state = {};
  render() {
    return (
      <nav className="navbackground navbar">
        <ul
          className="navbar-nav ml-auto justify-content-right"
          style={{ listStyleType: "none" }}
        >
          <li className="navhead">BestChess</li>
          <li className="nav">
            <NavLink to="/login"> TEST </NavLink>
          </li>
        </ul>
      </nav>
    );
  }
}

export default NavBar;
