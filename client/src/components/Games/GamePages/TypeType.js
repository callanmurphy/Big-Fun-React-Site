import React, { Component } from "react";

class TypeType extends Component {
  constructor(props) {
    super(props);
    this.containerRef = React.createRef();
    this.ballRef = React.createRef();

    this.state = {
      score: 0,
      time: new Date(),
    }

    this.doAnimation = true;

    this.stats = {
      lastTime: new Date(),
    }

  }

  updateTime(diff) {
    if (this.state.life - diff < 0) {
      this.setState({
        score: this.state.score + diff,
        time: 0,
      });
      this.gameOver();
    } else {
      this.setState({
        score: this.state.score,
        time: this.state.time - diff,
      });
    }
  }

  animate() {
    if (!this.doAnimation) {
      return;
    }
    const diff = curr - this.stats.lastTime;
    const curr = new Date();

    this.stats = {
      lastTime: curr,
    }
  }

  gameOver() {
    this.doAnimation = false;
  }

  render() {
    return (
    <div>
      <div>
        <h1>Type the keys</h1>
      </div>
      <div 
        className='gamePlayContainer'
        ref={this.containerRef}
      >
      </div>
    </div>
    
    );
  }
}

export default TypeType;