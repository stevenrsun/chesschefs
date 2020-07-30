import React, { Component } from "react";
import Square from "./square";
import { withFirebase } from "../FireBase";
import * as moveCalc from "./moveCalculator.js";
import PromoMenu from "./promoMenu.jsx";
import { Alert } from "react-native";

const Chessboard = ({ uid, whiteId, blackId }) => (
  <ChessboardFinal uid={uid} whiteId={whiteId} blackId={blackId} />
);

class ChessboardBase extends Component {
  constructor(props) {
    super(props);

    this.database = this.props.firebase.db;
    this.board = this.database.ref("games/game-ID/board");
    this.mover = this.database.ref("games/game-ID/current_mover");
    this.piece = this.database.ref("games/game-ID/current_piece");
    this.whiteKing = this.database.ref("games/game-ID/white_king");
    this.blackKing = this.database.ref("games/game-ID/black_king");
    this.promoMenuDb = this.database.ref("games/game-ID/promo_menu");
    this.promoCoords = this.database.ref("games/game-ID/promo_coords");
    this.checkmate = this.database.ref("games/game-ID/checkmate");
    this.white_ks = this.database.ref("games/game-ID/white_castle_ks");
    this.white_qs = this.database.ref("games/game-ID/white_castle_qs");
    this.black_ks = this.database.ref("games/game-ID/black_castle_ks");
    this.black_qs = this.database.ref("games/game-ID/black_castle_qs");

    this.state = {
      currPiece: 0,
      pieceMap: [
        "None",
        "Pawn (W)",
        "Knight (W)",
        "Bishop (W)",
        "Rook (W)",
        "Queen (W)",
        "King (W)",
        "Pawn (B)",
        "Knight (B)",
        "Bishop (B)",
        "Rook (B)",
        "Queen (B)",
        "King (B)",
      ],
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
      promoCoords: [0, 0],
      checkmate: 0,
      whiteCastleKs: true,
      whiteCastleQs: true,
      blackCastleKs: true,
      blackCastleQs: true
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
    document.addEventListener("mousedown", this.handleClickOutside);
    this.board.on("value", (snap) => {
      this.setState({ board: snap.val() });
    });
    this.mover.on("value", (snap) => {
      this.setState({ currentMover: snap.val() });
    });
    this.piece.on("value", (snap) => {
      this.setState({ currPiece: snap.val() });
    });
    this.promoMenuDb.on("value", (snap) => {
      this.setState({ promoMenu: snap.val() });
    });
    this.promoCoords.on("value", (snap) => {
      var promoCoords = [];
      var split = snap.val().split(" ");
      promoCoords.push(parseInt(split[0]));
      promoCoords.push(parseInt(split[1]));
      this.setState({ promoCoords: promoCoords });
    });
    this.whiteKing.on("value", (snap) => {
      var kingCoords = [];
      var split = snap.val().split(" ");
      kingCoords.push(parseInt(split[0]));
      kingCoords.push(parseInt(split[1]));
      this.setState({ whiteKingCoords: kingCoords });
    });
    this.blackKing.on("value", (snap) => {
      var kingCoords = [];
      var split = snap.val().split(" ");
      kingCoords.push(parseInt(split[0]));
      kingCoords.push(parseInt(split[1]));
      this.setState({ blackKingCoords: kingCoords });
    });
    this.checkmate.on("value", (snap) => {
      this.setState({checkmate: snap.val()});
    });
    this.white_ks.on("value", (snap) => {
      this.setState({whiteCastleKs: snap.val()});
    });
    this.white_qs.on("value", (snap) => {
      this.setState({whiteCastleQs: snap.val()});
    });
    this.black_ks.on("value", (snap) => {
      this.setState({blackCastleKs: snap.val()});
    });
    this.black_qs.on("value", (snap) => {
      this.setState({blackCastleQs: snap.val()});
    });
  }

  sleep = (milliseconds) => {
    return new Promise((resolve) => setTimeout(resolve, milliseconds));
  };

  componentWillUnmount() {
    document.removeEventListener("mousedown", this.handleClickOutside);
  }

  setWrapperRef = (node) => {
    this.wrapperRef = node;
  };

  handleClickOutside = (event) => {
    if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
      this.setState({ currPiece: 0 });
    }
  };

