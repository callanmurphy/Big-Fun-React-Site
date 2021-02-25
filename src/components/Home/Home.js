import React, { Component } from "react";
import './Home.css';

import Rival from './Rival' 

class Home extends Component {
  constructor(props) {
    super(props)

    this.state = {
      rivals: [
        {'username': 'Dave' , 'status': 'Game 1'},
        {'username': 'Jonas', 'status': 'Offline'}
      ],
      allRivals: [
        {'username': 'Dave' , 'status': 'Game 1'},
        {'username': 'Jonas', 'status': 'Offline'}
      ]
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
        {username}
        <ul class="rivals">
          <li class="rivalsHeader">
            <h2 id="rivalsTitle">RIVALS</h2>
            <input type="text" id="rivalSearch" placeholder="Search Rivals..." title="Type in a Rival's Name"></input>
          </li>
          {rivals}
        </ul>
      </div>
    )
  }
}



export default Home;
