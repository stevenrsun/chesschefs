import React, { Component } from "react";
import firebase from "firebase";
import Chessboard from "./chessboard";
import { AuthUserContext } from "../Session";

const Counter = ({ authUser }) => (
  <div>
    <AuthUserContext.Consumer>
      {(authUser) =>
        authUser ? (
          <CounterWithUID uid={authUser.uid} />
        ) : (
          <CounterWithUID uid={0} />
        )
      }
    </AuthUserContext.Consumer>
  </div>
);

class CounterWithUID extends Component {
  constructor() {
    super();

    this.database = firebase.database();
    this.counterOne = this.database.ref().child("TEST_COUNTER_ONE");
    this.counterTwo = this.database.ref().child("TEST_COUNTER_TWO");

    this.state = {
      countOne: 0,
      countTwo: 0,

      firstUID: "",
      secondUID: "",
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

    if (this.state.firstUID === "") {
      this.state.firstUID = this.props.uid;
    } else {
      this.state.secondUID = this.props.uid;
    }
  }

  incrementCounterOne = () => {
    if (this.props.uid === this.state.firstUID) {
      this.counterOne.set(this.state.countOne + 1);
    }
  };

  incrementCounterTwo = () => {
    if (this.props.uid === this.state.secondUID) {
      this.counterTwo.set(this.state.countTwo + 1);
    }
  };

  render() {
    return (
      <React.Fragment>
        <h1>{this.props.uid}</h1>
        <h1 style={{ marginTop: 50 }}>
          firstUID: {this.state.firstUID}
          <br />
          your UID: {this.props.uid}
          <br />
          counterOne has been incremented: {this.state.countOne} times
        </h1>
        <h1 style={{ marginTop: 50 }}>
          secondUID: {this.state.secondUID}
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

        <Chessboard />
      </React.Fragment>
    );
  }
}

export default Counter;
