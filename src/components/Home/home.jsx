import React, { Component } from "react";
import { withFirebase } from "../FireBase";
import firebase from "firebase";
import { AuthUserContext } from "../Session";
import spoons from '../pictures/Home Screen/SpoonAnimationRevamp.gif'
import staticspoons from '../pictures/Home Screen/SpoonStaticRevamp.png'
import spoonscrossed from '../pictures/Home Screen/SpoonsCrossed.png'
import info from '../pictures/Home Screen/Info.png'
import startWhite from '../pictures/Modal/StartAsWhite.png'
import startBlack from '../pictures/Modal/StartAsBlack.png'

const Home = () => (
  <div>
    <AuthUserContext.Consumer>
      {(authUser) =>
        authUser ? <HomeFinal uid={authUser.uid} /> : <HomeFinal uid={0} />
      }
    </AuthUserContext.Consumer>
  </div>
)

class HomeBase extends Component {
  constructor(props) {
    super(props);

    this.database = this.props.firebase.db;
    this.games = this.database.ref("games");

    this.state = {
      games: [],
      gameCreated: false,
      hover: false
    }
  }

  async componentDidMount() {
    if (this.props.uid === 0) {
      await firebase.auth().signInAnonymously();
    }
    this.games.on("value", snapshot => {
      let games = [];
      snapshot.forEach((snap) => {
        games.push(snap.key);
      })
      this.setState({ games });
    })

  }

  createGameWhite = async () => {
    await this.games.push({
      color_pref: "white",
      checkmate: 0,
      white_king: "7 4",
      black_king: "0 4",
      black_castle_ks: true,
      black_castle_qs: true,
      white_castle_ks: true,
      white_castle_qs: true,
      current_mover: "white",
      promo_menu: false,
      promo_coords: "0, 0",
      black_id: 0,
      black_id_old: 0,
      white_id: 0,
      white_id_old: 0,
      board: [[10, 8, 9, 11, 12, 9, 8, 10],
      [7, 7, 7, 7, 7, 7, 7, 7],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [1, 1, 1, 1, 1, 1, 1, 1],
      [4, 2, 3, 5, 6, 3, 2, 4]],
      current_move: 0,
      current_piece: 0,
      move_log: [[" ", " "]],
      move_num: 0,
      pawn_two_forward: -1,
      black_draw: 0,
      white_draw: 0
    });
    this.setState({ gameCreated: true });
  }

  createGameBlack = async () => {
    await this.games.push({
      color_pref: "black",
      checkmate: 0,
      white_king: "7 4",
      black_king: "0 4",
      black_castle_ks: true,
      black_castle_qs: true,
      white_castle_ks: true,
      white_castle_qs: true,
      current_mover: "white",
      promo_menu: false,
      promo_coords: "0, 0",
      black_id: 0,
      black_id_old: 0,
      white_id: 0,
      white_id_old: 0,
      board: [[10, 8, 9, 11, 12, 9, 8, 10],
      [7, 7, 7, 7, 7, 7, 7, 7],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [1, 1, 1, 1, 1, 1, 1, 1],
      [4, 2, 3, 5, 6, 3, 2, 4]],
      current_move: 0,
      current_piece: 0,
      move_log: [[" ", " "]],
      move_num: 0,
      pawn_two_forward: -1
    });
    this.setState({ gameCreated: true });
  }

  render() {
    let hover = this.state.hover ? <img src={spoonscrossed} className="undraggable spoons" alt="" /> : <img src={staticspoons} className="undraggable spoons" alt="" />;
    let modalBody = this.state.gameCreated ?
      <div class="modal-body kalyant" style={{ fontSize: 26 }}>
        Game created! <br />
        <a href={window.location.href + "game/" + this.state.games[this.state.games.length - 1]} onclick="$('#myModal').modal('hide')">{window.location.href + "game/" + this.state.games[this.state.games.length - 1]}</a>
      </div > :
      <div class="modal-body">
        <div class='modal-div'>
          <button type="button" className="startButton" onClick={this.createGameWhite}><img className="undraggable logo" src={startWhite} alt="" /></button>
          <button type="button" className="startButton" onClick={this.createGameBlack}><img className="undraggable logo" src={startBlack} alt="" /></button>
        </div>
      </div >;
    return (
      <div className="main_content">
        <button type="button" class="spoonsButton undraggable" data-toggle="modal" data-target="#exampleModal" onMouseEnter={() => this.setState({ hover: true })} onMouseLeave={() => this.setState({ hover: false })}>
          {hover}
        </button>
        <img src={info} alt="" className="undraggable info" />



        <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div class="modal-dialog" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <h1 class="modal-title kalyant-bold" id="exampleModalLabel">Create New Game</h1>
              </div>
              {modalBody}
              <div class="modal-footer">
                <button type="button" class="btn btn-secondary kalyant" style={{ fontSize: 20 }} data-dismiss="modal" onClick={() => this.setState({ gameCreated: false })}>Cancel</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const HomeFinal = withFirebase(HomeBase);

export default Home;