  handleClick = (coords, piece, e) => {
    e.preventDefault();
    if (piece === 0) console.log("blank square, can't move");
    // pick up a piece if no piece picked up currently
    else if (this.state.currPiece === 0) {
      // white move
      if (piece <= 6 && piece >= 1 && this.state.currentMover === "white") {
        if (this.props.uid === this.props.whiteId) {
          console.log("can move");
          this.setState({ currPiece: piece }); // update picked up piece
          this.setState({ sourceCoords: coords }); // remember where piece was picked up
          var ls = this.setLegalSquares(coords, piece); // calculate legal moves
          this.setState({ legalSquares: ls});
        } else console.log("can't move");
      }

      // black move
      else if (
        piece <= 12 &&
        piece >= 7 &&
        this.state.currentMover === "black"
      ) {
        if (this.props.uid === this.props.blackId) {
          console.log("can move");
          this.setState({ currPiece: piece }); // update picked up piece
          this.setState({ sourceCoords: coords }); // remember where piece was picked up
          var ls = this.setLegalSquares(coords, piece); // calculate legal moves
          this.setState({ legalSquares: ls});
        } else console.log("can't move");
      }
    }

    // if piece is currently picked up, check if clicked square is a legal destination
    // move if so, drop piece if not
    if (this.state.currPiece !== 0) {
      this.handleMove(coords);
    }
    console.log("clicked on a square: " + coords[0] + ", " + coords[1]);
  };

  openPromotionMenu = () => {
    this.promoMenuDb.set(true);
  };

  onPromotionMenuClick = (piece, e, coords) => {
    e.preventDefault();
    this.setState({ promotedPiece: piece });
    this.promoMenuDb.set(false);
    console.log(
      "at the end of onPromotionMenuClick, the parameter piece was " + piece
    );
    this.onPromotePiece();
  };

  onPromotePiece = async () => {
    console.log(
      "about to enter while loop, menu value is " + this.state.promoMenu
    );
    while (!this.state.promoMenu) {
      await this.sleep(100); // promo menu will only close when onPromotionMenuClick is called!!!
    }
    while (this.state.promoMenu) {
      await this.sleep(100); // promo menu will only close when onPromotionMenuClick is called!!!
    }
    console.log(
      "promotion menu closed, piece selected: " + this.state.promotedPiece
    );
    this.database
      .ref(
        "games/game-ID/board/" +
          this.state.promoCoords[0] +
          "/" +
          this.state.promoCoords[1]
      )
      .set(this.state.promotedPiece);
    this.setState({ promotedPiece: 0 });
    var currentMover = this.state.currentMover.split("_")[0];
    this.setState({currentMover: currentMover});
    var nextMover = currentMover === "white" ? "black" : "white";
    // currentMover hasn't changed
    if(nextMover === "white"){
      // checkmate? if so, show alert and end game
      if(this.isStalemated()){
        // remove right to move pieces from both sides
        this.database.ref("game_example/white_id_old").set(this.props.whiteId);
        this.database.ref("game_example/black_id_old").set(this.props.blackId);
        this.database.ref("game_example/white_id").set(-1);
        this.database.ref("game_example/black_id").set(-1);
        if(moveCalc.isUnderCheck(this.state.whiteKingCoords, "white", this.state.board)) {
          // alert victory
          this.checkmate.set("black");
          alert("Black wins!");
        }
        else{
          this.checkmate.set("draw");
          alert("Draw!")
        }
      }
    }
    else{
      // checkmate? if so, show alert and end game
      if(this.isStalemated()){
        // remove right to move pieces from both sides
        this.database.ref("game_example/white_id_old").set(this.props.whiteId);
        this.database.ref("game_example/black_id_old").set(this.props.blackId);
        this.database.ref("game_example/white_id").set(-1);
        this.database.ref("game_example/black_id").set(-1);
        if(moveCalc.isUnderCheck(this.state.blackKingCoords, "black", this.state.board)) {
          // alert victory
          this.checkmate.set("white");
          alert("White wins!");
        }
        else{
          this.checkmate.set("draw");
          alert("Draw!")
        }
      }
    }
    this.setState({ currPiece: 0 });
    this.mover.set(nextMover);
  };

