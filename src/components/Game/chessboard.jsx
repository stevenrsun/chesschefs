import React, { Component } from "react";
import Square from "./square";
import { withFirebase } from "../FireBase";
import * as moveCalc from "./moveCalculator.js";
import PromoMenu from "./promoMenu.jsx";

const Chessboard = ({ uid, whiteId, blackId, gameId }) => (
  <ChessboardFinal uid={uid} whiteId={whiteId} blackId={blackId} gameId={gameId}/>
);

class ChessboardBase extends Component {
  constructor(props) {
    super(props);

    this.database = this.props.firebase.db;
    this.game = this.database.ref("games/" + this.props.gameId);
    this.board = this.game.child("board");
    this.moveLog = this.game.child("move_log");
    this.moveNum = this.game.child("move_num");
    this.mover = this.game.child("current_mover");
    this.piece = this.game.child("current_piece");
    this.whiteKing = this.game.child("white_king");
    this.blackKing = this.game.child("black_king");
    this.promoMenuDb = this.game.child("promo_menu");
    this.promoCoords = this.game.child("promo_coords");
    this.checkmate = this.game.child("checkmate");
    this.white_ks = this.game.child("white_castle_ks");
    this.white_qs = this.game.child("white_castle_qs");
    this.black_ks = this.game.child("black_castle_ks");
    this.black_qs = this.game.child("black_castle_qs");
    this.pawnTwoForward = this.game.child("pawn_two_forward");
    this.whiteIdOld = this.game.child("white_id_old");
    this.blackIdOld = this.game.child("black_id_old");

    this.state = {
      currPiece: 0,
      pieceMap: [
        "None",
        "",
        "N",
        "B",
        "R",
        "Q",
        "K",
        "",
        "N",
        "B",
        "R",
        "Q",
        "K",
      ],
      indicatorMap: [[0, 0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0, 0]],
      letterMap: ["a", "b", "c", "d", "e", "f", "g", "h"],
      rowMap: ["8", "7", "6", "5", "4", "3", "2", "1"],
      board: [],
      moveLog: [],
      moveNum: 0,
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
      blackCastleQs: true,
      pawnTwoForward: -1,
      whiteIdOld: "",
      blackIdOld: "",
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
    this.moveLog.on("value", (snap) => {
      this.setState({ moveLog: snap.val() });
    });
    this.moveNum.on("value", (snap) => {
      this.setState({ moveNum: snap.val() });
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
      if(snap.val()) {
        var split = snap.val().split(" ");
        promoCoords.push(parseInt(split[0]));
        promoCoords.push(parseInt(split[1]));
        this.setState({ promoCoords: promoCoords });
      }
    });
    this.whiteKing.on("value", (snap) => {
      var kingCoords = [];
      if(snap.val()) {
        var split = snap.val().split(" ");
        kingCoords.push(parseInt(split[0]));
        kingCoords.push(parseInt(split[1]));
        this.setState({ whiteKingCoords: kingCoords });
      }
    });
    this.blackKing.on("value", (snap) => {
      var kingCoords = [];
      if(snap.val()) {
        var split = snap.val().split(" ");
        kingCoords.push(parseInt(split[0]));
        kingCoords.push(parseInt(split[1]));
        this.setState({ blackKingCoords: kingCoords });
      }
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
    this.pawnTwoForward.on("value", (snap) => {
      this.setState({pawnTwoForward: snap.val()});
    });
    this.whiteIdOld.on("value", (snap) => {
      this.setState({whiteIdOld: snap.val()});
    });
    this.blackIdOld.on("value", (snap) => {
      this.setState({blackIdOld: snap.val()});
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
      this.resetMoveIndicators();
    }
  };

  handleClick = (coords, piece, e) => {
    e.preventDefault();
    if (piece === 0) console.log("blank square, can't move");
    // pick up a piece if no piece picked up currently
    else if (this.state.currPiece === 0) {
      // highlight piece
      let indMap = [...this.state.indicatorMap];
      indMap[coords[0]][coords[1]] = 3;
      this.setState({indicatorMap: indMap});
      // white move
      if (piece <= 6 && piece >= 1 && this.state.currentMover === "white") {
        if (this.props.uid === this.props.whiteId) {
          this.setState({ currPiece: piece }); // update picked up piece
          this.setState({ sourceCoords: coords }); // remember where piece was picked up
          var ls = this.setLegalSquares(coords, piece); // calculate legal moves
          this.setState({ legalSquares: ls});
          // set indicator for where moves are legal
          if(ls.length > 0 && !this.pieceIsPinned(coords))
            for(let i = 0; i < ls.length; i++){
              if(this.state.board[ls[i][0]][ls[i][1]] === 0){
                let indMap = [...this.state.indicatorMap];
                indMap[ls[i][0]][ls[i][1]] = 1;
                this.setState({indicatorMap: indMap});
              }
              else {
                let indMap = [...this.state.indicatorMap];
                indMap[ls[i][0]][ls[i][1]] = 2;
                this.setState({indicatorMap: indMap});
              }
            }
        } else console.log("can't move");
      }

      // black move
      else if (
        piece <= 12 &&
        piece >= 7 &&
        this.state.currentMover === "black"
      ) {
        if (this.props.uid === this.props.blackId) {
          this.setState({ currPiece: piece }); // update picked up piece
          this.setState({ sourceCoords: coords }); // remember where piece was picked up
          ls = this.setLegalSquares(coords, piece); // calculate legal moves
          this.setState({ legalSquares: ls});
          // set indicator for where moves are legal
          if(ls.length > 0 && !this.pieceIsPinned(coords))
            for(let i = 0; i < ls.length; i++){
              if(this.state.board[ls[i][0]][ls[i][1]] === 0){
                let indMap = [...this.state.indicatorMap];
                indMap[ls[i][0]][ls[i][1]] = 1;
                this.setState({indicatorMap: indMap});
              }
              else{
                let indMap = [...this.state.indicatorMap];
                indMap[ls[i][0]][ls[i][1]] = 2;
                this.setState({indicatorMap: indMap});
              }
            }
        } else console.log("can't move");
      }
    }

    // if piece is currently picked up, check if clicked square is a legal destination
    // move if so, drop piece if not
    if (this.state.currPiece !== 0) {
      this.handleMove(coords);
      // reset move indicator visuals
      this.resetMoveIndicators();
    }
  };

  openPromotionMenu = () => {
    this.promoMenuDb.set(true);
  };

  onPromotionMenuClick = (piece, e, coords) => {
    e.preventDefault();
    this.setState({ promotedPiece: piece });
    this.promoMenuDb.set(false);
    this.onPromotePiece();
  };

  onPromotePiece = async () => {
    while (!this.state.promoMenu) {
      await this.sleep(100); // promo menu will only close when onPromotionMenuClick is called!!!
    }
    while (this.state.promoMenu) {
      await this.sleep(100); // promo menu will only close when onPromotionMenuClick is called!!!
    }
    this.game
      .child(
        "board/" +
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
        this.game.child("white_id_old").set(this.props.whiteId);
        this.game.child("black_id_old").set(this.props.blackId);
        this.game.child("white_id").set(-1);
        this.game.child("black_id").set(-1);
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
        this.game.child("white_id_old").set(this.props.whiteId);
        this.game.child("black_id_old").set(this.props.blackId);
        this.game.child("white_id").set(-1);
        this.game.child("black_id").set(-1);
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
    let capturedPiece = this.state.board[coords[0]][coords[1]];
    // if legal move, modify board state and change current mover to opposite color
    if (this.moveIsLegal(coords, this.state.currPiece, this.state.sourceCoords, this.state.legalSquares, false)) {
      let castled = false;
      let enPassant = false;
      this.game
        .child("board/" + coords[0] + "/" + coords[1])
        .set(this.state.currPiece);
      this.game
        .child(
          "board/" +
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
          // capture a pawn if en passant was performed
          if(this.state.currPiece === 1 && coords[0] === 2 && this.state.board[coords[0] + 1][coords[1]] === 7 && capturedPiece === 0){
            this.game
              .child("board/" + (coords[0] + 1) + "/" + coords[1])
              .set(0);
            enPassant = true;
          }
          // track if a pawn has moved two squares forward
          if(this.state.currPiece === 1 && this.state.sourceCoords[0] === 6 && coords[0] === 4)
            this.pawnTwoForward.set(coords[1]);
          // reset pawn two forward tracking variable if needed
          else if(this.state.pawnTwoForward !== -1)
            this.pawnTwoForward.set(-1);
          // update king coords if king is being moved
          if (this.state.currPiece === 6) {
            this.whiteKing.set("" + coords[0] + " " + coords[1]);
            if(this.state.whiteCastleKs || this.state.whiteCastleQs){
              // move rook if it was a castle move (can castle = true, moved piece = king)
              if(coords[1] === 6 && this.state.whiteCastleKs){
                this.game
                  .child("board/" + 7 + "/" + 5)
                  .set(4);
                this.game
                  .child(
                    "board/" +
                      7 +
                      "/" +
                      7
                  )
                  .set(0);
                // track castle in movelog
                this.moveLog.child("/" + Math.floor(this.state.moveNum / 2) + "/" + (this.state.moveNum % 2)).set("O-O");
                castled = true;
              }
              else if(coords[1] === 2 && this.state.whiteCastleQs){
                this.game
                  .child("board/" + 7 + "/" + 3)
                  .set(4);
                this.game
                  .child(
                    "board/" +
                      7 +
                      "/" +
                      0
                  )
                  .set(0);
                // track castle in movelog
                this.moveLog.child("/" + Math.floor(this.state.moveNum / 2) + "/" + (this.state.moveNum % 2)).set("O-O-O");
                castled = true;
              }

              this.white_ks.set(false);
              this.white_qs.set(false);
            }
          }

          else if(this.state.currPiece === 4 && this.state.sourceCoords[0] === 7 && this.state.sourceCoords[1] === 0 && this.state.whiteCastleQs)
            this.white_qs.set(false);
          else if(this.state.currPiece === 4 && this.state.sourceCoords[0] === 7 && this.state.sourceCoords[1] === 7 && this.state.whiteCastleKs)
            this.white_ks.set(false);

          // update move log for non castle
          if(!castled){
            // check if captured piece
            if(capturedPiece > 0){
              if(this.state.currPiece !== 1)
                this.moveLog.child("/" + Math.floor(this.state.moveNum / 2) + "/" + (this.state.moveNum % 2)).set("" + this.state.pieceMap[this.state.currPiece] + "x" + this.state.letterMap[coords[1]] + this.state.rowMap[coords[0]]);
              else
                this.moveLog.child("/" + Math.floor(this.state.moveNum / 2) + "/" + (this.state.moveNum % 2)).set("" + this.state.letterMap[this.state.sourceCoords[1]] + "x" + this.state.letterMap[coords[1]] + this.state.rowMap[coords[0]]);
            }
            else if(enPassant)
              this.moveLog.child("/" + Math.floor(this.state.moveNum / 2) + "/" + (this.state.moveNum % 2)).set("" + this.state.letterMap[this.state.sourceCoords[1]] + "x" + this.state.letterMap[coords[1]] + this.state.rowMap[coords[0]]);
            else
              this.moveLog.child("/" + Math.floor(this.state.moveNum / 2) + "/" + (this.state.moveNum % 2)).set("" + this.state.pieceMap[this.state.currPiece] + this.state.letterMap[coords[1]] + this.state.rowMap[coords[0]]);
          }
          this.moveNum.set(this.state.moveNum + 1);

          // checkmate? if so, show alert and end game
          if(this.isStalemated()){
            // remove right to move pieces from both sides
            this.game.child("white_id_old").set(this.props.whiteId);
            this.game.child("black_id_old").set(this.props.blackId);
            this.game.child("white_id").set(-1);
            this.game.child("black_id").set(-1);
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
          // capture a pawn if en passant was performed
          if(this.state.currPiece === 7 && coords[0] === 5 && this.state.board[coords[0] - 1][coords[1]] === 1 && capturedPiece === 0){
            this.game
              .child("board/" + (coords[0] - 1) + "/" + coords[1])
              .set(0);
            enPassant = true;
          }
          // track if pawn has moved two squares forward
          if(this.state.currPiece === 7 && this.state.sourceCoords[0] === 1 && coords[0] === 3)
            this.pawnTwoForward.set(coords[1]);
          // reset the pawn two forward tracking variable if needed
          else if(this.state.pawnTwoForward !== -1)
            this.pawnTwoForward.set(-1);

          
          // update king coords if king is being moved
          if (this.state.currPiece === 12) {
            this.blackKing.set("" + coords[0] + " " + coords[1]);
            if(this.state.blackCastleKs || this.state.blackCastleQs){
              if(coords[1] === 6 && this.state.blackCastleKs){
                this.game
                  .child("board/" + 0 + "/" + 5)
                  .set(10);
                this.game
                  .child(
                    "board/" +
                      0 +
                      "/" +
                      7
                  )
                  .set(0);
                // track castle in movelog
                this.moveLog.child("/" + Math.floor(this.state.moveNum / 2) + "/" + (this.state.moveNum % 2)).set("O-O");
                castled = true;
              }
              else if(coords[1] === 2 && this.state.blackCastleQs){
                this.game
                  .child("board/" + 0 + "/" + 3)
                  .set(10);
                this.game
                  .child(
                    "board/" +
                      0 +
                      "/" +
                      0
                  )
                  .set(0);
                // track castle in movelog
                this.moveLog.child("/" + Math.floor(this.state.moveNum / 2) + "/" + (this.state.moveNum % 2)).set("O-O-O");
                castled = true;
              }

              this.black_ks.set(false);
              this.black_qs.set(false);
            }
          }

          else if(this.state.currPiece === 10 && this.state.sourceCoords[0] === 0 && this.state.sourceCoords[1] === 0 && this.state.blackCastleQs)
            this.black_qs.set(false);
          else if(this.state.currPiece === 10 && this.state.sourceCoords[0] === 0 && this.state.sourceCoords[1] === 7 && this.state.blackCastleKs)
            this.black_ks.set(false);

          // update move log for non castle
          if(!castled){
            // check if captured piece
            if(capturedPiece > 0){
              if(this.state.currPiece !== 7)
                this.moveLog.child("/" + Math.floor(this.state.moveNum / 2) + "/" + (this.state.moveNum % 2)).set("" + this.state.pieceMap[this.state.currPiece] + "x" + this.state.letterMap[coords[1]] + this.state.rowMap[coords[0]]);
              else
                this.moveLog.child("/" + Math.floor(this.state.moveNum / 2) + "/" + (this.state.moveNum % 2)).set("" + this.state.letterMap[this.state.sourceCoords[1]] + "x" + this.state.letterMap[coords[1]] + this.state.rowMap[coords[0]]);
            }
            else if(enPassant)
              this.moveLog.child("/" + Math.floor(this.state.moveNum / 2) + "/" + (this.state.moveNum % 2)).set("" + this.state.letterMap[this.state.sourceCoords[0]] + "x" + this.state.letterMap[coords[1]] + this.state.rowMap[coords[0]]);
            else
              this.moveLog.child("/" + Math.floor(this.state.moveNum / 2) + "/" + (this.state.moveNum % 2)).set("" + this.state.pieceMap[this.state.currPiece] + this.state.letterMap[coords[1]] + this.state.rowMap[coords[0]]);
          }
          this.moveNum.set(this.state.moveNum + 1);

          //checkmate? if so, show alert and end game
          if(this.isStalemated()){
            // remove right to move pieces from both sides
            this.game.child("white_id_old").set(this.props.whiteId);
            this.game.child("black_id_old").set(this.props.blackId);
            this.game.child("white_id").set(-1);
            this.game.child("black_id").set(-1);
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
      this.setState({ currPiece: 0 });
      this.setState({ sourceCoords: [-1, -1] });
    }
  };

  pieceIsPinned = (coords) => {
    var tempBoard = this.state.board;
    var piece = tempBoard[coords[0]][coords[1]];
    tempBoard[coords[0]][coords[1]] = 0;
    var check;
    if(this.state.currentMover === "white")
      check = moveCalc.isUnderCheck(this.state.whiteKingCoords, "white", tempBoard);
    else
      check = moveCalc.isUnderCheck(this.state.blackKingCoords, "black", tempBoard);
    tempBoard[coords[0]][coords[1]] = piece;
    return check;
  }

  moveIsLegal = (coords, piece, source, ls, checkStalemate) => {
    var i, current;
    for (i = 0; i < ls.length; i++) {
      current = ls[i];
      // pending destination is legal
      if (coords[0] === current[0] && coords[1] === current[1]) {
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
              check = !moveCalc.isUnderCheck(coords, "black", tempBoard);
            else
              check = !moveCalc.isUnderCheck(coords, "white", tempBoard);
            if(!check || checkStalemate){
              tempBoard[source[0]][source[1]] = piece;
              tempBoard[coords[0]][coords[1]] = oldPiece;
            }
            return check;
          }
        }
        // check if this move will leave the king in check
        if (this.state.currentMover === "white") {
          // create the move on a temporary board and see if king is under check in that board
          var tempBoard = this.state.board;
          var oldPiece = tempBoard[coords[0]][coords[1]];
          tempBoard[source[0]][source[1]] = 0;
          tempBoard[coords[0]][coords[1]] = piece;
          var check;
          // return true if not under check
          if(!checkStalemate)
            check = !moveCalc.isUnderCheck(this.state.whiteKingCoords, this.state.currentMover, tempBoard)
          else
            check = !moveCalc.isUnderCheck(this.state.blackKingCoords, "black", tempBoard);
          if(!check || checkStalemate){
            tempBoard[source[0]][source[1]] = piece;
            tempBoard[coords[0]][coords[1]] = oldPiece;
          }
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
    if (piece === 0) return;

    // pawn move
    if (piece === 1 || piece === 7) {
      var color = piece === 1 ? "white" : "black";
      var legalSquares = moveCalc.calculatePawnMoves(
        coords,
        color,
        this.state.board,
        this.state.pawnTwoForward
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

  isStalemated = () => {
    if(this.state.currentMover === "white" || this.state.currentMover === "white_promo_pending") {
      for(let r = 0; r < this.state.board.length; r++){
        for(let c = 0; c < this.state.board.length; c++){
          // check if piece is white
          var piece = this.state.board[r][c];
          if(piece >= 7 && piece <= 12) {
            // check if piece can legally move, not stalemate if so
            var ls = this.setLegalSquares([r, c], piece);
            for(let i = 0; i < ls.length; i++){
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
            // check if piece can legally move, not stalemate if so
            var ls = this.setLegalSquares([r, c], piece);
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

  resetBoard = () => {
    this.checkmate.set(0);
    this.whiteKing.set("7 4");
    this.blackKing.set("0 4");
    this.black_ks.set(true);
    this.black_qs.set(true);
    this.white_ks.set(true);
    this.white_qs.set(true);
    this.mover.set("white");
    this.promoMenuDb.set(false);
    this.moveNum.set(0);
    this.moveLog.set([[" ", " "]]);
    this.game
        .child("black_id")
        .set(
          this.state.blackIdOld
        );
    this.game
        .child("white_id")
        .set(
          this.state.whiteIdOld
        );
    this.game
        .child("board")
        .set([[10, 8, 9, 11, 12, 9, 8, 10],
              [7, 7, 7, 7, 7, 7, 7, 7],
              [0, 0, 0, 0, 0, 0, 0, 0],
              [0, 0, 0, 0, 0, 0, 0, 0],
              [0, 0, 0, 0, 0, 0, 0, 0],
              [0, 0, 0, 0, 0, 0, 0, 0],
              [1, 1, 1, 1, 1, 1, 1, 1],
              [4, 2, 3, 5, 6, 3, 2, 4]]);
    this.resetMoveIndicators();
  }

  resetMoveIndicators = () => {
    this.setState({indicatorMap: [[0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0]]})
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
    let board = [];
    if(this.props.uid === this.props.whiteId){
      for(let c = 0; c < this.state.board.length; c++){
        let col = [];
        for(let r = 0; r < this.state.board.length; r++){
          if((r + c) % 2 === 0)
            col.push(
              <Square
                isLight={true}
                onClick={this.handleClick}
                coords={[r, c]}
                indicator={this.state.indicatorMap[r][c]}
                gameId={this.props.gameId}
              />
            )
          else
            col.push(
              <Square
                isLight={false}
                onClick={this.handleClick}
                coords={[r, c]}
                indicator={this.state.indicatorMap[r][c]}
                gameId={this.props.gameId}
              />
            )
        }
        board.push(
          <div class="col-sm-1" style={this.styles.square}>
            {col}
          </div>
        )
      }
    }
    else {
      for(let c = this.state.board.length - 1; c >= 0; c--){
        let col = [];
        for(let r = this.state.board.length - 1; r >= 0; r--){
          if((r + c) % 2 === 0)
            col.push(
              <Square
                isLight={true}
                onClick={this.handleClick}
                coords={[r, c]}
                indicator={this.state.indicatorMap[r][c]}
                gameId={this.props.gameId}
              />
            )
          else
            col.push(
              <Square
                isLight={false}
                onClick={this.handleClick}
                coords={[r, c]}
                indicator={this.state.indicatorMap[r][c]}
                gameId={this.props.gameId}
              />
            )
        }
        board.push(
          <div class="col-sm-1" style={this.styles.square}>
            {col}
          </div>
        )
      }
    }
    return (
      <div>
        <div class="container ml-4">
          <button
            type="button"
            onClick={this.resetBoard}
            class="btn btn-primary"
          >
            Reset Board
          </button>
          <div class="row" ref={this.setWrapperRef}>
            {board}
            {promoMenu}
          </div>
        </div>
      </div>
    );
  }
}

const ChessboardFinal = withFirebase(ChessboardBase);

export default Chessboard;
