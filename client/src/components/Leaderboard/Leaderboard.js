import React, { Component } from "react";
import { Table, TableBody, TableCell, TableRow, Avatar, Paper } from '@material-ui/core';
import { profilePictures } from "../Home"
import { getAllUsers } from "../../backend"
import "./Leaderboard.css"

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
    users.sort((a, b) => (a.points < b.points) ? 1 : -1)
    this.setState(users)
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
                  <Avatar alt="" src={profilePictures[user.profilePic].src}/>
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
