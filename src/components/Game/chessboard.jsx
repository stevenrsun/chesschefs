import React, { Component } from "react";
import Square from "./square";
import { withFirebase } from "../FireBase";
import * as moveCalc from "./moveCalculator.js";

const Chessboard = ({uid, whiteId, blackId}) => (<ChessboardFinal uid={uid} whiteId={whiteId} blackId={blackId}/>)

class ChessboardBase extends Component {
  constructor(props){
    super(props);

    this.database = this.props.firebase.db;
    this.board = this.database.ref("games/game-ID/board")
    this.mover = this.database.ref("games/game-ID/current_mover")
    this.piece = this.database.ref("games/game-ID/current_piece")

    this.state = {
      currPiece: 0,
      board: [],
      movePool: [],
      legalSquares: [],
      sourceCoords: [],
      currentMover: "white"
    };
  }
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

  componentDidMount() {
    document.addEventListener('mousedown', this.handleClickOutside);
    this.board.on("value", (snap) => {
      this.setState({board: snap.val()})
    })
    this.mover.on("value", (snap) => {
      this.setState({currentMover: snap.val()})
    })
    this.piece.on("value", (snap) => {
      this.setState({currPiece: snap.val()})
    })
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClickOutside);
  }

  setWrapperRef = (node) => {
    this.wrapperRef = node;
  }

  handleClickOutside = (event) => {
    if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
      console.log("clicked outside board")
      this.setState({currPiece: 0})
    }
  }

  handleClick = (coords, piece, e) => {
    e.preventDefault();
    if(piece === 0)
      console.log("blank square, can't move")
    // pick up a piece if no piece picked up currently
    else if(this.state.currPiece === 0){
      // white move
      if(piece <= 6 && piece >= 1 && this.state.currentMover === "white"){
        if(this.props.uid === this.props.whiteId){
          console.log("can move")
          this.setState({currPiece: piece}); // update picked up piece
          this.setState({sourceCoords: coords}); // remember where piece was picked up
          this.setLegalSquares(coords, piece); // calculate legal moves
        }
        else
          console.log("can't move")
      }

      // black move
      else if(piece <= 12 && piece >= 6 && this.state.currentMover === "black"){
        if(this.props.uid === this.props.blackId){
          console.log("can move")
          this.setState({currPiece: piece}); // update picked up piece
          this.setState({sourceCoords: coords}); // remember where piece was picked up
          this.setLegalSquares(coords, piece); // calculate legal moves
        }
        else
          console.log("can't move")
      }
    }

    // if piece is currently picked up, check if clicked square is a legal destination
    // move if so, drop piece if not
    if(this.state.currPiece !== 0){
      this.handleMove(coords);
    }
    console.log("clicked on a square: " + coords[0] + ", " + coords[1])
  }

  handleMove = (coords) => {
    console.log("inside handle move, coords are " + coords)
    if(this.moveIsLegal(coords)){
      this.database.ref("games/game-ID/board/" + coords[0] + "/" + coords[1]).set(this.state.currPiece);
      this.database.ref("games/game-ID/board/" + this.state.sourceCoords[0] + "/" + this.state.sourceCoords[1]).set(0);
      this.setState({currPiece: 0})
      if(this.state.currentMover === "white")
        this.mover.set("black")
      else
        this.mover.set("white")
    }
    else{
      console.log("not a legal square")
      this.setState({currPiece: 0})
      this.setState({sourceCoords: [-1, -1]})
    }
  }

  moveIsLegal = (coords) => {
    var i, current;
    for(i = 0; i < this.state.legalSquares.length; i++){
      current = this.state.legalSquares[i];
      if(coords[0] == current[0] && coords[1] == current[1])
        return true;
    }
    return false;
  }

  setLegalSquares = (coords, piece) => {
    if(piece === 0)
      return
    // knight move
    if(piece === 2 || piece === 8){
      var color = piece === 2 ? "white" : "black";
      var legalSquares = moveCalc.calculateKnightMoves(coords, color, this.state.board);
      this.setState({legalSquares: legalSquares});
    }

    // bishop move
    if(piece === 3 || piece === 9){
      var color = piece === 3 ? "white" : "black";
      var legalSquares = moveCalc.calculateBishopMoves(coords, color, this.state.board);
      this.setState({legalSquares: legalSquares});
    }

    // rook move
    if(piece === 4 || piece === 10){
      var color = piece === 4 ? "white" : "black";
      var legalSquares = moveCalc.calculateRookMoves(coords, color, this.state.board);
      this.setState({legalSquares: legalSquares});
    }
    else
      console.log("no piece to determine moveset for")
  }

  render() {
    return (
      <div class="container ml-4">
        <h1>{this.state.currPiece}</h1>
        <h1>{this.state.legalSquares[0]}</h1>
        <div class="row" style={this.styles.board} ref={this.setWrapperRef}>
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

const ChessboardFinal = withFirebase(ChessboardBase);

export default Chessboard;
