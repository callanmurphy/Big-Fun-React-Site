import React, { Component } from "react";
import { Table, TableBody, TableCell, TableRow, Avatar, Paper } from '@material-ui/core';
import { profilePictures } from "../Home"
import { getAllUsers } from "../../backend"
import "./Leaderboard.css"
import UserAvatar from '../UserAvatar';
import {updateStatus} from '../../backend/userAPI'

class Leaderboard extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      users: []
    }
  }

  componentDidMount() {
    document.title = 'Leaderboard - Big Fun';
    getAllUsers(this);
    const users = this.state.users;
    this.setState(users)
    const {user} = this.props
    updateStatus(user._id, "On Leaderboard")
  }

  getAvatar(user) {
    let pp = null
    let avatar = null

    if (user.profilePic === -1) {
      pp = {src: user.customProfilePic, name: "Custom"}
    } else {
      pp = profilePictures[user.profilePic]
    }

    if (user.online) {
      avatar = (<UserAvatar uid={user._id} onlineIndicator pic={pp} size='medium' />)
    } else {
      avatar = (<UserAvatar uid={user._id} offlineIndicator pic={pp} size='medium' />)
    }

    return avatar
  }


  render() {

    return (
      <div>
      <Paper>
        <Table className="leaderboard">
          <TableBody>
              
              <TableRow>
                <TableCell>
                  <h3>Rank</h3>
                </TableCell>
                <TableCell>
                  <h3>Username</h3>
                </TableCell>
                <TableCell>
                  <h3>Points</h3>
                </TableCell>
              </TableRow>
            {this.state.users.map((user,i) => (
              <TableRow key={i}>
                <TableCell>
                  {i+1}
                </TableCell>
                <TableCell>
                  {this.getAvatar(user)}
                  {user.username}
                </TableCell>
                <TableCell>
                  {user.points}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        </Paper>
      </div>
    );
  }
}

export default Leaderboard;
