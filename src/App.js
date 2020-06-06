import React from "react";
import "./App.css";
import "./fonts/ITCErasStd-Light.otf";
import Home from "./components/Home/home";
import Counter from "./components/Game/counter";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Login from "./components/login";
import NavBar from "./components/NavBar/navBar";
import SignUp from "./components/signUp";

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
            <Route path="/signup" component={SignUp} />
          </Switch>
        </BrowserRouter>
      </React.Fragment>
    );
  }
}

export default App;
