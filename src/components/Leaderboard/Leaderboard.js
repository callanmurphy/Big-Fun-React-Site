import React, { Component } from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";

class Leaderboard extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      users: [
        { uName: "MArio", points: 309 },
        { uName: "LUigi", points: 108 }
      ]
    }
}


  render() {
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
                  {user.uName}
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
