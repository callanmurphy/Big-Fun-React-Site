import React, { Component } from "react";
import { Table, TableBody, TableCell, TableRow, Avatar, Paper } from '@material-ui/core';
import { profilePictures } from "../Home"
import { getUser } from "../../backend"
import "./Leaderboard.css"

class Leaderboard extends Component {
  
  constructor(props) {
    super(props);
    const users = []
    for (let id = 0; id < 5; id++) {
      users.push(getUser(id))
    }
    users.sort((a, b) => (a.points < b.points) ? 1 : -1)
    this.state = {
      users: users
    }
  }

  componentDidMount() {
    document.title = 'Leaderboard - Big Fun';
  }


  render() {
    console.log(profilePictures)
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
                  {user.name}
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
