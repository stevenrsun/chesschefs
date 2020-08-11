import React, { Component } from 'react';
import { Link } from "react-router-dom";
import logo from '../pictures/Logo.png'

class NavBar extends Component {
    state = {};
    render() {
        return (
            <div className="wrapper">
                <div class="sidebar">
                    <Link to="/">
                        <img className="undraggable logo" src={logo} alt="" />
                    </Link>
                    <div class="misc"></div>
                </div>
            </div>


        );
    }
}

export default NavBar;