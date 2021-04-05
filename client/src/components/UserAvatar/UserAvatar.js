import React, { Component } from "react";
import { Avatar, Badge } from '@material-ui/core';
import { profilePictures } from '../Home'
import './UserAvatar.css'

class UserAvatar extends Component {
  constructor(props) {
    super(props)

    this.state = {
      profilepic: profilePictures[0],
      username: 'username',
      class: 'mediumPic',
      online: true,
    }

    if (this.props.pic) {
      this.state.profilepic = this.props.pic;
    }
    if (this.props.size) {
      this.state.class = {
        'small': 'smallPic',
        'medium': 'mediumPic',
      }[this.props.size]
    }
  }

  get online() {
    return (this.state.online || this.props.onlineIndicator)
          && !this.props.offlineIndicator;
  }

  render() {
    let component = (
      <Avatar
        alt={this.state.username}
        src={this.state.profilepic.src}
        className={this.state.class}
      />
    )
    if (this.props.onlineIndicator || this.props.offlineIndicator) {
      return (
        <div className='userAvatar'>
          <Badge
            overlap="circle"
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right',
            }}
            variant="dot"
            classes={{
              badge: this.online ? 'online' : 'offline'
            }}
            badgeContent=' '
          >
            { component }
          </Badge>
        </div>
      )
    } else {
      return (
        <div className='userAvatar'>
          {component}
        </div>
      )
    }
  }
}

export default UserAvatar;