  handleMove = (coords) => {
    console.log("inside handle move, coords are " + coords);
    // if legal move, modify board state and change current mover to opposite color
    if (this.moveIsLegal(coords, this.state.currPiece, this.state.sourceCoords, this.state.legalSquares, false)) {
      this.database
        .ref("games/game-ID/board/" + coords[0] + "/" + coords[1])
        .set(this.state.currPiece);
      this.database
        .ref(
          "games/game-ID/board/" +
            this.state.sourceCoords[0] +
            "/" +
            this.state.sourceCoords[1]
        )
        .set(0);
      // if a pawn has moved to the back rank, open promotion menu and stall turn until a piece is selected from menu
      if (
        (this.state.currentMover === "white" &&
          this.state.currPiece === 1 &&
          coords[0] === 0) ||
        (this.state.currentMover === "black" &&
          this.state.currPiece === 7 &&
          coords[0] === 7)
      ) {
        var newMover = this.state.currentMover + "_promo_pending";
        this.mover.set(newMover);
        this.promoCoords.set("" + coords[0] + " " + coords[1]);
        this.openPromotionMenu(this.state.currentMover);
      } else {
        if (this.state.currentMover === "white") {
          // update king coords if king is being moved
          if (this.state.currPiece === 6) {
            this.whiteKing.set("" + coords[0] + " " + coords[1]);
            if(this.state.whiteCastleKs || this.state.whiteCastleQs){
              // move rook if it was a castle move (can castle = true, moved piece = king)
              if(coords[1] === 6){
                this.database
                  .ref("games/game-ID/board/" + 7 + "/" + 5)
                  .set(4);
                this.database
                  .ref(
                    "games/game-ID/board/" +
                      7 +
                      "/" +
                      7
                  )
                  .set(0);
              }
              else if(coords[1] === 2){
                this.database
                  .ref("games/game-ID/board/" + 7 + "/" + 3)
                  .set(4);
                this.database
                  .ref(
                    "games/game-ID/board/" +
                      7 +
                      "/" +
                      0
                  )
                  .set(0);
              }

              this.white_ks.set(false);
              this.white_qs.set(false);
            }
          }

          else if(this.state.currPiece === 4 && this.state.sourceCoords[0] === 7 && this.state.sourceCoords[1] === 0 && this.state.whiteCastleQs)
            this.white_qs.set(false);
          else if(this.state.currPiece === 4 && this.state.sourceCoords[0] === 7 && this.state.sourceCoords[1] === 7 && this.state.whiteCastleKs)
            this.white_ks.set(false);

          // checkmate? if so, show alert and end game
          console.log("white just moved, about to call is stalemate")
          if(this.isStalemated()){
            // remove right to move pieces from both sides
            this.database.ref("game_example/white_id_old").set(this.props.whiteId);
            this.database.ref("game_example/black_id_old").set(this.props.blackId);
            this.database.ref("game_example/white_id").set(-1);
            this.database.ref("game_example/black_id").set(-1);
            if(moveCalc.isUnderCheck(this.state.blackKingCoords, "black", this.state.board)) {
              // alert victory
              this.checkmate.set("white");
              alert("White wins!");
            }
            else {
              this.checkmate.set("draw");
              alert("Draw!");
            }
          }

          
          this.setState({ currPiece: 0 });
          this.mover.set("black");
        } else {
          // update king coords if king is being moved
          if (this.state.currPiece === 12) {
            this.blackKing.set("" + coords[0] + " " + coords[1]);
            if(this.state.blackCastleKs || this.state.blackCastleQs){
              if(coords[1] === 6){
                this.database
                  .ref("games/game-ID/board/" + 0 + "/" + 5)
                  .set(10);
                this.database
                  .ref(
                    "games/game-ID/board/" +
                      0 +
                      "/" +
                      7
                  )
                  .set(0);
              }
              else if(coords[1] === 2){
                this.database
                  .ref("games/game-ID/board/" + 0 + "/" + 3)
                  .set(10);
                this.database
                  .ref(
                    "games/game-ID/board/" +
                      0 +
                      "/" +
                      0
                  )
                  .set(0);
              }

              this.black_ks.set(false);
              this.black_qs.set(false);
            }
          }

          else if(this.state.currPiece === 10 && this.state.sourceCoords[0] === 0 && this.state.sourceCoords[1] === 0 && this.state.blackCastleQs)
            this.black_qs.set(false);
          else if(this.state.currPiece === 10 && this.state.sourceCoords[0] === 0 && this.state.sourceCoords[1] === 7 && this.state.blackCastleKs)
            this.black_ks.set(false);

          //checkmate? if so, show alert and end game
          if(this.isStalemated()){
            // remove right to move pieces from both sides
            this.database.ref("game_example/white_id_old").set(this.props.whiteId);
            this.database.ref("game_example/black_id_old").set(this.props.blackId);
            this.database.ref("game_example/white_id").set(-1);
            this.database.ref("game_example/black_id").set(-1);
            if(moveCalc.isUnderCheck(this.state.whiteKingCoords, "white", this.state.board)){
              // alert victory
              this.checkmate.set("black");
              alert("Black wins!");
            }
            else{
              this.checkmate.set("draw");
              alert("Draw!");
            }
          }

          this.setState({ currPiece: 0 });
          this.mover.set("white");
        }
      }

    } else {
      console.log("not a legal square");
      this.setState({ currPiece: 0 });
      this.setState({ sourceCoords: [-1, -1] });
    }
  };

