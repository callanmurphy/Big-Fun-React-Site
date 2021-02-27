import React, { Component } from "react";
import './Home.css';

import Rival from './Rival' 
import RivalHeader from './RivalHeader'
import ProfilePicture from './ProfilePicture'


class Home extends Component {
  constructor(props) {
    super(props)

    this.state = {
      rivals: [
        {'username': 'Dave' , 'status': 'Game 1'},
        {'username': 'Jonas', 'status': 'Offline'},
        {'username': 'Corey', 'status': 'Offline'},
        {'username': 'BigBoss', 'status': 'Offline'},
        {'username': 'BAdmin', 'status': 'Idle'}
      ],
      allRivals: [
        {'username': 'Dave' , 'status': 'Game 1'},
        {'username': 'Jonas', 'status': 'Offline'},
        {'username': 'Corey', 'status': 'Offline'},
        {'username': 'BigBoss', 'status': 'Offline'},
        {'username': 'BAdmin', 'status': 'Idle'}
      ]
    }
  }

  searchRivals(e) {
    if (e.target.value === "") {
      this.setState({rivals: this.state.allRivals})
    } else {
      let newRivals = this.state.allRivals
      newRivals = newRivals.filter((rival) => {
        return rival.username.toLowerCase().includes(e.target.value.toLowerCase());
      })
      this.setState({rivals: newRivals})
    }
  }

  render() {
  	const {username} = this.props
    const rivals = this.state.rivals.map((rival) =>
      <Rival
        username={rival.username}
        status={rival.status}
      />
    )
    return (
      <div>
        <ProfilePicture />
      <div id="UserInfo">
        <h1 id="Username">{username}</h1>
        <ul class="rivals">
          <li class="rivalsHeader">
                <h2 id="rivalsTitle">RIVALS</h2>
                <form id="rivalSearch">
                <input type="text" placeholder="Search Rivals..." title="Type in a Rival's Name" onChange={this.searchRivals.bind(this)} />
                </form>
          </li>
          {rivals}
        </ul>
      </div>
      </div>
    )
  }

}



export default Home;
