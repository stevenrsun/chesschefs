import React, { Component } from 'react';
import { Link } from "react-router-dom";
import SignOutButton from '../Authentication/signOut';
import { AuthUserContext } from '../Session';

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
            </ul>
        </nav>
        );
    }
}

export default NavBar;