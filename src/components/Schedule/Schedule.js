import { Table, TableBody, TableRow, TableCell, Button } from "@material-ui/core";
import { uid } from "react-uid";
import React, { Component } from "react";
import RivalForm  from "./rivalForm";

import { getUser } from "../../backend";

import "./Schedule.css";

class Schedule extends Component {

  constructor(props) {
    super(props);
    const date = new Date()
    const y = date.getFullYear()
    const m = date.getMonth()
    const d = date.getDate()
    const h = date.getHours()
    const min = date.getMinutes()
    const dateString = `${y}-${m < 10 ? 0 : ""}${m}-${d < 10 ? 0 : ""}${d}T${h < 10 ? 0 : ""}${date.getHours()}:${min < 10 ? 0 : ""}${date.getMinutes()}`
    
    this.state = {
      currUser: getUser(0),
      rivalName: getUser(getUser(0).rivals[0]).name,
      scheduleDate: dateString,
      scheduled: [
        { rname: "James", date: "2017-05-24T15:30" },
        { rname: "Kate", date: "2017-05-24T16:30" }
      ]
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.scheduleGame = this.scheduleGame.bind(this);
    this.cancelGame = this.cancelGame.bind(this);
  }

  scheduleGame() {
    const scheduled = this.state.scheduled;
    const game = {
      rname: this.state.rivalName, 
      date: this.state.scheduleDate
    };

    // insertion into sorted list
    if (scheduled.length === 0) {
      scheduled.push(game);
    }
    else {
      let i = 0;
      let j = scheduled.length - 1;
      const date = new Date(this.state.scheduleDate);
      while (i !== j) {
        let m = parseInt((i+j) / 2);
        if (date < new Date(scheduled[m].date)) {
          j = m
        }
        else {
          i = m+1
        }
      }
      if (date > new Date(scheduled[i].date)) {
        scheduled.splice(i+1, 0, game)
      }
      else {
        scheduled.splice(i, 0, game)
      }
      

    }
    this.setState({scheduled: scheduled});
  }

  cancelGame(i) {
    const scheduled = this.state.scheduled;
    scheduled.splice(i, 1);
    this.setState({scheduled: scheduled})
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value // [name] sets the object property name to the value of the `name` variable.
    });
  };

  
  
  render() {
    return (
    <div>
      <div className="rivalForm">
        <RivalForm 
          currUser={this.state.currUser}
          rivalName={this.state.rivalName} 
          scheduleDate={this.state.scheduleDate}
          handleChange={this.handleInputChange}
          scheduleGame={this.scheduleGame}
        ></RivalForm>
      </div>
      


      <Table className="schedule">
        <TableBody>
          <TableRow>
            <TableCell>
              Rival 
            </TableCell>
            <TableCell>
              Time 
            </TableCell>
          </TableRow>

          {this.state.scheduled.map((item, i) => {
            const date = new Date(item.date)
              return (
                <TableRow key={uid(item)} >
                  <TableCell>
                    {item.rname} 
                  </TableCell>
                  <TableCell>
                    {date.toString()} 
                  </TableCell>
                  <TableCell>
                    <Button onClick={(i) => this.cancelGame(i)}>Cancel Game</Button>
                  </TableCell>
                </TableRow>
              )
            })}

        </TableBody>
      </Table>
    </div>
    );
  }
}

export default Schedule;
