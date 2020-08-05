import React, { Component } from 'react';
import { Link } from "react-router-dom";
import SignOutButton from '../Authentication/signOut';
import { AuthUserContext } from '../Session';

const NavBar = ({ authUser }) => (
    <div>
        <AuthUserContext.Consumer>
            {authUser =>
                authUser ? <NavBarAuth /> : <NavBarNonAuth />
            }
        </AuthUserContext.Consumer>
    </div>
  );

class NavBarNonAuth extends Component {
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
                <Link to="/login" class="navbar-link" >Sign In</Link>
            </li>
            <li className="nav">
                <Link to="/signup" class="navbar-link">Sign Up</Link>
            </li>
            </ul>
        </nav>
        );
    }
}

class NavBarAuth extends Component {
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
            <li className="nav" style={{paddingLeft: '75vw'}}>
                <SignOutButton />
            </li>
            </ul>
        </nav>
        );
    }
}

export default NavBar;