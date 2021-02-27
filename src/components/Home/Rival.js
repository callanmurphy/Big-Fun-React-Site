import React, { Component } from "react";
import './Home.css';

class Rival extends Component {

  render() {
    const {username, status} = this.props
    let statusClass = ""

    if (status === "Offline") {
        statusClass = ("status red")
      } else {
        statusClass = ("status green")
      } 

    return (
      <li class="rival">
          <div class={statusClass}></div>
          <div class="rivalInfo">
           {username} - {status}
          </div>
      </li>
    )
  }


}



export default Rival;
