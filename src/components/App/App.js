import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Link, Redirect, Route, Switch
} from "react-router-dom";
import Home from '../Home';
import Leaderboard from '../Leaderboard';
import { Login, CreateAccount } from '../Account';
import Progress from '../Progress';
import Schedule from '../Schedule';
import Admin from '../Admin';
import Games, { gamelinks } from '../Games';
import './App.css';
import { AppBar, IconButton, Toolbar, List, ListItem, ListItemText } from '@material-ui/core';
import { ExitToApp } from '@material-ui/icons';
import 'fontsource-roboto';


import { login, getUser, getUserByName } from '../../backend/userAPI'

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      curUser: getUser(0),
      loggedIn: false
    }

    this.gamelinks = gamelinks

    this.navref = React.createRef();

    this.navlinks = [
      {
        title: 'Leaderboard',
        path: '/leaderboard',
        element: (<Leaderboard user={this.state.curUser} />)
      }, {
        title: 'Progress',
        path: '/progress',
        element: (<Progress user={this.state.curUser} games={this.gamelinks.map(g => g.title)} />)
      }, {
        title: 'Games',
        path: '/games',
        element: (<Games user={this.state.curUser} gamelinks={this.gamelinks} />)
      }, {
        title: 'Schedule',
        path: '/schedule',
        element: (<Schedule user={this.state.curUser} />)
      },
    ]
    this.state.navlinks = this.navlinks;

    this.nonNavlinks = [
      {
        path: '/login',
        element: () => this.state.loggedIn ? <Redirect to='/home' /> : <Login login={(user, pass) => this.login(user, pass)} />
      }, {
        path: '/createaccount',
        element: () => (<CreateAccount />)
      }
    ]



  }

  login(user, pass) {
    if (login(user, pass)) {
      let newlinks = this.navlinks.map(e => e);
      if (user === 'admin') {
        newlinks.push({
          title: 'Admin',
          path: '/admin',
          element: (<Admin />)
        });
      }
      this.setState({
        loggedIn: true,
        navlinks: newlinks,
        curUser: getUserByName(user)
      })
      return true;
    }
    return false;
  }

  logout() {
    this.setState({
      loggedIn: false,
      navlinks: this.navlinks
    })
  }

  render() {
    return (
      <Router>
        {this.state.loggedIn ?
          <AppBar position='static'>
            <Toolbar className='homenav' ref={this.navref}>
              <List>
                <Link to='/home' key='home'>
                  <IconButton>
                    <img className='sitelogo' src={'/img/icon-circle.png'} alt="Big Fun Logo" />
                  </IconButton>
                </Link>
                <Link to='/' onClick={() => this.logout()} key='logout'>
                  <IconButton>
                    <ExitToApp className='homebtn' />
                  </IconButton>
                </Link>
              </List>
              <List className='homenav'>
                {
                  this.state.navlinks.map(({ title, path }) => (
                    <Link to={path} key={title} className='navtext'>
                      <ListItem button>
                        <ListItemText
                          primary={title}
                          primaryTypographyProps={{ variant: 'h5' }}
                        />
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
          <Route exact path='/home'
            render={this.state.loggedIn
              ? () => <Home user={this.state.curUser} />
              : () => <Redirect to='/login' />}
          />
          {  // page routes
            this.state.navlinks.map(({ title, path, element }) => (
              <Route key={path} exact path={path}
                render={this.state.loggedIn
                  ? () => element
                  : () => <Redirect to='/login' />}
              />
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
                {element()}
              </Route>
            ))
          }
          <Route path='/'>  {/* catch all */}
            <Redirect to={this.state.loggedIn ? '/home' : '/login' } />
          </Route>
        </Switch>
      </Router >
    );
  }
}

App.title = 'Big Fun';

export default App;
