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

  }

  render() {
    return <div><h1>{this.state.time}</h1></div>;
  }
}

export default TypeType;