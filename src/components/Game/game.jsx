import React, { Component } from "react";
import firebase from "firebase";
import { withFirebase } from "../FireBase";
import Chessboard from "./chessboard";
import { AuthUserContext } from "../Session";
import Chat from "./chat";

const Game = ({ authUser, match }) => (
  <div>
    <AuthUserContext.Consumer>
      {(authUser) =>
        authUser ? <GameFinal uid={authUser.uid} gameId={match.params.id} /> :
          <GameFinal uid={0} gameId={match.params.id} />
      }
    </AuthUserContext.Consumer>
  </div>
);

class GameWithUID extends Component {
  constructor(props) {
    super(props);

    this.database = this.props.firebase.db;
    this.game = this.database.ref("games/" + this.props.gameId);
    this.colorPref = this.game.child("color_pref");
    this.white = this.game.child("white_id");
    this.black = this.game.child("black_id");
    this.whiteOld = this.game.child("white_id_old");
    this.blackOld = this.game.child("black_id_old");
    this.checkmate = this.game.child("checkmate");
    this.moveLog = this.game.child("move_log");
    this.moveNum = this.game.child("move_num");
    this.whiteDraw = this.game.child("white_draw");
    this.blackDraw = this.game.child("black_draw");

    this.state = {
      gameId: this.props.gameId,
      countOne: 0,
      countTwo: 0,

      colorPref: "",
      whiteId: "",
      blackId: "",
      whiteIdOld: "",
      blackIdOld: "",
      currentMover: "white",

      checkmate: 0,
      whiteDraw: 0,
      blackDraw: 0,

      moveLog: [],
      moveNum: 0,
      loaded: false,

      indicatorMap: [[0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0]]
    };
  }

  async componentDidMount() {
    if (this.props.uid === 0) {
      await firebase.auth().signInAnonymously();
    }
    let colorPref;
    await this.colorPref.once("value", (snap) => {
      colorPref = snap.val();
    });
    this.checkmate.on("value", (snap) => {
      this.setState({
        checkmate: snap.val(),
      });
    });
    this.white.on("value", (snapshot) => {
      let blackId;
      this.black.once("value", (snap) => {
        blackId = snap.val();
      })
      this.setState({
        whiteId: snapshot.val(),
      });
      if (colorPref === "white") {
        if (snapshot.val() === 0 && this.props.uid)
          this.white.set(this.props.uid);
      }
      else {
        if (
          snapshot.val() === 0 &&
          blackId !== 0 &&
          blackId !== this.props.uid
          && this.props.uid
        )
          this.white.set(this.props.uid);
      }
    });
    this.black.on("value", (snapshot) => {
      let whiteId;
      this.white.once("value", (snap) => {
        whiteId = snap.val();
      })
      this.setState({
        blackId: snapshot.val(),
      });
      if (colorPref === "white") {
        if (
          snapshot.val() === 0 &&
          whiteId !== 0 &&
          whiteId !== this.props.uid
          && this.props.uid
        )
          this.black.set(this.props.uid);
      }
      else {
        if (snapshot.val() === 0 && this.props.uid)
          this.black.set(this.props.uid);
      }
    });
    this.moveLog.on("value", (snap) => {
      this.setState({ moveLog: snap.val() });
    });
    this.moveNum.on("value", (snap) => {
      this.setState({ moveNum: snap.val() });
    });
    this.whiteDraw.on("value", (snap) => {
      this.setState({ whiteDraw: snap.val() });
    });
    this.blackDraw.on("value", (snap) => {
      this.setState({ blackDraw: snap.val() });
    });
    this.whiteOld.on("value", (snap) => {
      this.setState({ whiteIdOld: snap.val() });
    });
    this.blackOld.on("value", (snap) => {
      this.setState({ blackIdOld: snap.val() });
    });
    this.game.child("current_mover").on("value", (snap) => {
      this.setState({ currentMover: snap.val() });
    });
    this.setState({ loaded: true });
  }

  guiDisplay = () => {
    if(this.state.checkmate === "white"){
      return <h1 style={{ width: 120, fontSize: 30, lineHeight: 3, paddingLeft: 10 }}>White wins!</h1>
    }
    else if(this.state.checkmate === "black"){
      return <h1 style={{ width: 120, fontSize: 30, lineHeight: 3, paddingLeft: 10 }}>Black wins!</h1>
    }
    else if(this.state.checkmate === "draw"){
      return <h1 style={{ width: 120, fontSize: 30, lineHeight: 3, paddingLeft: 10 }}>Draw!</h1>
    }

    else {
      if (this.state.currentMover === "white") {
        return <h1 style={{ width: 120, fontSize: 30, lineHeight: 3, paddingLeft: 10 }}>White's turn</h1>
      } 
      else if (this.state.currentMover === "black") {
        return <h1 style={{ width: 120, fontSize: 30, lineHeight: 3, paddingLeft: 10 }}>Blacks's turn</h1>
      } 
    }

    
  }

