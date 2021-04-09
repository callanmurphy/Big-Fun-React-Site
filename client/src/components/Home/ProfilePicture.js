import React, { Component } from "react";
import './Home.css';
import Avatar from '@material-ui/core/Avatar';
import { profilePictures } from './';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import Button from '@material-ui/core/Button';
import {updatePic} from '../../backend/userAPI'

class ProfilePicture extends Component {
  constructor(props) {
    super(props)

    
    const {user} = this.props
    this.state = {
      showProfilePics: false,
      profilePictures: profilePictures,
      currentProfilePicture: profilePictures[user.profilePic],
      buttonText: "Change Picture"
    }
  }

  UpdatePicStuff() {
    this.setState({
      showProfilePics: !this.state.showProfilePics,
    })

    !this.state.showProfilePics ? this.setState({buttonText: "Confirm"}) : this.setState({buttonText: "Change Picture"})
  }
  

  render() {
    const {user} = this.props
    return (
      <div id="ProfileInfo">
        <h1 id="Username">
          {user.username}
        </h1>
            <Avatar id="ProfilePicture" src={this.state.currentProfilePicture.src} alt={this.state.currentProfilePicture.name} />
            <Button id="ChangeButton" onClick={this.UpdatePicStuff.bind(this)}>{this.state.buttonText}</Button>
          {
            this.state.showProfilePics ?
                  <GridList className="PictureChoices" cols={3}>
                    {(this.state.profilePictures.map((pic, i) => (
                     
                      <GridListTile key={i} cols={1}>
                        <img className="PictureChoicesImage" src={pic.src} alt={pic.name} onClick={ () => {this.setState({currentProfilePicture: pic}); updatePic(user._id, i); }} />
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