  moveIsLegal = (coords, piece, source, ls, checkStalemate) => {
    var i, current;
    for (i = 0; i < ls.length; i++) {
      current = ls[i];
      // pending destination is legal
      if (coords[0] == current[0] && coords[1] == current[1]) {
        // finding legal squares for a king move involves check logic, don't need to make sure king won't be under check after this move
        if (piece === 6 || piece === 12){
          if(!checkStalemate)
            return true;
          else{
            var tempBoard = this.state.board;
            var oldPiece = tempBoard[coords[0]][coords[1]];
            tempBoard[source[0]][source[1]] = 0;
            tempBoard[coords[0]][coords[1]] = piece;
            var check;
            if(this.state.currentMover === "white")
              check = !moveCalc.isUnderCheck(this.state.blackKingCoords, "black", tempBoard);
            else
              check = !moveCalc.isUnderCheck(this.state.whiteKingCoords, "white", tempBoard);
            if(!check || checkStalemate){
              tempBoard[source[0]][source[1]] = piece;
              tempBoard[coords[0]][coords[1]] = oldPiece;
            }
            return check;
          }
        }
        // check if this move will leave the king in check
        console.log("inside moveislegal current mover is " + this.state.currentMover)
        if (this.state.currentMover === "white") {
          // create the move on a temporary board and see if king is under check in that board
          console.log(coords)
          console.log(source)
          console.log(piece)
          var tempBoard = this.state.board;
          console.log("temp[board coordinates " + tempBoard[4][2] + " " + tempBoard[4][3])
          console.log("actual board coordiantes" + tempBoard[4][2] + " " + tempBoard[4][3])
          var oldPiece = tempBoard[coords[0]][coords[1]];
          tempBoard[source[0]][source[1]] = 0;
          tempBoard[coords[0]][coords[1]] = piece;
          console.log("temp[board coordinates " + tempBoard[4][2] + " " + tempBoard[4][3])
          console.log("actual board coordiantes" + tempBoard[4][2] + " " + tempBoard[4][3])
          var check;
          // return true if not under check
          if(!checkStalemate)
            check = !moveCalc.isUnderCheck(this.state.whiteKingCoords, this.state.currentMover, tempBoard)
          else
            check = !moveCalc.isUnderCheck(this.state.blackKingCoords, "black", tempBoard);
          console.log("undercheck returns" + moveCalc.isUnderCheck(this.state.blackKingCoords, "black", tempBoard))
          console.log("black king coords are " + this.state.blackKingCoords)
          if(!check || checkStalemate){
            tempBoard[source[0]][source[1]] = piece;
            tempBoard[coords[0]][coords[1]] = oldPiece;
          }
          console.log(checkStalemate)
          console.log("check is " + check)
          return check;
        } else {
          // create the move on a temporary board and see if king is under check in that board
          var tempBoard = this.state.board;
          var oldPiece = tempBoard[coords[0]][coords[1]];
          tempBoard[source[0]][source[1]] = 0;
          tempBoard[coords[0]][coords[1]] = piece;
          var check;
          // return true if not under check
          if(!checkStalemate)
            check = !moveCalc.isUnderCheck(this.state.blackKingCoords, this.state.currentMover, tempBoard)
          else
            check = !moveCalc.isUnderCheck(this.state.whiteKingCoords, "white", tempBoard);
          if(!check || checkStalemate){
            tempBoard[source[0]][source[1]] = piece;
            tempBoard[coords[0]][coords[1]] = oldPiece;
          }
          return check;
        }
      }
    }
    return false;
  };

