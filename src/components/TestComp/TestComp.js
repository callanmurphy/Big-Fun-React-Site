import React, { Component } from "react";
import { Button, Menu, MenuItem } from '@material-ui/core';
import UserAvatar from '../UserAvatar';
import { profilePictures } from '../Home';


class TestComp extends Component {

  render() {
    return (
      <div>
        <UserAvatar uid={123} offlineIndicator />
        <UserAvatar uid={123} onlineIndicator pic={profilePictures[1]} size='small' />
        <UserAvatar uid={123}  pic={profilePictures[2]} />
      </div>
    )
  }
}

export default TestComp;


class TestDropDown extends Component {
  constructor(props) {
    super(props)

    this.ref = React.createRef();
    this.state = {
      open: false
    }
  }

  handleClose() {
    this.setState({
      open: false
    })
  }

  handleClick() {
    this.setState({
      open: true
    })
  }

  render() {
    let handleClose = () => this.handleClose();
    return (
      <div>
        <Button ref={this.ref} onClick={() => this.handleClick()}>
          Open Menu
        </Button>
        <Menu
          id="simple-menu"
          anchorEl={this.ref.current}
          keepMounted
          open={this.state.open}
          onClose={handleClose}
        >
          <MenuItem onClick={handleClose}>Profile</MenuItem>
          <MenuItem onClick={handleClose}>My account</MenuItem>
          <MenuItem onClick={handleClose}>Logout</MenuItem>
        </Menu>
      </div>
    );
  }
}