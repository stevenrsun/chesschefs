import React, { Component } from "react";
//import firebase from "firebase";
import { withFirebase } from "../FireBase";
import Chessboard from "./chessboard";
import { AuthUserContext } from "../Session";
import Chat from "./chat";

const Game = ({ authUser, match }) => (
  <div>
    <AuthUserContext.Consumer>
      {(authUser) =>
        authUser ? (
          <GameFinal uid={authUser.uid} gameId={match.params.id}/>
        ) : (
          <GameFinal uid={0} gameId={match.params.id}/>
        )
      }
    </AuthUserContext.Consumer>
  </div>
);

class GameWithUID extends Component {
  constructor(props) {
    super(props);

    this.database = this.props.firebase.db;
    this.game = this.database.ref("games/" + this.props.gameId);
    this.white = this.game.child("white_id");
    this.black = this.game.child("black_id");
    this.checkmate = this.game.child("checkmate");
    this.moveLog = this.game.child("move_log");
    this.moveNum = this.game.child("move_num");

    this.state = {
      gameId: 0,
      countOne: 0,
      countTwo: 0,

      whiteId: "",
      blackId: "",

      checkmate: 0,

      moveLog: [],
      moveNum: 0
    };
  }

  componentDidMount() {
    this.setState({gameId: this.props.gameId});
    this.checkmate.on("value", (snap) => {
      this.setState({
        checkmate: snap.val(),
      });
    });
    this.white.on("value", (snapshot) => {
      this.setState({
        whiteId: snapshot.val(),
      });
      if (snapshot.val() === 0){ 
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
      if (
        snapshot.val() === 0 &&
        whiteId !== 0 &&
        whiteId !== this.props.uid
      )
        this.black.set(this.props.uid);
    });
    this.moveLog.on("value", (snap) => {
      this.setState({ moveLog: snap.val() });
    });
    this.moveNum.on("value", (snap) => {
      this.setState({ moveNum: snap.val() });
    });
  }

  render() {
    let gameExists;
    let winMenu;
    let moveLog = [];
    this.database.ref("games").once('value', snapshot => {
      if(snapshot.hasChild(this.state.gameId))
        gameExists = true;
      else
        gameExists = false;
    })
    if(gameExists) {
      if (this.state.checkmate !== 0) {
        if(this.state.checkmate === "draw")
          winMenu = <h1 class="head">DRAW</h1>
        else
          winMenu =
            this.state.checkmate === "white" ? (
              <h1 class="head">WHITE VICTORY</h1>
            ) : (
              <h1 class="head">BLACK VICTORY</h1>
            );
      }
      for(let i = 0; i < this.state.moveLog.length; i++){
        moveLog.push(
          <tr>
            <th scope="row">{i + 1}</th>
            <td>{this.state.moveLog[i][0]}</td>
            <td>{this.state.moveLog[i][1]}</td>
          </tr>
        )
      }
    }
    let error = gameExists ? null : <h1>Loading... (if not loaded soon, game does not exist anymore)</h1>;
    return (
      <React.Fragment>
        {error}
        {gameExists && <div>
        <h1>{this.props.uid}</h1>
        <h1 style={{ marginTop: 50 }}>
          whiteId: {this.state.whiteId}
          <br />
          your UID: {this.props.uid}
          <br />
          counterOne has been incremented: {this.state.countOne} times
        </h1>
        <h1 style={{ marginTop: 50 }}>
          blackId: {this.state.blackId}
          <br />
          your UID: {this.props.uid}
          <br />
          counterTwo has been incremented: {this.state.countTwo} times
        </h1>
        <button
          type="button"
          onClick={this.incrementCounterOne}
          class="btn btn-primary"
        >
          Increment Button One
        </button>

        <button
          type="button"
          onClick={this.incrementCounterTwo}
          class="btn btn-primary"
        >
          Increment Button Two
        </button>
        <Chat 
          uid={this.props.uid}
          whiteId={this.state.whiteId}
          blackId={this.state.blackId}
        />

        {winMenu}
        <div class="row">
          <div class="col-sm-8">
            <Chessboard
              uid={this.props.uid}
              whiteId={this.state.whiteId}
              blackId={this.state.blackId}
              gameId={this.props.gameId}
            />
          </div>
          <div class="col-sm-2">
            <table class="table">
              <thead>
                <tr>
                  <th scope="col"> </th>
                  <th scope="col">White</th>
                  <th scope="col">Black</th>
                </tr>
              </thead>
              <tbody>
                {moveLog}
              </tbody>
            </table>
          </div>
        </div>
        </div>}
      </React.Fragment>
    );
  }
}

const GameFinal = withFirebase(GameWithUID);

export default Game;
