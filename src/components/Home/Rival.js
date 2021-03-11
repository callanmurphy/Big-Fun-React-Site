import React, { Component } from "react";
import './Home.css';
import UserAvatar from '../UserAvatar';
import { profilePictures } from './';

class Rival extends Component {

  render() {
    const {user} = this.props

    if (user.online) {
      return (
        <li className="rival">
            <div className="rivalPic">
               <UserAvatar uid={user.id} onlineIndicator pic={profilePictures[user.profilePic]} size='small' />
            </div>
            <div className="rivalInfo">
             {user.name} - {user.status}
            </div>
        </li>
      )
    } else {
      return (
        <li className="rival">
            <div className="rivalPic">
               <UserAvatar uid={user.id} offlineIndicator pic={profilePictures[user.profilePic]} size='small' />
            </div>
            <div className="rivalInfo">
             {user.name} - {user.status}
            </div>
        </li>
      )
    }
  }


}



export default Rival;
