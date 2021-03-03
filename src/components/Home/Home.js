import React, { Component } from "react";
import './Home.css';

import Rival from './Rival' 
// import RivalHeader from './RivalHeader'
import ProfilePicture from './ProfilePicture'
import { profilePictures } from './';

import Input from '@material-ui/core/Input';
// import { Button, Menu, MenuItem } from '@material-ui/core';
import UserAvatar from '../UserAvatar';
import {getUser} from '../../backend/userAPI'

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
// import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

class Home extends Component {
  constructor(props) {
    super(props)
    const {user} = this.props
    this.state = {rivals: user.rivals}
    // this.state = {
    //   rivals: [
    //     {'username': 'Dave' , 'status': 'Game 1'},
    //     {'username': 'Jonas', 'status': 'Offline'},
    //     {'username': 'Corey', 'status': 'Offline'},
    //     {'username': 'BigBoss', 'status': 'Offline'},
    //     {'username': 'BAdmin', 'status': 'Idle'}
    //   ],
    //   allRivals: [
    //     {'username': 'Dave' , 'status': 'Game 1'},
    //     {'username': 'Jonas', 'status': 'Offline'},
    //     {'username': 'Corey', 'status': 'Offline'},
    //     {'username': 'BigBoss', 'status': 'Offline'},
    //     {'username': 'BAdmin', 'status': 'Idle'}
    //   ]
    // }
  }

  searchRivals(e) {
    const {user} = this.props
    // console.log(user)
    if (e.target.value === "") {
      this.setState({rivals: user.rivals})
    } else {
      // console.log('here')
      let newRivals = user.rivals
      // console.log(newRivals)
      newRivals = newRivals.filter((rival) => {
        // console.log(getUser(rival))
        // console.log(getUser(rival).name.toLowerCase().includes(e.target.value.toLowerCase()))
        return getUser(rival).name.toLowerCase().includes(e.target.value.toLowerCase());
      })
      this.setState({rivals: newRivals})
      // console.log('now', newRivals)
    }
  }

  render() {
  	const {user} = this.props
    const rivals = this.state.rivals.map((rivalId, i) =>
      <Rival
        key={i}
        user={getUser(rivalId)}
      />
    )
    return (
      <div>
        <ProfilePicture />
      <div id="UserInfo">
        <h1 id="Username">{user.name}</h1>
        <ul className="rivals">
          <li className="rivalsHeader">
                <h2 id="rivalsTitle">RIVALS</h2>
                <form id="rivalSearch">
                <Input type="text" placeholder="Search Rivals..." title="Type in a Rival's Name" onChange={this.searchRivals.bind(this)} />
                </form>
          </li>
                <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>User</TableCell>
            <TableCell align="right">Calories</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {this.state.rivals.map((rival, i) => (
            <TableRow key={i}>
              <TableCell align="right">
                <div className="rivalPic">
                  <UserAvatar uid={getUser(rival).id} onlineIndicator pic={profilePictures[getUser(rival).profilePic]} size='small' />
                </div>
              </TableCell>
              <TableCell align="right">
                <div className="rivalInfo">
                  {getUser(rival).name} - {getUser(rival).status}
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
          {rivals}
        </ul>
      </div>
      </div>
    )
  }

}



export default Home;
