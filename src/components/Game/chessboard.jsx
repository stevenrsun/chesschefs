import React, { Component } from "react";
import Square from "./square";
import { withFirebase } from "../FireBase";
import * as moveCalc from "./moveCalculator.js";
import PromoMenu from "./promoMenu.jsx";

const Chessboard = ({uid, whiteId, blackId}) => (<ChessboardFinal uid={uid} whiteId={whiteId} blackId={blackId}/>)

class ChessboardBase extends Component {
  constructor(props){
    super(props);

    this.database = this.props.firebase.db;
    this.board = this.database.ref("games/game-ID/board")
    this.mover = this.database.ref("games/game-ID/current_mover")
    this.piece = this.database.ref("games/game-ID/current_piece")
    this.whiteKing = this.database.ref("games/game-ID/white_king")
    this.blackKing = this.database.ref("games/game-ID/black_king")
    this.promoMenuDb = this.database.ref("games/game-ID/promo_menu")
    this.promoCoords = this.database.ref("games/game-ID/promo_coords")

    this.state = {
      currPiece: 0,
      pieceMap: ["None", "Pawn (W)", "Knight (W)", "Bishop (W)", "Rook (W)", "Queen (W)", "King (W)", "Pawn (B)", "Knight (B)", "Bishop (B)", "Rook (B)", "Queen (B)", "King (B)"],
      letterMap: ["a", "b", "c", "d", "e", "f", "g", "h"],
      board: [],
      movePool: [],
      legalSquares: [],
      sourceCoords: [],
      whiteKingCoords: [7, 4],
      blackKingCoords: [0, 4],
      currentMover: "white",
      promoMenu: false,
      promotedPiece: 0,
      promoCoords: [0,0]
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
    this.promoMenuDb.on("value", (snap) => {
      this.setState({promoMenu: snap.val()})
    })
    this.promoCoords.on("value", (snap) => {
      var promoCoords = [];
      var split = snap.val().split(" ");
      promoCoords.push(parseInt(split[0]));
      promoCoords.push(parseInt(split[1]));
      this.setState({promoCoords: promoCoords})
    })
    this.whiteKing.on("value", (snap) => {
      var kingCoords = [];
      var split = snap.val().split(" ");
      kingCoords.push(parseInt(split[0]));
      kingCoords.push(parseInt(split[1]));
      this.setState({whiteKingCoords: kingCoords})
    })
    this.blackKing.on("value", (snap) => {
      var kingCoords = [];
      var split = snap.val().split(" ");
      kingCoords.push(parseInt(split[0]));
      kingCoords.push(parseInt(split[1]));
      this.setState({blackKingCoords: kingCoords})
    })
  }

  sleep = (milliseconds) => {
    return new Promise(resolve => setTimeout(resolve, milliseconds))
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
      else if(piece <= 12 && piece >= 7 && this.state.currentMover === "black"){
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

  openPromotionMenu = () => {
    this.promoMenuDb.set(true);
  }

  onPromotionMenuClick = (piece, e, coords) => {
    e.preventDefault();
    this.setState({promotedPiece: piece})
    this.promoMenuDb.set(false);
    console.log("at the end of onPromotionMenuClick, the parameter piece was " + piece)
    this.onPromotePiece();
  }

  onPromotePiece = async () => {
    console.log("about to enter while loop, menu value is " + this.state.promoMenu)
    while(!this.state.promoMenu){
      await this.sleep(100); // promo menu will only close when onPromotionMenuClick is called!!!
    };
    while(this.state.promoMenu){
      await this.sleep(100); // promo menu will only close when onPromotionMenuClick is called!!!
    };
    console.log("promotion menu closed, piece selected: " + this.state.promotedPiece)
    this.database.ref("games/game-ID/board/" + this.state.promoCoords[0] + "/" + this.state.promoCoords[1]).set(this.state.promotedPiece);
    this.setState({promotedPiece: 0})
    var currentMover = this.state.currentMover.split("_")[0];
    console.log(currentMover + "currentmover!!!")
    console.log(currentMover);
    var nextMover = currentMover === "white" ? "black" : "white";
    this.setState({currPiece: 0})
    this.mover.set(nextMover)
  }

  handleMove = (coords) => {
    console.log("inside handle move, coords are " + coords)
    // if legal move, modify board state and change current mover to opposite color
    if(this.moveIsLegal(coords)){
      this.database.ref("games/game-ID/board/" + coords[0] + "/" + coords[1]).set(this.state.currPiece);
      this.database.ref("games/game-ID/board/" + this.state.sourceCoords[0] + "/" + this.state.sourceCoords[1]).set(0);
      // if a pawn has moved to the back rank, open promotion menu and stall turn until a piece is selected from menu
      if((this.state.currentMover === "white" && this.state.currPiece === 1 && coords[0] === 0) ||
            this.state.currentMover === "black" && this.state.currPiece === 7 && coords[0] === 7){
          var newMover = this.state.currentMover + "_promo_pending";
          console.log(newMover + "new mover???")
          this.mover.set(newMover);
          this.promoCoords.set("" + coords[0] + " " + coords[1]);
          this.openPromotionMenu(this.state.currentMover);
      }
      else {
        if(this.state.currentMover === "white"){
          // update king coords if king is being moved
          if(this.state.currPiece === 6){
            this.whiteKing.set("" + coords[0] + " " + coords[1]);
          }
          this.setState({currPiece: 0})
          this.mover.set("black")
        }
        else{
          // update king coords if king is being moved
          if(this.state.currPiece === 12){
            this.blackKing.set("" + coords[0] + " " + coords[1]);
          }
          this.setState({currPiece: 0})
          this.mover.set("white")
        }
      }
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
      // pending destination is legal
      if(coords[0] == current[0] && coords[1] == current[1]){
        // finding legal squares for a king move involves check logic, don't need to make sure king won't be under check after this move
        if(this.state.currPiece === 6 || this.state.currPiece === 12)
          return true;
        // check if this move will leave the king in check 
        if(this.state.currentMover === "white"){
          // create the move on a temporary board and see if king is under check in that board
          var tempBoard = this.state.board;
          tempBoard[this.state.sourceCoords[0]][this.state.sourceCoords[1]] = 0;
          tempBoard[coords[0]][coords[1]] = this.state.currPiece;
          console.log(moveCalc.isUnderCheck(this.state.whiteKingCoords, this.state.currentMover, tempBoard));
          console.log(coords[0] + " " + coords[1])
          // return true if not under check
          return !moveCalc.isUnderCheck(this.state.whiteKingCoords, this.state.currentMover, tempBoard);
        }
        else {
          // create the move on a temporary board and see if king is under check in that board
          var tempBoard = this.state.board;
          tempBoard[this.state.sourceCoords[0]][this.state.sourceCoords[1]] = 0;
          tempBoard[coords[0]][coords[1]] = this.state.currPiece;
          console.log(moveCalc.isUnderCheck(this.state.blackKingCoords, this.state.currentMover, tempBoard));
          console.log(coords[0] + " " + coords[1])
          // return true if not under check
          return !moveCalc.isUnderCheck(this.state.blackKingCoords, this.state.currentMover, tempBoard);
        }
      }
    }
    return false;
  }

  setLegalSquares = (coords, piece) => {
    if(piece === 0)
      return

    // pawn move
    if(piece === 1 || piece === 7){
      var color = piece === 1 ? "white" : "black";
      var legalSquares = moveCalc.calculatePawnMoves(coords, color, this.state.board);
      this.setState({legalSquares: legalSquares});
    }

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

    // queen move
    if(piece === 5 || piece === 11){
      var color = piece === 5 ? "white" : "black";
      var legalSquares = moveCalc.calculateQueenMoves(coords, color, this.state.board);
      this.setState({legalSquares: legalSquares});
    }

    // king move
    if(piece === 6 || piece === 12){
      var color = piece === 6 ? "white" : "black";
      var legalSquares = moveCalc.calculateKingMoves(coords, color, this.state.board);
      this.setState({legalSquares: legalSquares});
    }
    else
      console.log("no piece to determine moveset for")
  }

  render() {
    let promoMenu;
    if(this.state.promoMenu){
      promoMenu = this.state.currentMover === "white_promo_pending" ? <PromoMenu color={"white"} onClick={this.onPromotionMenuClick}/> : <PromoMenu color={"black"} onClick={this.onPromotionMenuClick}/>;
    }
    return (
      <div>
        <div class="container ml-4">
          <h1>Currently Picked Up: {this.state.pieceMap[this.state.currPiece]}</h1>
          <h1>from: {this.state.letterMap[this.state.sourceCoords[0]]}{this.state.sourceCoords[1] + 1}</h1>
          <h1>white king on {this.state.whiteKingCoords}</h1>
          <h1>black king on {this.state.blackKingCoords}</h1> 
          <div class="row" ref={this.setWrapperRef}>
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
            <div class="col-m-3">
              {promoMenu}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const ChessboardFinal = withFirebase(ChessboardBase);

export default Chessboard;
