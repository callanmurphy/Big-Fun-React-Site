import React, { Component } from 'react';
import * as d3 from 'd3';
import './lineChart.css';

class LineChart extends Component {
  constructor(props) {
    super(props);

    this.chartref = React.createRef();
    this.width = 500;
    this.height = 300;
    this.margin = {
      top: 10,
      right: 30,
      bottom: 30,
      left: 60,
    }
    this.chart = {}

  }

  get ydata() {
    return this.props.data.map((d, i) => this.props.gety(d, i))
  }

  get xdata() {
    return this.props.data.map((d, i) => this.props.getx(d, i))
  }

  get xypath() {
    return Array.from(Array(this.props.data.length).keys()).map(i => {
      return [this.chart.xscale(this.xdata[i]), this.chart.yscale(this.ydata[i])]
    })
  }

  componentDidMount() {
    const svg = d3.select(this.chartref.current)
      .attr('width', this.width + this.margin.left + this.margin.right)
      .attr('height', this.height + this.margin.top + this.margin.bottom)
      .append('g')
      .attr('transform', `translate(${this.margin.left}, ${this.margin.top})`)

    this.chart.xscale = d3
      .scaleLinear()
      .domain([d3.min(this.xdata), d3.max(this.xdata)])
      .range([0, this.width])
    this.chart.xaxis = svg.append('g')
      .attr('transform', `translate(0, ${this.height})`)
      .call(d3.axisBottom(this.chart.xscale))

    this.chart.yscale = d3
      .scaleLinear()
      .domain([d3.min(this.ydata), d3.max(this.ydata)])
      .range([this.height, 0])
    this.chart.yaxis = svg.append('g')
      // .attr('transform', `translate(0, ${this.height})`)
      .call(d3.axisLeft(this.chart.yscale))

    this.chart.line = svg.append('path')
      .attr('fill', 'none')
      .attr('stroke', 'steelblue')
      .attr('stroke-width', 1.5)
      .attr('d', d3.line()(this.xypath))
  }

  componentDidUpdate(psprops, pstate) {
    this.chart.xscale.domain([d3.min(this.xdata), d3.max(this.xdata)])
    this.chart.yscale.domain([d3.min(this.ydata), d3.max(this.ydata)])
    this.chart.xaxis.call(d3.axisBottom(this.chart.xscale))
    this.chart.yaxis.call(d3.axisLeft(this.chart.yscale))
    this.chart.line.attr('d', d3.line()(this.xypath))
  }

  render() {
    return (
      <div>
        <h2 className='chartTitle'>{ this.props.title }</h2><br/>
        <svg className='linechart' ref={this.chartref}></svg>
      </div>
    );
  }
}

export default LineChart;
