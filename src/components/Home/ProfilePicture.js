import React, { Component } from "react";
import './Home.css';
import Avatar from '@material-ui/core/Avatar';
import { profilePictures } from './';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import { Button, Menu, MenuItem } from '@material-ui/core';



class ProfilePicture extends Component {
  constructor(props) {
    super(props)

    

    // console.log(profilePictures)
    this.state = {
    showProfilePics: false,
      profilePictures: profilePictures,
      currentProfilePicture: profilePictures[0],
      buttonText: "Change Picture"
    }
  }

  UpdatePic() {
    this.setState({
      showProfilePics: !this.state.showProfilePics,
    })

    !this.state.showProfilePics ? this.setState({buttonText: "Confirm"}) : this.setState({buttonText: "Change Picture"})
    // console.log(this.state.showProfilePics)
  }
  

  render() {
    return (
      <div id="profilePictureContainer">

      <div>
        <Avatar id="profilePicture" src={this.state.currentProfilePicture.src} alt="ProfilePicture" />
        <Button id="ChangePicture" onClick={this.UpdatePic.bind(this)}>{this.state.buttonText}</Button>
      </div>
      {
        this.state.showProfilePics ?
              // <div id="profilePictures">
              //   <Avatar class="miniProfilePictures" src={this.state.profilePictures[0].src} alt={this.state.profilePictures[0].name} onClick={ () => this.state.currentProfilePicture = this.state.profilePictures[0]} />
              //   <Avatar class="miniProfilePictures" src={this.state.profilePictures[1].src} alt={this.state.profilePictures[1].name} onClick={ () => this.state.currentProfilePicture = this.state.profilePictures[1]} />
              // </div>
              <GridList cellHeight={160} className="gridlist" cols={3}>
                {(this.state.profilePictures.map((pic) => (
                  <GridListTile key={pic.name} cols={1}>
                    <img src={pic.src} alt={pic.name} onClick={ () => this.state.currentProfilePicture = pic} />
                  </GridListTile>
                )))}

              </GridList>
        : null
      }


      </div>
    )
  }
}



export default ProfilePicture;
