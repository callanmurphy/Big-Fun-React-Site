import React, { Component } from "react";
import './Home.css';


class RivalHeader extends Component {

  render() {
    // const {status} = this.props
    // // let statusClass = ""

    // if (status === "Offline") {
    //     statusClass = ("status red")
    //   } else {
    //     statusClass = ("status green")
    //   } 

    return (
      <li class="rivalsHeader">
            <h2 id="rivalsTitle">RIVALS</h2>
            <input type="text" id="rivalSearch" placeholder="Search Rivals..." title="Type in a Rival's Name"></input>
          </li>
    )
  }


}



export default RivalHeader;
