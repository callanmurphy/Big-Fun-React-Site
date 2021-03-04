import React, { Component } from "react";
import './Home.css';
import UserAvatar from '../UserAvatar';
import { profilePictures } from './';

import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';

class RivalRow extends Component {

  render() {
    const {user, i} = this.props
    let avatar = null
    if (user.online) {
      avatar = (<UserAvatar uid={user.id} onlineIndicator pic={profilePictures[user.profilePic]} size='medium' />)
    } else {
      avatar = (<UserAvatar uid={user.id} offlineIndicator pic={profilePictures[user.profilePic]} size='medium' />)
    }
    return (
      <TableRow key={i}>
        <TableCell className="RivalPicture">
          {avatar}
        </TableCell>
        <TableCell>
          <h2>{user.name}</h2>
        </TableCell>
        <TableCell>
          <h2>{user.status}</h2>
        </TableCell>
      </TableRow>
    )
  }
}



export default RivalRow;
