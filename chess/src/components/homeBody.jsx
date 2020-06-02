import React, { Component } from "react";
import chessboard from "./pictures/3DChessboard.gif";

class HomeBody extends Component {
  state = {};
  render() {
    return (
      <a href="https://www.google.com/">
        <img className="undraggable chessboard" src={chessboard} alt="" />
      </a>
    );
  }
}

export default HomeBody;
