import React, { Component } from "react";
import './Home.css';

import RivalRow from './RivalRow'
import ProfilePicture from './ProfilePicture'

import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';

import {getUserByName, addRival, updateStatus, clearRivals, getUserById, setOnline} from '../../backend/userAPI'

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import Alert from '@material-ui/lab/Alert';

import Paper from '@material-ui/core/Paper'
import RefreshIcon from '@material-ui/icons/Refresh';


// Anything involving Material UI in this file and related components 
// takes influence from their documentation and accompanying examples

class Home extends Component {
  constructor(props) {
    super(props)
    const {user} = this.props
    // this.searchRivals = this.searchRivals.bind(this)
    this.state = {
      rivals: [], 
      user: user, 
      fullRivals: [],
      rivalRows: [],
      successAlert: true,
    }
    setTimeout(() => {this.setState({ successAlert: false });}, 3000);
    this.searchRivals(null)
    console.log(this.props)
  }

  componentDidMount() {
    const user = this.state.user
    updateStatus(user._id, "On Home Page")
    setOnline(user._id)

    this.updateUser.bind(this)().then(this.initFullRivals.bind(this)().then(this.updateTempRivals.bind(this)()))
    document.title = 'Home - Big Fun';
  }

  // Modified from an Emma Goto tutorial - https://www.emgoto.com/react-search-bar/
  searchRivals = (e) => {
    const user = this.state.user;

    if (e === null || e.target.value === "") {
      console.log("Resetting to users full rival Ids");
      this.updateTempRivals.bind(this)()
    } else {
      let new_rivals = this.state.fullRivals;
      new_rivals = new_rivals.filter((rival) => {
          return rival.username.toLowerCase().includes(e.target.value.toLowerCase());
      });
      this.setState({rivals: new_rivals});
      this.createRivalTable.bind(this)(new_rivals)
    }
  }

  // Modified from a Masatoshi Nishiguchi Blog Post - https://blog.mnishiguchi.com/react-disable-submit-event-triggered-by-pressing-enter-key?  
  disableEnterKey(e) {
    if (e.which === 13) {
      e.preventDefault();
    }
  }

  async tryAddRival() {
    let rivalName = document.getElementById("RivalName").value

    const user = this.state.user
    let rivals = this.state.rivals

    try {
      let rival = await getUserByName(rivalName)
      if (rival.rivals.includes(user._id)) {
        alert("You're already Rivals with " + rivalName) //<Alert severity="error">{ "You're already Rivals with " + rivalName }</Alert>
      } else if (user.username === rivalName) {
        alert("You can't do that") //<Alert severity="error">{ "You can't do that, silly..." }</Alert>
      } else {
        
        addRival(user._id, rival._id).then(
          addRival(rival._id, user._id).then(
            this.updateUser.bind(this)().then(
              this.updateFullRivals.bind(this)(rival)
        )))
      }

      document.getElementById("RivalName").value = ""
    } catch {
      alert("Can't find that user") //<Alert severity="error">{ "You can't do that, silly..." }</Alert>
    }
  }

  async tryClearRivals() {
    const {user} = this.props
    clearRivals(user._id).then(this.updateUser.bind(this)())
  }


  async updateUser() {
    const user = this.state.user
    let updatedUser = await getUserById(user._id)
    this.setState({user: updatedUser})
    this.initFullRivals.bind(this)()
  }

  updateFullRivals(rival) {
    let rivals = this.state.fullRivals
    rivals.push(rival)
    this.setState({fullRivals: rivals})
  }

  async initFullRivals() {
    const rival_ids = this.state.user.rivals
    
    let rivals = []

    for (let i = 0; i < rival_ids.length; i++) {
      getUserById(rival_ids[i]).then(rival => {
        rivals.push(rival);
      })
    }

    this.setState({fullRivals: rivals, rivals: rivals})
  }

  updateTempRivals() {
    this.setState({rivals: this.state.fullRivals})
    console.log("Temp Rivals Now", this.state.rivals)
    // this.forceUpdate()
    this.createRivalTable.bind(this)(this.state.fullRivals)
  }

  createRivalTable = (rivals) => {
    // let rivals = this.state.rivals
    console.log("These are the rivals to create rows with", rivals)
    let rivalRows = []
    for (let i = 0; i < rivals.length; i++) {
      console.log("Key and rival", i, rivals[i])
      let row = this.createRivalRow(i, rivals[i])
      console.log("Row", rivals)
      rivalRows.push(row)
    }
    console.log("These are the created rival rows", rivalRows)
    this.setState({rivalRows: (<TableBody>{rivalRows}</TableBody>)})
  }

  createRivalRow = (key, user) => {
    console.log("the new row will have", key, "and", user)
    return(<RivalRow key={key} user={user}/>)
  }

  render() {
  	const user = this.state.user
    // this.searchRivals(null)
    // if (this.state.rivals === [] && document.getElementById("RivalName").value === "") {
    //   rivals = this.state.fullRivals.slice()
    // } else {
    //   rivals = this.state.rivals.slice()
    // }
    // console.log("In the render method:", rivals)
    // console.log("login success: " + this.props.successAlert)

    return (
      <div>
        {/* { this.props.successAlert && */}
        { this.state.successAlert &&
        <div>
          <Alert severity="success">Login successful</Alert>
          <p></p>
        </div>
        }
        <ProfilePicture user={user}/>
        <div id="RivalTable">
          <Paper id="RivalTableHeader">
            <div>
              <h1 id="RivalTableTitle">RIVALS</h1>
              <form id="RivalTableSearch">
                <Input id="RivalName" 
                    type="text" 
                    placeholder="Search Rivals..." 
                    title="Type in a Rival's Name" 
                    onChange={e => this.searchRivals(e)}
                    onKeyPress={this.disableEnterKey.bind(this)}
                  />
              </form>
              <Button onClick={this.tryAddRival.bind(this)}>
                Add Rival
              </Button>
              <Button onClick={this.tryClearRivals.bind(this)}>
                Clear All Rivals
              </Button>
              <IconButton aria-label="refresh" onClick={this.updateUser.bind(this)}>
                <RefreshIcon />
              </IconButton>
            </div>
          </Paper>
          <Paper>
            <Table aria-label="simple table">
              {this.state.rivalRows}
            </Table>
          </Paper>
        </div>  
      </div>
    )
  }

}



export default Home;