  setLegalSquares = (coords, piece) => {
    console.log("THE PIECE CLICKED ON IS: " + piece);
    if (piece === 0) return;

    // pawn move
    if (piece === 1 || piece === 7) {
      var color = piece === 1 ? "white" : "black";
      var legalSquares = moveCalc.calculatePawnMoves(
        coords,
        color,
        this.state.board
      );
      return legalSquares;
    }

    // knight move
    if (piece === 2 || piece === 8) {
      var color = piece === 2 ? "white" : "black";
      var legalSquares = moveCalc.calculateKnightMoves(
        coords,
        color,
        this.state.board
      );
      return legalSquares;
    }

    // bishop move
    if (piece === 3 || piece === 9) {
      var color = piece === 3 ? "white" : "black";
      var legalSquares = moveCalc.calculateBishopMoves(
        coords,
        color,
        this.state.board
      );
      return legalSquares;
    }

    // rook move
    if (piece === 4 || piece === 10) {
      var color = piece === 4 ? "white" : "black";
      var legalSquares = moveCalc.calculateRookMoves(
        coords,
        color,
        this.state.board
      );
      return legalSquares;
    }

    // queen move
    if (piece === 5 || piece === 11) {
      var color = piece === 5 ? "white" : "black";
      var legalSquares = moveCalc.calculateQueenMoves(
        coords,
        color,
        this.state.board
      );
      return legalSquares;
    }

    // king move
    if (piece === 6 || piece === 12) {
      var color = piece === 6 ? "white" : "black";
      var ks = this.state.currentMover === "white" ? this.state.whiteCastleKs : this.state.blackCastleKs;
      var qs = this.state.currentMover === "white" ? this.state.whiteCastleQs : this.state.blackCastleQs;
      var legalSquares = moveCalc.calculateKingMoves(
        coords,
        color,
        this.state.board,
        ks,
        qs
      );
      return legalSquares;
    } else console.log("no piece to determine moveset for");
  };

  isStalemated() {
    console.log("inside stalemated, current mover is " + this.state.currentMover + "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    if(this.state.currentMover === "white" || this.state.currentMover === "white_promo_pending") {
      for(let r = 0; r < this.state.board.length; r++){
        for(let c = 0; c < this.state.board.length; c++){
          // check if piece is white
          var piece = this.state.board[r][c];
          if(piece >= 7 && piece <= 12) {
            console.log("the current piece to check for legal moves is at " + r + " " + c + " and the piece is " + piece)
            // check if piece can legally move, not stalemate if so
            var ls = this.setLegalSquares([r, c], piece);
            console.log("it's legal destinations are: " + ls);
            for(let i = 0; i < ls.length; i++){
              console.log(this.moveIsLegal(ls[i], piece, [r,c], ls, true) + " " + ls[i] + " " + r + " " + c)
              if(this.moveIsLegal(ls[i], piece, [r,c], ls, true))
                return false;
            }
          }
        }
      }

    }
    else {
      for(let r = 0; r < this.state.board.length; r++){
        for(let c = 0; c < this.state.board.length; c++){
          // check if piece is black
          var piece = this.state.board[r][c];
          if(piece >= 1 && piece <= 6) {
            console.log("the current piece to check for legal moves is at " + r + " " + c + " and the piece is " + piece)
            // check if piece can legally move, not stalemate if so
            var ls = this.setLegalSquares([r, c], piece);
            console.log("it's legal destinations are: " + ls);
            for(let i = 0; i < ls.length; i++){
              if(this.moveIsLegal(ls[i], piece, [r,c], ls, true))
                return false;
            }
          }
        }
      }
    }

    // no legal move found
    return true;
  }
  

