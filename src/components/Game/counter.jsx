import React, { Component } from "react";
//import firebase from "firebase";
import {withFirebase} from "../FireBase";
import Chessboard from "./chessboard";
import { AuthUserContext } from "../Session";

const Counter = ({ authUser }) => (
  <div>
    <AuthUserContext.Consumer>
      {(authUser) =>
        authUser ? (
          <CounterFinal uid={authUser.uid} />
        ) : (
          <CounterFinal uid={0} />
        )
      }
    </AuthUserContext.Consumer>
  </div>
);

class CounterWithUID extends Component {
  constructor(props) {
    super(props);

    this.database = this.props.firebase.db;
    this.counterOne = this.database.ref('game_example').child("white_counter");
    this.counterTwo = this.database.ref('game_example').child("black_counter");
    this.white = this.database.ref('game_example').child("white_id");
    this.black = this.database.ref('game_example').child("black_id");

    this.state = {
      countOne: 0,
      countTwo: 0,

      whiteId: "",
      blackId: "",
    };
  }

  componentDidMount() {
    this.counterOne.on("value", (snap) => {
      this.setState({
        countOne: snap.val(),
      });
    });

    this.counterTwo.on("value", (snap) => {
      this.setState({
        countTwo: snap.val(),
      });
    });

    this.white.on("value", (snapshot) => {
      this.setState({
        whiteId: snapshot.val(),
      });
      if(snapshot.val() === 0)
        this.white.set(this.props.uid)
    });

    this.black.on("value", (snapshot) => {
      this.setState({
        blackId: snapshot.val(),
      });
      if(snapshot.val() === 0 && this.state.whiteId != 0 && this.state.whiteId != this.props.uid)
        this.black.set(this.props.uid)
    });
  }

  incrementCounterOne = () => {
    if (this.props.uid === this.state.whiteId) {
      this.counterOne.set(this.state.countOne + 1);
    }
  };

  incrementCounterTwo = () => {
    if (this.props.uid === this.state.blackId) {
      this.counterTwo.set(this.state.countTwo + 1);
    }
  };

  render() {
    return (
      <React.Fragment>
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

        <Chessboard uid={this.props.uid} whiteId={this.state.whiteId} blackId={this.state.blackId}/>
      </React.Fragment>
    );
  }
}

const CounterFinal = withFirebase(CounterWithUID);

export default Counter;
