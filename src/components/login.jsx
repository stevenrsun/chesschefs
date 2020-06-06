import React, { Component } from "react";

class Login extends Component {
  constructor() {
    super();



    this.state = {
    };
  }
  render() {
    return (
      <form className="testForm">
        <div className="container">
          <label className> Username </label>
          <input
            type="text"
            placeholder="Enter Username"
            name="username"
            required
          />
          <br />
          <label> Password</label>
          <input
            type="password"
            placeholder="Enter Password"
            name="password"
            required
          />
        </div>

        <button type="submit">Login</button>
      </form>
    );
  }
}

export default Login;
