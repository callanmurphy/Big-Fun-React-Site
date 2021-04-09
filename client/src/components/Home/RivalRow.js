import React, { Component } from "react";
import './Home.css';
import UserAvatar from '../UserAvatar';
import { profilePictures } from './';

import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';

class RivalRow extends Component {
  constructor(props) {
    super(props)
    const {user, i} = this.props
    let avatar = null
    if (user.online) {
      avatar = (<UserAvatar uid={user._id} onlineIndicator pic={profilePictures[user.profilePic]} size='medium' />)
    } else {
      avatar = (<UserAvatar uid={user._id} offlineIndicator pic={profilePictures[user.profilePic]} size='medium' />)
    }
    this.state = {user: user, avatar: avatar, i:i}
    console.log("Rival Row", this.props)
  }

  render() {
    const user = this.state.user
    const avatar = this.state.avatar
    const i = this.state.i

    console.log("these are the rival row props", this.props)

    return (
      <TableRow key={i}>
        <TableCell className="RivalPicture">
          {avatar}
        </TableCell>
        <TableCell>
          <h2>{user.username}</h2>
        </TableCell>
        <TableCell>
          <h2>{user.status}</h2>
        </TableCell>
      </TableRow>
    )
  }
}



export default RivalRow;
