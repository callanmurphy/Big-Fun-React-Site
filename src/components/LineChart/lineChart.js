import React, { Component } from "react";
import * as d3 from "d3";
import './lineChart.css';

class LineChart extends Component {
  constructor(props) {
    super(props);

    this.chart = React.createRef();
    this.width = 500;
    this.height = 300;
    this.axisLeft = 30;
    this.axisBottom = 30;
    this.axisTop = 5;
    this.axisRight = 10;
    this.state = {
      data: [1, 2, 3, 2]
    }
  }

  componentDidMount() {
    const svg = d3.select(this.chart.current)
    svg.attr('width', this.width)
       .attr('height', this.height)

    const xscale = d3
      .scaleLinear()
      .domain([0, this.state.data.length + 1.5])
      .range([this.axisLeft, this.width - this.axisRight])
    const yscale = d3
      .scaleLinear()
      .domain([0, d3.max(this.state.data)])
      .range([this.height - this.axisTop, this.axisBottom])

    const xaxis = d3
      .axisBottom()
      .scale(xscale)
    const yaxis = d3
      .axisLeft()
      .scale(yscale)

    svg
      .append('g')
      .attr('transform', `translate(0, ${this.height - this.axisBottom})`)
      .call(xaxis)
    svg
      .append('g')
      .attr('transform', `translate(${this.axisLeft}, ${this.axisTop-this.axisBottom})`)
      .call(yaxis)

    svg
      .append('g')
      .selectAll('.bar')
      .data(this.state.data)
      .enter().append('rect')
      .attr('class', 'bar')
      .attr('x', (_, i) => xscale(i+1) - (this.width / this.state.data.length - 50)/2)
      .attr('y', (d, i) => yscale(d))
      .attr('width', this.width / this.state.data.length - 50)
      .attr('height', (d, i) => yscale(0) - yscale(d))
      .attr('transform', `translate(0, ${this.axisTop-this.axisBottom})`)
  }

  render() {
    return (
      <svg className="linechart" ref={this.chart}>
      </svg>
    );
  }
}

export default LineChart;
