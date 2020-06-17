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

  handleClick = (coords, e) => {
    e.preventDefault();
    console.log("clicked on a square: " + coords[0] + ", " + coords[1])
  }

  render() {
    return (
      <div class="container ml-4">
        <div class="row" style={this.styles.board}>
          <div class="col-sm-1" style={this.styles.square}>
            <Square isLight={true} onClick={this.handleClick} coords={[0,0]}/>
            <Square isLight={false} onClick={this.handleClick} coords={[1,0]}/>
            <Square isLight={true} onClick={this.handleClick} coords={[2,0]}/>
            <Square isLight={false} onClick={this.handleClick} coords={[3,0]}/>
            <Square isLight={true} onClick={this.handleClick} coords={[4,0]}/>
            <Square isLight={false} onClick={this.handleClick} coords={[5,0]}/>
            <Square isLight={true} onClick={this.handleClick} coords={[6,0]}/>
            <Square isLight={false} onClick={this.handleClick} coords={[7,0]}/>
          </div>
          <div class="col-sm-1" style={this.styles.square}>
            <Square isLight={false} onClick={this.handleClick} coords={[0,1]}/>
            <Square isLight={true} onClick={this.handleClick} coords={[1,1]}/>
            <Square isLight={false} onClick={this.handleClick} coords={[2,1]}/>
            <Square isLight={true} onClick={this.handleClick} coords={[3,1]}/>
            <Square isLight={false} onClick={this.handleClick} coords={[4,1]}/>
            <Square isLight={true} onClick={this.handleClick} coords={[5,1]}/>
            <Square isLight={false} onClick={this.handleClick} coords={[6,1]}/>
            <Square isLight={true} onClick={this.handleClick} coords={[7,1]}/>
          </div>
          <div class="col-sm-1" style={this.styles.square}>
            <Square isLight={true} onClick={this.handleClick} coords={[0,2]}/>
            <Square isLight={false} onClick={this.handleClick} coords={[1,2]}/>
            <Square isLight={true} onClick={this.handleClick} coords={[2,2]}/>
            <Square isLight={false} onClick={this.handleClick} coords={[3,2]}/>
            <Square isLight={true} onClick={this.handleClick} coords={[4,2]}/>
            <Square isLight={false} onClick={this.handleClick} coords={[5,2]}/>
            <Square isLight={true} onClick={this.handleClick} coords={[6,2]}/>
            <Square isLight={false} onClick={this.handleClick} coords={[7,2]}/>
          </div>
          <div class="col-sm-1" style={this.styles.square}>
            <Square isLight={false} onClick={this.handleClick} coords={[0,3]}/>
            <Square isLight={true} onClick={this.handleClick} coords={[1,3]}/>
            <Square isLight={false} onClick={this.handleClick} coords={[2,3]}/>
            <Square isLight={true} onClick={this.handleClick} coords={[3,3]}/>
            <Square isLight={false} onClick={this.handleClick} coords={[4,3]}/>
            <Square isLight={true} onClick={this.handleClick} coords={[5,3]}/>
            <Square isLight={false} onClick={this.handleClick} coords={[6,3]}/>
            <Square isLight={true} onClick={this.handleClick} coords={[7,3]}/>
          </div>
          <div class="col-sm-1" style={this.styles.square}>
            <Square isLight={true} onClick={this.handleClick} coords={[0,4]}/>
            <Square isLight={false} onClick={this.handleClick} coords={[1,4]}/>
            <Square isLight={true} onClick={this.handleClick} coords={[2,4]}/>
            <Square isLight={false} onClick={this.handleClick} coords={[3,4]}/>
            <Square isLight={true} onClick={this.handleClick} coords={[4,4]}/>
            <Square isLight={false} onClick={this.handleClick} coords={[5,4]}/>
            <Square isLight={true} onClick={this.handleClick} coords={[6,4]}/>
            <Square isLight={false} onClick={this.handleClick} coords={[7,4]}/>
          </div>
          <div class="col-sm-1" style={this.styles.square}>
            <Square isLight={false} onClick={this.handleClick} coords={[0,5]}/>
            <Square isLight={true} onClick={this.handleClick} coords={[1,5]}/>
            <Square isLight={false} onClick={this.handleClick} coords={[2,5]}/>
            <Square isLight={true} onClick={this.handleClick} coords={[3,5]}/>
            <Square isLight={false} onClick={this.handleClick} coords={[4,5]}/>
            <Square isLight={true} onClick={this.handleClick} coords={[5,5]}/>
            <Square isLight={false} onClick={this.handleClick} coords={[6,5]}/>
            <Square isLight={true} onClick={this.handleClick} coords={[7,5]}/>
          </div>
          <div class="col-sm-1" style={this.styles.square}>
            <Square isLight={true} onClick={this.handleClick} coords={[0,6]}/>
            <Square isLight={false} onClick={this.handleClick} coords={[1,6]}/>
            <Square isLight={true} onClick={this.handleClick} coords={[2,6]}/>
            <Square isLight={false} onClick={this.handleClick} coords={[3,6]}/>
            <Square isLight={true} onClick={this.handleClick} coords={[4,6]}/>
            <Square isLight={false} onClick={this.handleClick} coords={[5,6]}/>
            <Square isLight={true} onClick={this.handleClick} coords={[6,6]}/>
            <Square isLight={false} onClick={this.handleClick} coords={[7,6]}/>
          </div>
          <div class="col-sm-1" style={this.styles.square}>
            <Square isLight={false} onClick={this.handleClick} coords={[0,7]}/>
            <Square isLight={true} onClick={this.handleClick} coords={[1,7]}/>
            <Square isLight={false} onClick={this.handleClick} coords={[2,7]}/>
            <Square isLight={true} onClick={this.handleClick} coords={[3,7]}/>
            <Square isLight={false} onClick={this.handleClick} coords={[4,7]}/>
            <Square isLight={true} onClick={this.handleClick} coords={[5,7]}/>
            <Square isLight={false} onClick={this.handleClick} coords={[6,7]}/>
            <Square isLight={true} onClick={this.handleClick} coords={[7,7]}/>
          </div>
        </div>
      </div>
    );
  }
}

export default Chessboard;
