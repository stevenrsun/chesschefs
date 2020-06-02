import React, { Component } from "react";

class Counter extends Component {
  state = {
      count: 0
  };

  incrementCounter = () => {
      this.setState(state => ({count: this.state.count + 1}));
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