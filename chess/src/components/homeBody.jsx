import React, { Component } from "react";
import chessboard from "./pictures/3DChessboard.gif";

class HomeBody extends Component {
  state = {};
  styles = {
    marginTop: 0,
    textAlign: "center",
    padding: 100,
    fontSize: 72,
    fontFamily: "Times New Roman",
    marginLeft: 570,
  };
  render() {
    return (
      <div>
        <img
          style={this.styles}
          src={chessboard}
          alt=""
          height="500"
          width="500"
        />
      </div>
    );
  }
}

export default HomeBody;
