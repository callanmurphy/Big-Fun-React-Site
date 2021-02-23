import './App.css';
import {Component} from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import CreateAccount from '../CreateAccount';
import Home from '../Home';
import Leaderboard from '../Leaderboard';
import Login from '../Login';
import Progress from '../Progress';
import Schedule from '../Schedule';


class App extends Component {
  
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

App.title = 'Team 05';

export default App;
