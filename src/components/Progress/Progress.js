import React, { Component } from "react";
import LineChart from "../LineChart/lineChart";

class Progress extends Component {
  render() {
    return (
      <div>
        <LineChart />
        <LineChart />
        <LineChart />
      </div>
    );
  }
}

export default Progress;
