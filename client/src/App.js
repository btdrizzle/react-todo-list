import React, { Component } from 'react';
import {BrowserRouter as Router, Route} from "react-router-dom"
import Nav from "./components/Nav";
import List from "./components/List";

class App extends Component {
  render() {
    return (
      <Router>
      <div>
        <Nav />
        <Route exact path="/" component={List} />
      </div>
    </Router>
    );
  }
}

export default App;