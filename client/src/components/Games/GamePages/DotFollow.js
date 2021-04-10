import { Divider, Paper, Typography } from "@material-ui/core";
import React, { Component } from "react";
import { recordGame } from "../../../backend";
import './GamePages.css';


class DotFollow extends Component {
  constructor(props) {
      super(props);
      this.containerRef = React.createRef();
      this.ballRef = React.createRef();

      this.state = {
        score: 0,
        life: 10,
      }

      this.dims = {
        height: null,
        width: null,
      }

      this.game = {
        minRadius: 24,
        maxRadius: 70,
      }

      this.ball = {
        rad: 24,
        x: 0,
        y: 0,
        direction: [1, 1],
        speed: 0.2,
        lastTime: new Date(),
        radiusSpeed: 0.01,
      }
      this.doAnimation = false;
      this.keepScore = false;
  }

  updateScore(diff) {
    if (this.keepScore) {
      this.setState({
        score: this.state.score + diff,
        // life: this.state.life + diff
      });
    } else if (this.state.life - diff > 0) {
      this.setState({
        score: this.state.score,
        life: this.state.life - diff,
      });
    } else {
      this.setState({
        score: this.state.score,
        life: 0,
      });
      this.gameOver();
    }
  }

  gameOver() {
    this.doAnimation = false;
    recordGame({
      name: 'Follow the dot',
      user1: this.props.user.username,
      user2: null,
      score: this.state.score,
    });
  }

  animate() {
    if (!this.doAnimation) {
      return;
    }
    const curr = new Date();
    const diff = curr - this.ball.lastTime;
    let newDirection = this.ball.direction.map(e => e);
    let newX = this.ball.x + diff * this.ball.speed * newDirection[0];
    let newRad =  this.ball.rad + diff * this.ball.radiusSpeed;
    let newRadiusSpeed = this.ball.radiusSpeed;


    if (newRad < this.game.minRadius) {
      newRadiusSpeed = 0.1;
      newRad = this.game.minRadius;
    } else if (newRad > this.game.maxRadius) {
      newRadiusSpeed = -0.1;
      newRad = this.game.maxRadius;
    } else {
      newRadiusSpeed *= 1.01;
    }
    if (newX < 0 || newX > this.dims.width - newRad*2) {
      newDirection[0] = newDirection[0] * -1;
      if (newX < 0) {newX = 0;}
      else {newX = this.dims.width - newRad*2;}
    }
    let newY = this.ball.y + diff * this.ball.speed * newDirection[1];
    if (newY < 0 || newY > this.dims.height - newRad*2) {
      newDirection[1] = -1 * newDirection[1];
      if (newY < 0) {newY = 0;}
      else {newY = this.dims.height - newRad*2;}
    }

    this.ball = {
      rad: newRad,
      radiusSpeed: newRadiusSpeed,
      x: newX,
      y: newY,
      direction: newDirection,
      speed: this.ball.speed,
      lastTime: curr,
    }
    this.updateBall();
    this.updateScore(diff / 1000);
    if (this.doAnimation) {
      window.requestAnimationFrame(() => this.animate())
    }
  }

  updateBall() {
    this.ballRef.current.style.top = `${Math.round(this.ball.y)}px`;
    this.ballRef.current.style.left = `${Math.round(this.ball.x)}px`;
    this.ballRef.current.style.width = `${Math.round(2*this.ball.rad)}px`;
    this.ballRef.current.style.height = `${Math.round(2*this.ball.rad)}px`;
  }

  componentDidMount() {
    this.doAnimation = true;
    this.updateSize = () => this.forceUpdate();
    window.addEventListener('resize', this.updateSize);

    this.updateSize();
    updateStatus(user._id, "On Home Page")
    window.requestAnimationFrame(() => this.animate())
  }

  componentDidUpdate() {
    this.dims.height = window.innerHeight - this.containerRef.current.offsetTop;
    this.dims.width = this.containerRef.current.clientWidth;

    // this.ball.x = this.dims.width / 2;
    // this.ball.y = this.dims.height / 2;
    // this.ball.rad = 24;
    this.updateBall();
    
    this.containerRef.current.style.height = `${this.dims.height}px`;
  }

  componentWillUnmount() {
    this.doAnimation = false;
    window.removeEventListener('resize', this.updateSize);
  }

  render() {
    return (
      <div
        className='gamePlayContainer'
        ref={this.containerRef}
      >
        <div
          className='dotFollowDot'
          ref={this.ballRef}
          onMouseEnter={() => this.keepScore = true}
          onMouseLeave={() => this.keepScore = false}
        >
        </div>
        <Paper className='ballTrackerScore'>
          <Typography variant='h1' className='ballTrackerGood'>
            { Math.round(this.state.score * 100) / 100 }
          </Typography>
          <Divider />
          <Typography variant='h1' className='ballTrackerBad'>
            { Math.round(this.state.life * 100) / 100 }
          </Typography>
        </Paper>
      </div>
    );
  }
}

export default DotFollow;