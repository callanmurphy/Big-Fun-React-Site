import React, { Component } from "react";
import './Home.css';

import GreedyFish from './ProfilePictures/GreedyFish.png'
import CoolPenguin from './ProfilePictures/CoolPenguin.png'



class ProfilePicture extends Component {
  constructor(props) {
    super(props)

    this.state = {
    showProfilePics: false,
      profilePictures: [
        {'name': 'GreedyFish', 'src': GreedyFish},
        {'name': 'CoolPenguin', 'src': CoolPenguin}
      ],
      currentProfilePicture: {'name': 'GreedyFish', 'src': GreedyFish},
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
        <img id="profilePicture" src={this.state.currentProfilePicture.src} alt="ProfilePicture" />
        <button id="ChangePicture" onClick={this.UpdatePic.bind(this)}>{this.state.buttonText}</button>
      </div>
      {
        this.state.showProfilePics ?
              <div id="profilePictures">
                <img class="miniProfilePictures" src={this.state.profilePictures[0].src} alt={this.state.profilePictures[0].name} onClick={ () => this.state.currentProfilePicture = this.state.profilePictures[0]} />
                <img class="miniProfilePictures" src={this.state.profilePictures[1].src} alt={this.state.profilePictures[1].name} onClick={ () => this.state.currentProfilePicture = this.state.profilePictures[1]} />
              </div>
        : null
      }

      </div>
    )
  }
}



export default ProfilePicture;
