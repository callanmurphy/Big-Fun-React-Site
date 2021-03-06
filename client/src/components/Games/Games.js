import React, { Component } from "react";
import { Link } from 'react-router-dom';
import { Card, CardActionArea, CardContent, CardMedia, Typography, Grid } from '@material-ui/core';
import { gamelinks } from './gameData';
import {updateStatus} from '../../backend/userAPI'
import './Games.css';

class Games extends Component {
  constructor(props) {
    super(props);

    this.state = {
      active: gamelinks.map(() => false)
    }
  }

  componentDidMount() {
    document.title = 'Games - Big Fun';
    const {user} = this.props
    updateStatus(user._id, "Playing Games")
  }

  render() {
    return (
      <Grid container spacing={3} alignItems='stretch' className='gameContainer'>
        {gamelinks.map((g, i) => (
          <Grid item xs={4} key={i}>
            <Card
              onMouseEnter={() => this.setState({
                active: gamelinks.map((g, i_) => i === i_)
              })}
              onMouseLeave={() => this.setState({active: gamelinks.map(() => false)})}
            >
              <Link to={g.path} className='gameLink'>
                <CardActionArea>
                  <CardMedia
                    image={g.img}
                    title={g.title}
                    className='gameCardImage'
                  />
                  {g.title === 'Type the keys' &&
                  <div className='comingSoonOverlay'>
                    <div className='comingSoonText'>Coming Soon!</div>
                  </div>
                  }
                  {g.title === 'Pong' &&
                  <div className='comingSoonOverlay'>
                    <div className='comingSoonText'>Coming Soon!</div>
                  </div>
                  }
                  <CardContent>
                    <Typography
                      // gutterBottom
                      variant='h5'
                    >
                      { g.title }
                    </Typography>
                    <Typography variant='subtitle1'>{g.description}</Typography>
                  </CardContent>
                </CardActionArea>
              </Link>
            </Card>
          </Grid>
        ))}
      </Grid>
      // <Container>
      //   {
      //     this.props.gamelinks.map(g => (
      //       <Link key={g.title} to={g.path}>
      //         <h1>
      //           {g.title}
      //         </h1>
      //       </Link>
      //     ))
      //   }
      // </Container>
    )
  }
}

export default Games;
export { gamelinks };