import React, { Component } from "react";
import chessboard from "../pictures/3DChessboard.gif";
import { NavLink } from "react-router-dom";
import { withFirebase } from "../FireBase";

const Home = () => (
  <HomeFinal/>
)

class HomeBase extends Component {
  constructor(props){
    super(props);

    this.database = this.props.firebase.db;
    this.games = this.database.ref("games");

    this.state = {
      games: [],
      gameCreated: false
    }
  }

  componentDidMount() {
    this.games.on("value", snapshot => {
      let games = [];
      snapshot.forEach((snap) => {
        games.push(snap.key);
      })
      this.setState({ games });
    })

  }

  async createGame() {
    await this.games.push({
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
    this.setState({gameCreated: true});
  }

  render() {
    return (
      <React.Fragment>
        <a href="https://www.google.com/">
          <img className="undraggable chessboard" src={chessboard} alt="" />
        </a>
        <h1>{this.state.games}</h1>
        <NavLink to="/Game"> TEST </NavLink>

        <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModal" onClick={this.createGame.bind(this)}>
          Create New Game
        </button>

        <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div class="modal-dialog" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body">
                Game created! Your link is: 
                <a href={window.location.href + "game/" + this.state.games[0]} onclick="$('#myModal').modal('hide')">{this.state.games[0]}</a>
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

const HomeFinal = withFirebase(HomeBase);

export default Home;
