import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Link, Route, Switch
} from "react-router-dom";
import CreateAccount from '../CreateAccount';
import Home from '../Home';
import Leaderboard from '../Leaderboard';
import Login from '../Login';
import Progress from '../Progress';
import Schedule from '../Schedule';
import './App.css';
import { AppBar, IconButton, Toolbar, List, ListItem, ListItemText, Container } from '@material-ui/core';
import { Home as HomeIcn } from '@material-ui/icons';


class GameHome extends Component {

  render() {
    return (
      <Container>
        {
          this.props.gamelinks.map(g => (
            <Link key={g.title} to={g.path}>
              <h1>
                {g.title}
              </h1>
            </Link>
          ))
        }
      </Container>
    )
  }
}

class App extends Component {
  constructor(props) {
    super(props)
    this.gamelinks = [
      { path: '/games/game1', title: 'Game 1', element: (<h1>Game 1</h1>) },
      { path: '/games/game2', title: 'Game 2', element: (<h1>Game 2</h1>) },
      { path: '/games/game3', title: 'Game 3', element: (<h1>Game 3</h1>) },
    ]

    this.navlinks = [
      {
        title: 'Create Account',
        path: '/createaccount',
        element: (<CreateAccount />)
      }, {
        title: 'Leaderboard',
        path: '/leaderboard',
        element: (<Leaderboard />)
      }, {
        title: 'Login',
        path: '/',
        element: (<Login />)
      }, {
        title: 'Progress',
        path: '/progress',
        element: (<Progress games={this.gamelinks.map(g => g.title)} />)
      }, {
        title: 'Games',
        path: '/games',
        element: (<GameHome gamelinks={this.gamelinks} />)
      }, {
        title: 'Schedule',
        path: '/schedule',
        element: (<Schedule />)
      },
    ]

    this.state = {
      defaultUserName: "User"
    }


  }

  render() {
    return (
      <Router>
        <AppBar position='static'>
          <Toolbar className='homenav'>
            <Link to='/home'>
              <IconButton>
                <HomeIcn className='homebtn' />
              </IconButton>
            </Link>
            <List className='homenav'>
              {
                this.navlinks.map(({ title, path }) => (
                  <Link to={path} key={title} className='navtext'>
                    <ListItem button>
                      <ListItemText primary={title} />
                    </ListItem>
                  </Link>
                ))
              }
            </List>
          </Toolbar>
        </AppBar>


        <Switch>
          {/* home route */}
          <Route exact path='/home'>
            <Home username={this.state.defaultUserName} />
          </Route>
          {  // page routes
            this.navlinks.map(({ title, path, element }) => (
              <Route key={path} exact path={path}>
                {element}
              </Route>
            ))
          }
          {  // game routes
            this.gamelinks.map(({ title, path, element }) => (
              <Route key={path} exact path={path}>
                {element}
              </Route>
            ))
          }
        </Switch>
      </Router >
    );
  }
}

App.title = 'Team 05';

export default App;
