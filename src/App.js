import React from "react";
import logo from "./logo.svg";
import "./App.css";
import "./fonts/ITCErasStd-Light.otf";
import Home from "./components/Home/home";
import Counter from "./components/Game/counter";
import {BrowserRouter, Route} from 'react-router-dom';

class App extends React.Component {
  render () {
    return (
      <React.Fragment>
        <BrowserRouter>
          <div>
            <Route exact path="/" component={Home} />
            <Route path="/Game" component={Counter} />
          </div>
        </BrowserRouter>
        
      </React.Fragment>
    );
  }
}

export default App;
