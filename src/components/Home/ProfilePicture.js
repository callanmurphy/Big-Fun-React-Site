import React, { Component } from "react";
import './Home.css';
import Avatar from '@material-ui/core/Avatar';
import { profilePictures } from './';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import Button from '@material-ui/core/Button';


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

  UpdatePic() {
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
          {user.name}
        </h1>
            <Avatar id="ProfilePicture" src={this.state.currentProfilePicture.src} alt="ProfilePicture" />
            <Button id="ChangeButton" onClick={this.UpdatePic.bind(this)}>{this.state.buttonText}</Button>
          {
            this.state.showProfilePics ?
                  <GridList className="PictureChoices" cols={3}>
                    {(this.state.profilePictures.map((pic, i) => (
                      <GridListTile key={i} cols={1}>
                        <img src={pic.src} alt={pic.name} onClick={ () => this.setState({currentProfilePicture: pic}) } />
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
