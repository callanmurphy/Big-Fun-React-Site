import React, { Component } from "react";
import './Home.css';

import RivalRow from './RivalRow'
import ProfilePicture from './ProfilePicture'

import Input from '@material-ui/core/Input';
import {getUser} from '../../backend/userAPI'

import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';

import Paper from '@material-ui/core/Paper'

class Home extends Component {
  constructor(props) {
    super(props)
    const {user} = this.props
    this.state = {rivals: user.rivals}
  }

  componentDidMount() {
    document.title = 'Home - Big Fun';
  }

  searchRivals(e) {
    const {user} = this.props
    if (e.target.value === "") {
      this.setState({rivals: user.rivals})
    } else {
      let newRivals = user.rivals
      newRivals = newRivals.filter((rival) => {
        return getUser(rival).name.toLowerCase().includes(e.target.value.toLowerCase());
      })
      this.setState({rivals: newRivals})
    }
  }

  render() {
  	const {user} = this.props
    return (
      <div>
        <ProfilePicture user={user}/>
        <div id="RivalTable">
          <Paper id="RivalTableHeader">
            <div>
              <h1 id="RivalTableTitle">RIVALS</h1>
              <form id="RivalTableSearch">
                <Input type="text" placeholder="Search Rivals..." title="Type in a Rival's Name" onChange={this.searchRivals.bind(this)} />
              </form>
            </div>
          </Paper>
          <Paper>
            <Table aria-label="simple table">
              <TableBody>
                {this.state.rivals.map((rival, i) => (
                  <RivalRow
                    key={i}
                    user={getUser(rival)}
                  />
                ))}
              </TableBody>
            </Table>
          </Paper>
        </div>  
      </div>
    )
  }

}



export default Home;
