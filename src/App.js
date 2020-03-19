import React, { Component } from 'react';
import logo from './components/img/1pig.png';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Link } from 'react-router-dom';
import './App.css';
import regis from "./regis";
import login from "./login";
import kapook from "./kp";
import income from "./in";
import expense from "./ex";

function App() {


  return (
    <Router>
      <Switch>
        <Route path="/ex" component={expense} />
        <Route path="/in" component={income} />
        <Route path="/kp" component={kapook} />
        <Route path="/regis" component={regis} />
        <Route path="/" exact component={login} />
      </Switch>

    </Router>
  );

}

export default App;
