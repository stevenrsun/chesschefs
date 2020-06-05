import React from "react";
import logo from "./logo.svg";
import "./App.css";
import "./fonts/ITCErasStd-Light.otf";
import Home from "./components/Home/home";
import Counter from "./components/Game/counter";
import { BrowserRouter, Route } from "react-router-dom";
import NavBar from "./components/navBar";
import login from "./components/login";

class App extends React.Component {
  render() {
    return (
      <React.Fragment>
        <NavBar />
        <BrowserRouter>
          <div>
            <Route exact path="/" component={Home} />
            <Route path="/Game" component={Counter} />
            <Route path="/login" component={login} />
          </div>
        </BrowserRouter>
      </React.Fragment>
    );
  }
}

export default App;
