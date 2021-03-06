import React, { Component } from "react";

class TypeType extends Component {
  constructor(props) {
    super(props);
    this.containerRef = React.createRef();

    this.state = {
      score: 0,
      time: 60,
    }

    this.doAnimation = true;

    this.stats = {
      lastTime: new Date(),
    }

  }

  updateTime(diff) {
    if (this.state.time - diff < 0) {
      this.setState({
        score: this.state.score,
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
    const curr = new Date();
    const diff = curr - this.stats.lastTime;

    this.updateTime(diff / 1000);
    if (this.doAnimation) {
      window.requestAnimationFrame(() => this.animate())
    }

    this.stats = {
      lastTime: curr,
    }
  }

  gameOver() {
    this.doAnimation = false;
    console.log("GAME OVER");
  }

  componentDidMount() {
    this.doAnimation = true;
    this.updateSize = () => this.forceUpdate();
    window.addEventListener('resize', this.updateSize);

    this.updateSize();

    window.requestAnimationFrame(() => this.animate())
  }

  handleKeyPress(e)  {
    if(e.key === 'Enter'){
      console.log('enter press here!')
    }
  }

  componentDidUpdate() {
    
  }

  componentWillUnmount() {
    this.doAnimation = false;
    window.removeEventListener('resize', this.updateSize);
  }

  render() {
    return (
    <div className='gamePlayContainer'>
      <div className='scoreBox'>
        <h1>Type the keys</h1>
        <p>{ Math.round(this.state.time * 100) / 100 }</p>
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