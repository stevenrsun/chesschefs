import React, { Component } from "react";
import Square from "./square";

class Chessboard extends Component {
  state = {};
  styles = {
    board: {
      width: "512px",
      height: "512px",
    },
    square: {
      width: "64px",
      height: "64px",
    },
  };
  render() {
    return (
      <div class="container ml-4">
        <div class="row" style={this.styles.board}>
          <div class="col-sm-1" style={this.styles.square}>
            <Square isLight={true} />
            <Square isLight={false} />
            <Square isLight={true} />
            <Square isLight={false} />
            <Square isLight={true} />
            <Square isLight={false} />
            <Square isLight={true} />
            <Square isLight={false} />
          </div>
          <div class="col-sm-1" style={this.styles.square}>
            <Square isLight={false} />
            <Square isLight={true} />
            <Square isLight={false} />
            <Square isLight={true} />
            <Square isLight={false} />
            <Square isLight={true} />
            <Square isLight={false} />
            <Square isLight={true} />
          </div>
          <div class="col-sm-1" style={this.styles.square}>
            <Square isLight={true} />
            <Square isLight={false} />
            <Square isLight={true} />
            <Square isLight={false} />
            <Square isLight={true} />
            <Square isLight={false} />
            <Square isLight={true} />
            <Square isLight={false} />
          </div>
          <div class="col-sm-1" style={this.styles.square}>
            <Square isLight={false} />
            <Square isLight={true} />
            <Square isLight={false} />
            <Square isLight={true} />
            <Square isLight={false} />
            <Square isLight={true} />
            <Square isLight={false} />
            <Square isLight={true} />
          </div>
          <div class="col-sm-1" style={this.styles.square}>
            <Square isLight={true} />
            <Square isLight={false} />
            <Square isLight={true} />
            <Square isLight={false} />
            <Square isLight={true} />
            <Square isLight={false} />
            <Square isLight={true} />
            <Square isLight={false} />
          </div>
          <div class="col-sm-1" style={this.styles.square}>
            <Square isLight={false} />
            <Square isLight={true} />
            <Square isLight={false} />
            <Square isLight={true} />
            <Square isLight={false} />
            <Square isLight={true} />
            <Square isLight={false} />
            <Square isLight={true} />
          </div>
          <div class="col-sm-1" style={this.styles.square}>
            <Square isLight={true} />
            <Square isLight={false} />
            <Square isLight={true} />
            <Square isLight={false} />
            <Square isLight={true} />
            <Square isLight={false} />
            <Square isLight={true} />
            <Square isLight={false} />
          </div>
          <div class="col-sm-1" style={this.styles.square}>
            <Square isLight={false} />
            <Square isLight={true} />
            <Square isLight={false} />
            <Square isLight={true} />
            <Square isLight={false} />
            <Square isLight={true} />
            <Square isLight={false} />
            <Square isLight={true} />
          </div>
        </div>
      </div>
    );
  }
}

export default Chessboard;
