import React from "react";
import "./App.css";
import "./fonts/ITCErasStd-Light.otf";
import Home from "./components/Home/home";
import Game from "./components/Game/game";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import SignInPage from "./components/Authentication/signIn";
import SignUp from "./components/Authentication/signUp";
import NavBar from "./components/NavBar/navBar";
import { withAuthentication } from "./components/Session";
import { withFirebase } from "./components/FireBase";

const App = () => (
  <AppFinal/>
)

class AppBase extends React.Component {
  constructor(props) {
    super(props);

    this.database = this.props.firebase.db;
    this.games = this.database.ref("games");
    this.state = {
      games: []
    }
  }

  componentDidMount() {
    this.games.on("value", snapshot => {
      let games = [];
      snapshot.forEach((snap) => {
        games.push(snap.key);
      })
      this.setState({ games });
    })
  }

  render() {
    return (
      <React.Fragment>
          <BrowserRouter>
          <NavBar/>
            <Switch>
              <Route exact path="/" component={Home} />
              <Route path="/game/:id" component={Game} />
              <Route path="/login" component={SignInPage} />
              <Route path="/signup" component={SignUp} />
            </Switch>
          </BrowserRouter>
      </React.Fragment>
    );
  }
}

const AppFinal = withFirebase(AppBase);

export default withAuthentication(App);
