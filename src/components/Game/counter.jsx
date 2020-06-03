import React, { Component } from "react";
import firebase from 'firebase';

class Counter extends Component {
  constructor(){
    super()

    this.database = firebase.database();
    this.counter = this.database.ref().child('TEST_COUNTER');
    this.loads = this.database.ref().child('LOADS');

    this.state = {
      count: 0,
      loads: 0
    }
  }

  componentDidMount() {
    this.loads.on('value', snap => {
      this.setState({
        loads: snap.val()
      })
    })
    this.loads.set(this.state.loads + 1);
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
            <div>This page has been loaded: {this.state.loads} times</div>
            <button type="button" onClick={this.incrementCounter} class="btn btn-primary">Increment</button>
        </React.Fragment>
    );
  }
}

export default Counter;