import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Link, Route, Switch
} from "react-router-dom";
import CreateAccount from '../CreateAccount';
import Home from '../Home';
import Leaderboard from '../Leaderboard';
import Login from '../Login';
// import TestComp from '../TestComp';
import Progress from '../Progress';
import Schedule from '../Schedule';
import './App.css';
import { AppBar, IconButton, Toolbar, List, ListItem, ListItemText, Container } from '@material-ui/core';
import { Home as HomeIcn, ExitToApp } from '@material-ui/icons';


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
        title: 'Leaderboard',
        path: '/leaderboard',
        element: (<Leaderboard />)
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
      // {
      //   title: 'Test',
      //   path: '/test',
      //   element: (<TestComp />)
      // },
    ]

    this.nonNavlinks = [
      {
        path: '/',
        element: (<Login login={() => this.login()} />)
      }, {
        path: '/createaccount',
        element: (<CreateAccount />)
      }
    ]

    this.state = {
      defaultUserName: "User",
      loggedIn: true
    }


  }

  login() {
    this.setState({
      loggedIn: true
    })
  }

  logout() {
    this.setState({
      loggedIn: false
    })
  }

  render() {
    return (
      <Router>
        {this.state.loggedIn ?
          <AppBar position='static'>
            <Toolbar className='homenav'>
              <List>

                <Link to='/' onClick={() => this.logout()} key='logout'>
                  <IconButton>
                    <ExitToApp className='homebtn' />
                  </IconButton>
                </Link>

                <Link to='/home' key='home'>
                  <IconButton>
                    <HomeIcn className='homebtn' />
                  </IconButton>
                </Link>
              </List>
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
          : null
        }


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
          {  // game routes
            this.nonNavlinks.map(({ path, element }) => (
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
