import React, { Component } from "react";
import './Home.css';
import Avatar from '@material-ui/core/Avatar';
import { profilePictures } from './';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import Button from '@material-ui/core/Button';
import {updatePic, setCustomPic} from '../../backend/userAPI'
import Input from '@material-ui/core/Input';

class ProfilePicture extends Component {
  constructor(props) {
    super(props)

    
    const {user} = this.props
    let pp = null

    if (user.profilePic === -1) {
      pp = {currentProfilePicture: {src: user.customProfilePic, name: "Custom"}}
    } else {
      pp = profilePictures[user.profilePic]
    }

    this.state = {
      showProfilePics: false,
      profilePictures: profilePictures,
      currentProfilePicture: pp,
      buttonText: "Change Picture"
    }
    console.log(this.state)
  }

  UpdatePicStuff() {
    this.setState({
      showProfilePics: !this.state.showProfilePics,
    })

    !this.state.showProfilePics ? this.setState({buttonText: "Confirm"}) : this.setState({buttonText: "Change Picture"})
  }
  
  disableEnterKey(e) {
    const {user} = this.props
    if (e.which === 13) {
      e.preventDefault();
      let url = document.getElementById("Custom").value
      this.setState({currentProfilePicture: {src: url, name: "Custom"}})
      setCustomPic(user._id, url)
    }
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
            <div>
                  <Input id="Custom" onKeyPress={this.disableEnterKey.bind(this)}/>
                  <GridList className="PictureChoices" cols={3}>
                    {(this.state.profilePictures.map((pic, i) => (
                     
                      <GridListTile key={i} cols={1}>
                        <img className="PictureChoicesImage" src={pic.src} alt={pic.name} onClick={ () => {this.setState({currentProfilePicture: pic}); updatePic(user._id, i); }} />
                      </GridListTile>
                    )))}

                  </GridList>
              </div>    
            : null
          }
      </div>
    )
  }
}



export default ProfilePicture;
