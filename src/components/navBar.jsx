import React, { Component } from 'react';
import {Link} from 'react-router-dom';

class NavBar extends Component {
    state = {};
    render() {
        return (
            <nav class="navbackground navbar">
                <ul class="navbar-nav ml-auto justify-content-right" style={{listStyleType: "none"}}>
                    <li class="navhead">
                        BestChess
                    </li>
                    <li class="nav">
                        Sign In
                    </li>
                </ul>
            </nav>
        );
    }
}

export default NavBar;