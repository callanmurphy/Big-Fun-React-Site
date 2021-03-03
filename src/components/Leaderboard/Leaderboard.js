import React, { Component } from "react";
import { Table, TableBody, TableCell, TableRow, Avatar } from '@material-ui/core';
import { profilePictures } from "../Home"
import { getUser } from "../../backend"
import "./Leaderboard.css"

class Leaderboard extends Component {
  
  constructor(props) {
    super(props);
    const users = []
    for (let id = 0; id < 4; id++) {
      users.push(getUser(id))
    }
    this.state = {
      users: users
    }
  }


  render() {
    console.log(profilePictures)
    return (
      <div>
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
                  <h4>{user.name}</h4>
                </TableCell>
                <TableCell>
                  {user.points}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    );
  }
}

export default Leaderboard;