  render() {
    let promoMenu;
    if (this.state.promoMenu) {
      promoMenu =
        this.state.currentMover === "white_promo_pending" ? (
          <PromoMenu color={"white"} onClick={this.onPromotionMenuClick} />
        ) : (
          <PromoMenu color={"black"} onClick={this.onPromotionMenuClick} />
        );
    }
    return (
      <div>
        <div class="container ml-4">
          <h1>
            Currently Picked Up: {this.state.pieceMap[this.state.currPiece]}
          </h1>
          <h1>
            from: {this.state.letterMap[this.state.sourceCoords[0]]}
            {this.state.sourceCoords[1] + 1}
          </h1>
          <h1>{this.state.board}</h1>
          <h1>white king on {this.state.whiteKingCoords}</h1>
          <h1>black king on {this.state.blackKingCoords}</h1>
          <div class="row" ref={this.setWrapperRef}>
            <div class="col-sm-1" style={this.styles.square}>
              <Square
                isLight={true}
                onClick={this.handleClick}
                coords={[0, 0]}
              />
              <Square
                isLight={false}
                onClick={this.handleClick}
                coords={[1, 0]}
              />
              <Square
                isLight={true}
                onClick={this.handleClick}
                coords={[2, 0]}
              />
              <Square
                isLight={false}
                onClick={this.handleClick}
                coords={[3, 0]}
              />
              <Square
                isLight={true}
                onClick={this.handleClick}
                coords={[4, 0]}
              />
              <Square
                isLight={false}
                onClick={this.handleClick}
                coords={[5, 0]}
              />
              <Square
                isLight={true}
                onClick={this.handleClick}
                coords={[6, 0]}
              />
              <Square
                isLight={false}
                onClick={this.handleClick}
                coords={[7, 0]}
              />
            </div>
            <div class="col-sm-1" style={this.styles.square}>
              <Square
                isLight={false}
                onClick={this.handleClick}
                coords={[0, 1]}
              />
              <Square
                isLight={true}
                onClick={this.handleClick}
                coords={[1, 1]}
              />
              <Square
                isLight={false}
                onClick={this.handleClick}
                coords={[2, 1]}
              />
              <Square
                isLight={true}
                onClick={this.handleClick}
                coords={[3, 1]}
              />
              <Square
                isLight={false}
                onClick={this.handleClick}
                coords={[4, 1]}
              />
              <Square
                isLight={true}
                onClick={this.handleClick}
                coords={[5, 1]}
              />
              <Square
                isLight={false}
                onClick={this.handleClick}
                coords={[6, 1]}
              />
              <Square
                isLight={true}
                onClick={this.handleClick}
                coords={[7, 1]}
              />
            </div>
            <div class="col-sm-1" style={this.styles.square}>
              <Square
                isLight={true}
                onClick={this.handleClick}
                coords={[0, 2]}
              />
              <Square
                isLight={false}
                onClick={this.handleClick}
                coords={[1, 2]}
              />
              <Square
                isLight={true}
                onClick={this.handleClick}
                coords={[2, 2]}
              />
              <Square
                isLight={false}
                onClick={this.handleClick}
                coords={[3, 2]}
              />
              <Square
                isLight={true}
                onClick={this.handleClick}
                coords={[4, 2]}
              />
              <Square
                isLight={false}
                onClick={this.handleClick}
                coords={[5, 2]}
              />
              <Square
                isLight={true}
                onClick={this.handleClick}
                coords={[6, 2]}
              />
              <Square
                isLight={false}
                onClick={this.handleClick}
                coords={[7, 2]}
              />
            </div>
            <div class="col-sm-1" style={this.styles.square}>
              <Square
                isLight={false}
                onClick={this.handleClick}
                coords={[0, 3]}
              />
              <Square
                isLight={true}
                onClick={this.handleClick}
                coords={[1, 3]}
              />
              <Square
                isLight={false}
                onClick={this.handleClick}
                coords={[2, 3]}
              />
              <Square
                isLight={true}
                onClick={this.handleClick}
                coords={[3, 3]}
              />
              <Square
                isLight={false}
                onClick={this.handleClick}
                coords={[4, 3]}
              />
              <Square
                isLight={true}
                onClick={this.handleClick}
                coords={[5, 3]}
              />
              <Square
                isLight={false}
                onClick={this.handleClick}
                coords={[6, 3]}
              />
              <Square
                isLight={true}
                onClick={this.handleClick}
                coords={[7, 3]}
              />
            </div>
            <div class="col-sm-1" style={this.styles.square}>
              <Square
                isLight={true}
                onClick={this.handleClick}
                coords={[0, 4]}
              />
              <Square
                isLight={false}
                onClick={this.handleClick}
                coords={[1, 4]}
              />
              <Square
                isLight={true}
                onClick={this.handleClick}
                coords={[2, 4]}
              />
              <Square
                isLight={false}
                onClick={this.handleClick}
                coords={[3, 4]}
              />
              <Square
                isLight={true}
                onClick={this.handleClick}
                coords={[4, 4]}
              />
              <Square
                isLight={false}
                onClick={this.handleClick}
                coords={[5, 4]}
              />
              <Square
                isLight={true}
                onClick={this.handleClick}
                coords={[6, 4]}
              />
              <Square
                isLight={false}
                onClick={this.handleClick}
                coords={[7, 4]}
              />
            </div>
            <div class="col-sm-1" style={this.styles.square}>
              <Square
                isLight={false}
                onClick={this.handleClick}
                coords={[0, 5]}
              />
              <Square
                isLight={true}
                onClick={this.handleClick}
                coords={[1, 5]}
              />
              <Square
                isLight={false}
                onClick={this.handleClick}
                coords={[2, 5]}
              />
              <Square
                isLight={true}
                onClick={this.handleClick}
                coords={[3, 5]}
              />
              <Square
                isLight={false}
                onClick={this.handleClick}
                coords={[4, 5]}
              />
              <Square
                isLight={true}
                onClick={this.handleClick}
                coords={[5, 5]}
              />
              <Square
                isLight={false}
                onClick={this.handleClick}
                coords={[6, 5]}
              />
              <Square
                isLight={true}
                onClick={this.handleClick}
                coords={[7, 5]}
              />
            </div>
            <div class="col-sm-1" style={this.styles.square}>
              <Square
                isLight={true}
                onClick={this.handleClick}
                coords={[0, 6]}
              />
              <Square
                isLight={false}
                onClick={this.handleClick}
                coords={[1, 6]}
              />
              <Square
                isLight={true}
                onClick={this.handleClick}
                coords={[2, 6]}
              />
              <Square
                isLight={false}
                onClick={this.handleClick}
                coords={[3, 6]}
              />
              <Square
                isLight={true}
                onClick={this.handleClick}
                coords={[4, 6]}
              />
              <Square
                isLight={false}
                onClick={this.handleClick}
                coords={[5, 6]}
              />
              <Square
                isLight={true}
                onClick={this.handleClick}
                coords={[6, 6]}
              />
              <Square
                isLight={false}
                onClick={this.handleClick}
                coords={[7, 6]}
              />
            </div>
            <div class="col-sm-1" style={this.styles.square}>
              <Square
                isLight={false}
                onClick={this.handleClick}
                coords={[0, 7]}
              />
              <Square
                isLight={true}
                onClick={this.handleClick}
                coords={[1, 7]}
              />
              <Square
                isLight={false}
                onClick={this.handleClick}
                coords={[2, 7]}
              />
              <Square
                isLight={true}
                onClick={this.handleClick}
                coords={[3, 7]}
              />
              <Square
                isLight={false}
                onClick={this.handleClick}
                coords={[4, 7]}
              />
              <Square
                isLight={true}
                onClick={this.handleClick}
                coords={[5, 7]}
              />
              <Square
                isLight={false}
                onClick={this.handleClick}
                coords={[6, 7]}
              />
              <Square
                isLight={true}
                onClick={this.handleClick}
                coords={[7, 7]}
              />
            </div>
            <div class="col-m-3">{promoMenu}</div>
          </div>
        </div>
      </div>
    );
  }
}

const ChessboardFinal = withFirebase(ChessboardBase);

export default Chessboard;
