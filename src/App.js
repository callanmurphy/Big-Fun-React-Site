import './App.css';
import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import {
  CreateAccount,
  Home,
  Leaderboard,
  Login,
  Progress,
  Schedule,
} from './views.js';

class App extends React.Component {

  // state = {
  //   views: views
  // }

  render() {
    return (
      <Router>
        <div>
          <nav>
            <ul>
              <li>
                <Link to="/createaccount">Create Account</Link>
              </li>
              <li>
                <Link to="/home">Home</Link>
              </li>
              <li>
                <Link to="/leaderboard">Leaderboard</Link>
              </li>
              <li>
                <Link to="/">Login</Link>
              </li>
              <li>
                <Link to="/progress">Progress</Link>
              </li>
              <li>
                <Link to="/schedule">Schedule</Link>
              </li>
            </ul>
          </nav>

          
          <Switch>
            <Route path="/createaccount">
                  <CreateAccount />
            </Route>
            <Route path="/home">
                  <Home />
            </Route>
            <Route path="/leaderboard">
                  <Leaderboard />
            </Route>
            <Route path="/progress">
                  <Progress />
            </Route>
            <Route path="/schedule">
                  <Schedule />
            </Route>
            <Route path="/">
              <Login />
            </Route>
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
