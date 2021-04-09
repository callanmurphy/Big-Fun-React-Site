import React, { Component } from "react";

class TypeType extends Component {
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
  }
  
  render() {
    return <div><h1>COMING SOON !!!!!!!!</h1></div>;
  }
}

export default TypeType;