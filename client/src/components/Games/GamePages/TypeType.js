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

    // this.dims = {
    //   height: null,
    //   width: null,
    // }

  }

  updateTime(diff) {
    if (this.state.life - diff < 0) {
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
      console.log("UPDATE");
      console.log(this.state.time);
    }
  }

  animate() {
    if (!this.doAnimation) {
      return;
    }
    const diff = curr - this.stats.lastTime;
    const curr = new Date();

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
  }

  componentDidMount() {
    this.doAnimation = true;
    this.updateSize = () => this.forceUpdate();
    window.addEventListener('resize', this.updateSize);

    this.updateSize();

    window.requestAnimationFrame(() => this.animate())
  }

  componentDidUpdate() {
    console.log("componentDidUpdate")
  }

  componentWillUnmount() {
    this.doAnimation = false;
    window.removeEventListener('resize', this.updateSize);
  }

  render() {
    return (
    <div>
      <div>
        <h1>Type the keys</h1>
        <p>{ Math.round(this.state.life * 100) / 100 }</p>
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
