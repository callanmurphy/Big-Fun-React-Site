import React, { Component } from "react";
import { Table, TableBody, TableCell, TableRow, Avatar } from '@material-ui/core';
import { profilePictures } from "../Home"

import "./Leaderboard.css"

class Leaderboard extends Component {
  
  constructor(props) {
    super(props);
    
    this.state = {
      users: [
        { uName: "Squidward", points: 369 , profilePic: 2},
        { uName: "MArio", points: 309, profilePic: 0 },
        { uName: "LUigi", points: 108 , profilePic: 1},
      ]
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
              <TableRow>
                <TableCell>
                  {i+1}
                </TableCell>
                <TableCell>
                  <Avatar alt="" src={profilePictures[user.profilePic].src}/>
                  <h4>{user.uName}</h4>
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
