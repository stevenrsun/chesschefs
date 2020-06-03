import React, { Component } from "react";
import firebase from 'firebase';

class Counter extends Component {
  constructor(){
    super()

    this.database = firebase.database();
    this.counter = this.database.ref().child('TEST_COUNTER');

    this.state = {
      count: 0
    }
  }

  componentDidMount() {
    this.counter.on('value', snap => {
      this.setState({
        count: snap.val()
      })
    })
  }

  incrementCounter = () => {
      this.counter.set(this.state.count + 1);
  }

  render() {
    return (
        <React.Fragment>
            <h1 className="head">This counter has been incremented: {this.state.count} times</h1>
            <button type="button" onClick={this.incrementCounter} class="btn btn-primary">Increment</button>
        </React.Fragment>
    );
  }
}

export default Counter;