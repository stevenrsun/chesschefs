import React, { Component } from "react";
import firebase from "firebase";
import Chessboard from "./chessboard";
import { AuthUserContext } from '../Session';

const Counter = ({authUser}) => (
  <div>
    <AuthUserContext.Consumer>
            {authUser =>
                authUser ? <CounterWithUID uid={authUser.uid}/> : <CounterWithUID uid={0}/>
            }
    </AuthUserContext.Consumer>
  </div>
)

class CounterWithUID extends Component {
  constructor() {
    super();

    this.database = firebase.database();
    this.counter = this.database.ref().child("TEST_COUNTER");

    this.state = {
      count: 0
    };
  }

  componentDidMount() {
    this.counter.on("value", (snap) => {
      this.setState({
        count: snap.val(),
      });
    });
  }

  incrementCounter = () => {
    this.counter.set(this.state.count + 1);
  };

  render() {
    return (
      <React.Fragment>
        <h1>{this.props.uid}</h1>
        <h1 style={{ marginTop: 50 }}>
          This counter has been incremented: {this.state.count} times
        </h1>
        <button
          type="button"
          onClick={this.incrementCounter}
          class="btn btn-primary"
        >
          Increment
        </button>

        <Chessboard/>

      </React.Fragment>
    );
  }
}

export default Counter;
