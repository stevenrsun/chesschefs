import React from "react";
import logo from "./logo.svg";
import "./App.css";
import "./fonts/ITCErasStd-Light.otf";
import Home from "./components/Home/home";
import Counter from "./components/Game/counter";
import { BrowserRouter, Route, NavLink, Switch } from "react-router-dom";
import Login from "./components/login";
import NavBar from "./components/NavBar/navBar";

class App extends React.Component {
  render() {
    return (
      <React.Fragment>
        <BrowserRouter>
        <NavBar/>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/Game" component={Counter} />
            <Route path="/login" component={Login} />
          </Switch>
        </BrowserRouter>
      </React.Fragment>
    );
  }
}

export default App;
