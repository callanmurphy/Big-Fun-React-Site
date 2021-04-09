import React, { Component } from 'react';
import {
  BrowserRouter,
  Link, Redirect, Route, Switch
} from "react-router-dom";
import Home from '../Home';
import Leaderboard from '../Leaderboard';
import { Login, CreateAccount } from '../Account';
import Progress from '../Progress';
import Challenges from '../Challenges';
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
      loggedIn: false
    }

    this.successAlert = false; // login success alert

    this.gamelinks = gamelinks

    this.navref = React.createRef();

    this.navlinks = [
      {
        title: 'Leaderboard',
        path: '/leaderboard',
        element: () => (<Leaderboard user={this.state.curUser} />)
      }, {
        title: 'Progress',
        path: '/progress',
        element: () => (<Progress user={this.state.curUser} games={this.gamelinks.map(g => g.title)} />)
      }, {
        title: 'Games',
        path: '/games',
        element: () => (<Games user={this.state.curUser} gamelinks={this.gamelinks} />)
      }, {
        title: 'Challenges',
        path: '/challenges',
        element: () => (<Challenges user={this.state.curUser} />)
      },
    ]
    this.state.navlinks = this.navlinks;

    this.nonNavlinks = [
      {
        path: '/login',
        element: () => this.state.loggedIn
          ? (this.state.curUser.isAdmin
              ? <Redirect to='/admin' />
              : <Redirect to='/home' />)
          : <Login login={async (user, pass) => await this.login(user, pass)} />
      }, {
        path: '/createaccount',
        element: () => (<CreateAccount />)
      }
    ]



  }

  async login(username, pass) {
    if (await login(username, pass)) {
      getUserByName(username).then(user => {
        console.log('Logging in as: ', user);
        let newlinks = this.navlinks.map(e => e);
        if (user.isAdmin) {
          newlinks.push({
            title: 'Admin',
            path: '/admin',
            element: () => (<Admin user={this.state.curUser} />)
          });
        }
        else {
          this.successAlert = true; // login success alert
          newlinks.push({
            title: 'Home',
            path: '/home',
            element: () => (<Home user={this.state.curUser} successAlert={this.successAlert} />)
          });
        }
        this.setState({
          loggedIn: true,
          navlinks: newlinks,
          curUser: user,
          username: username
        });
      });
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
      <BrowserRouter>
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
              ? () => <Home user={this.state.curUser} successAlert = {this.successAlert} />
              : () => <Redirect to='/login' />}
          />
          {  // page routes
            this.state.navlinks.map(({ title, path, element }) => (
              <Route key={path} exact path={path}
                render={this.state.loggedIn
                  ? element
                  : () => <Redirect to='/login' />}
              />
            ))
          }
          {  // game routes
            this.gamelinks.map(({ title, path, element }) => (
              <Route key={path} exact path={path}
                render={this.state.loggedIn
                  ? () => element(this.state.curUser)
                  : () => <Redirect to='/login' />}
              />
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
      </BrowserRouter >
    );
  }
}

App.title = 'Big Fun';

export default App;
