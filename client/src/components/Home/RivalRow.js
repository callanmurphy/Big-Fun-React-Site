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

    let pp = null

    if (user.profilePic === -1) {
      pp = {src: user.customProfilePic, name: "Custom"}
    } else {
      pp = profilePictures[user.profilePic]
    }

    if (user.online) {
      avatar = (<UserAvatar uid={user._id} onlineIndicator pic={pp} size='medium' />)
    } else {
      avatar = (<UserAvatar uid={user._id} offlineIndicator pic={pp} size='medium' />)
    }
    this.state = {user: user, avatar: avatar, i:i}
  }

  render() {
    const user = this.state.user
    const avatar = this.state.avatar
    const i = this.state.i

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
