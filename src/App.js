import React from "react";
import "./App.css";
import "./fonts/ITCErasStd-Light.otf";
import Home from "./components/Home/home";
import Counter from "./components/Game/counter";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import SignInPage from "./components/Authentication/signIn";
import SignUp from "./components/Authentication/signUp";
import NavBar from "./components/NavBar/navBar";
import { withAuthentication } from "./components/Session";

class App extends React.Component {

  render() {
    return (
      <React.Fragment>
          <BrowserRouter>
          <NavBar/>
            <Switch>
              <Route exact path="/" component={Home} />
              <Route path="/Game" component={Counter} />
              <Route path="/login" component={SignInPage} />
              <Route path="/signup" component={SignUp} />
            </Switch>
          </BrowserRouter>
      </React.Fragment>
    );
  }
}

export default withAuthentication(App);
