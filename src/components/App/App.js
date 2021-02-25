import { Component } from 'react';
import {
  BrowserRouter as Router,
  Link, Route, Switch
} from "react-router-dom";
import { uid } from 'react-uid';
import CreateAccount from '../CreateAccount';
import Home from '../Home';
import Leaderboard from '../Leaderboard';
import Login from '../Login';
import Progress from '../Progress';
import Schedule from '../Schedule';
import './App.css';



class App extends Component {
  constructor(props) {
    super(props)

    this.gameComponents = {
      'game1': (<h1>Game 1</h1>),
      'game2': (<h1>Game 2</h1>),
      'game3': (<h1>Game 3</h1>),
    }
    this.games = {
      'game1': 'Game 1',
      'game2': 'Game 2',
      'game3': 'Game 3',
    }
    this.state = {
      navDropdown: false,
      defaultUserName: "User"
    }
  }

  toggleDropdown() {
    this.setState({
      navDropdown: !this.state.navDropdown
    })
  }

  render() {
    const caretClasses = 'dropcaret' + (this.state.navDropdown ? ' active' : ' notactive');
    console.log(caretClasses)
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
              <li className="dropli">
                <button className="dropbtn" onClick={(_) => this.toggleDropdown()}>
                  Games <span className={caretClasses}>&#9660;</span>
                </button>
                {
                  this.state.navDropdown ?
                    <ul className='dropdown'>
                      {
                        Object.entries(this.games).map(([url, name]) => {
                          return (
                            <li key={uid(url + name)}><Link to={url}>{name}</Link></li>
                          );
                        })
                      }
                    </ul>
                    : null
                }
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
              <Progress games={Object.values((this.games))} />
            </Route>
            <Route path="/schedule">
              <Schedule />
            </Route>
            {
              Object.entries(this.gameComponents).map(([url, comp]) => {
                return (
                  <Route path={url} key={uid(comp)}>
                    { comp}
                  </Route>
                );
              })
            }
            <Route exact path="/">
              <Login />
            </Route>
          </Switch>
        </div>
      </Router >
    );
  }
}

App.title = 'Team 05';

export default App;