  onDraw = () => {
    if (this.props.uid === this.state.whiteId) {
      if (this.state.whiteDraw === 0)
        this.whiteDraw.set(1);
      else
        this.whiteDraw.set(0);
      if (this.state.blackDraw === 1) {
        // set draw conditions
        this.checkmate.set("draw");
        this.game.child("black_id_old").set(this.state.blackId);
        this.game.child("white_id_old").set(this.state.whiteId);
        this.white.set(-1);
        this.black.set(-1);
      }
    }
    else if (this.props.uid === this.state.blackId) {
      if (this.state.blackDraw === 0)
        this.blackDraw.set(1);
      else
        this.blackDraw.set(0);
      if (this.state.whiteDraw === 1) {
        // set draw conditions
        this.checkmate.set("draw");
        this.game.child("black_id_old").set(this.state.blackId);
        this.game.child("white_id_old").set(this.state.whiteId);
        this.white.set(-1);
        this.black.set(-1);
      }
    }
  }

  onResign = () => {
    if (this.props.uid === this.state.whiteId) {
      if(this.state.checkmate === 0 && this.state.whiteId !== -1){
        this.checkmate.set("black");
        this.game.child("black_id_old").set(this.state.blackId);
        this.game.child("white_id_old").set(this.state.whiteId);
        this.white.set(-1);
        this.black.set(-1);
      }
    }
    else {
      if(this.state.checkmate === 0 && this.state.whiteId !== -1){
        this.checkmate.set("white");
        this.game.child("black_id_old").set(this.state.blackId);
        this.game.child("white_id_old").set(this.state.whiteId);
        this.white.set(-1);
        this.black.set(-1);
      }
    }
  }

  resetBoard = () => {
    this.game.child("white_draw").set(0);
    this.game.child("black_draw").set(0);
    this.checkmate.set(0);
    this.game.child("white_king").set("7 4");
    this.game.child("black_king").set("0 4");
    this.game.child("black_castle_ks").set(true);
    this.game.child("black_castle_qs").set(true);
    this.game.child("white_castle_ks").set(true);
    this.game.child("white_castle_qs").set(true);
    this.game.child("current_mover").set("white");
    this.game.child("promo_menu").set(false);
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
    this.setState({
      indicatorMap: [[0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0]]
    })
  }

  render() {
    let gameExists;
    let winMenu;
    let moveLog = [];
    this.database.ref("games").once('value', snapshot => {
      if (snapshot.hasChild(this.state.gameId))
        gameExists = true;
      else
        gameExists = false;
    })
    if (gameExists) {
      if (this.state.checkmate !== 0) {
        if (this.state.checkmate === "draw")
          winMenu = <h1 class="kalyant-bold">Draw</h1>
        else
          winMenu =
            this.state.checkmate === "white" ? (
              < h1 class="kalyant-bold" > White Wins!</h1 >
            ) : (
                <h1 class="kalyant-bold">Black Wins!</h1>
              );
      }
      for (let i = 0; i < this.state.moveLog.length; i++) {
        moveLog.push(
          <tr>
            <th scope="row" class="kalyant" style={{ fontSize: 18 }}>{i + 1}</th>
            <td><span class="kalyant" style={{ fontSize: 18 }}>{this.state.moveLog[i][0]}</span></td>
            <td><span class="kalyant" style={{ fontSize: 18 }}>{this.state.moveLog[i][1]}</span></td>
          </tr>
        )
      }
    }
    let error = gameExists ? null : <h1>Loading... (if not loaded soon, game does not exist anymore)</h1>;
    return (
      <div className='main_content'>
        {error}
        {gameExists && this.state.loaded && <div>
          <Chat
            uid={this.props.uid}
            whiteId={this.state.whiteId}
            blackId={this.state.blackId}
            gameId={this.props.gameId}
          />
          <div class="row">

            <div class="col-sm-5">
              <Chessboard
                uid={this.props.uid}
                whiteId={this.state.whiteId}
                blackId={this.state.blackId}
                gameId={this.props.gameId}
                indicatorMap={this.state.indicatorMap}
              />
            </div>
            <div class="col-sm-3">
              <table style={{ width: '100%' }} >
                <thead>
                  <tr>
                    <th scope="col" class="kalyant-bold" style={{ width: 120, fontSize: 30, lineHeight: 3, paddingLeft: 10 }}>{this.guiDisplay()} PLACEHOLDER TURN</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <table class="table movelog">
                      <thead>
                        <tr>
                          <th scope="col"> </th>
                          <th scope="col" class="kalyant-bold" style={{ width: 210, fontSize: 21 }}>White</th>
                          <th scope="col" class="kalyant-bold" style={{ width: 210, fontSize: 21 }}>Black</th>
                        </tr>
                      </thead>
                      <tbody>
                        {moveLog}
                      </tbody>
                    </table>
                  </tr>
                  <tr>
                    {winMenu}
                  </tr>
                  <tr style={{ lineHeight: 3 }}>
                    <td><button class="btn btn-primary" onClick={this.onResign}>Resign</button></td>
                    <td><button class="btn btn-primary" onClick={this.onDraw}>Draw</button></td>
                    <td><h5>White: {this.state.whiteDraw}/1</h5> <h5>Black: {this.state.blackDraw}/1</h5></td>
                    <td><button class="btn btn-primary" onClick={this.resetBoard}>Rematch</button></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>}
      </div>
    );
  }
}

const GameFinal = withFirebase(GameWithUID);

export default Game;
