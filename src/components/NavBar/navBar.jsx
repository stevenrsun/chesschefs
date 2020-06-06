import React, { Component } from 'react';
import { Link } from "react-router-dom";

class NavBar extends Component {
    state = {};
    render() {
        return (
        <nav className="navbackground navbar">
            <ul
            className="navbar-nav ml-auto justify-content-right"
            style={{ listStyleType: "none" }}
            >
            <li className="navhead">
                <Link to="/" class="navbar-link">BestChess</Link>
            </li>
            <li className="nav">
                <Link to="/login" class="navbar-link">Sign In</Link>
            </li>
            <li className="nav">
                <Link to="/signup" class="navbar-link">Sign Up</Link>
            </li>
            </ul>
        </nav>
        );
    }
}

export default NavBar;