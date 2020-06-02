import React, { Component } from "react";
import chessboard from "../pictures/3DChessboard.gif";
import {NavLink} from 'react-router-dom';

class Home extends Component {
  state = {};
  render() {
    return (
      <React.Fragment>
        <h1 className="head">BestChess</h1>
        <a href="https://www.google.com/">
          <img className="undraggable chessboard" src={chessboard} alt="" />
        </a>
        <NavLink to="/Game"> TEST </NavLink>
      </React.Fragment>
    );
  }
}

export default Home;
