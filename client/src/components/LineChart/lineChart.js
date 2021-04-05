import React, { Component } from 'react';
import * as d3 from 'd3';
import './lineChart.css';

class LineChart extends Component {
  constructor(props) {
    super(props);

    this.chartref = React.createRef();
    this.dims = {
      width: null,
      height: null,
      innerWidth: null,
      innerHeight: null,
    }
    this.margin = {
      top: 10,
      right: 30,
      bottom: 40,
      left: 60,
    }
    this.chart = {}
  }

  get data() {
    return this.props.data.sort((a, b) => {
      if (this.props.getx(a) < this.props.getx(b)) {
        return -1;
      } else if (this.props.getx(a) > this.props.getx(b)) {
        return 1;
      }
      return 0;
    })
  }

  get ydata() {
    return this.data.map((d, i) => this.props.gety(d, i));
  }

  get xdata() {
    return this.data.map((d, i) => this.props.getx(d, i));
  }

  get xticks() {
    if (this.props.xticks) {
      return this.props.xticks
    } else {
      return 5
    }
  }

  get xmax() {
    if (this.props.xaxisTime) {
      return new Date()
    } else {
      return d3.max(this.xdata)
    }
  }

  get xypath() {
    const xdata = this.xdata.map(this.chart.xscale);
    const ydata = this.ydata.map(this.chart.yscale);
    let ret = [];
    for(let i = 0; i < this.props.data.length; i++) {
      if (this.props.blocky) {
        if (i < this.props.data.length - 1) {
          ret.push([xdata[i], ydata[i]])
          ret.push([xdata[i+1], ydata[i]])
        } else if (this.props.xaxisTime) {
          ret.push([xdata[i], ydata[i]])
          ret.push([this.chart.xscale(new Date()), ydata[i]])
        }
      } else {
        ret.push([xdata[i], ydata[i]])
      }
    }
    return ret
  }

  updateDims() {
    this.dims = {
      width: this.chartref.current.clientWidth,
      height: this.chartref.current.clientHeight,
      innerWidth: this.chartref.current.clientWidth - this.margin.left - this.margin.right,
      innerHeight: this.chartref.current.clientHeight - this.margin.top - this.margin.bottom,
    }
  }

  updateChart() {
    this.updateDims();
    const xmin = d3.min(this.xdata);
    const xmax = this.xmax;
    const ymin = 0;

    this.chart.xscale
      .domain([xmin, xmax])
      .range([0, this.dims.innerWidth]);
    this.chart.xaxis
      .attr('transform', `translate(0, ${this.dims.innerHeight})`)
      .call(
        d3.axisBottom(this.chart.xscale)
          .ticks(this.xticks)
      )

    this.chart.yscale
      .domain([ymin, d3.max(this.ydata)])
      .range([this.dims.innerHeight, 0]);
    this.chart.yaxis
      .call(d3.axisLeft(this.chart.yscale));

      
      
    let path = this.xypath;
    this.chart.line.attr('d', d3.line()(path));
    path.unshift([this.chart.xscale(xmin), this.chart.yscale(ymin)])
    path.push([this.chart.xscale(xmax), this.chart.yscale(ymin)])
    this.chart.linefill.attr('d', d3.line()(path));
  }

  componentDidMount() {  // initialize the chart elements
    this.updateDims();
    this.chart.svg = d3.select(this.chartref.current)
    this.chart.innersvg = this.chart.svg
      .append('g')
      .attr('transform', `translate(${this.margin.left}, ${this.margin.top})`)

    if (this.props.xaxisTime) {
      this.chart.xscale = d3.scaleTime()
    } else {
      this.chart.xscale = d3.scaleLinear()
    }
    // this.chart.xscale
    //   .domain([d3.min(this.xdata), this.xmax])
    //   .range([0, this.dims.innerWidth])
    this.chart.xaxis = this.chart.innersvg.append('g')
    //   .attr('transform', `translate(0, ${this.dims.innerHeight})`)
    //   .call(
    //     d3.axisBottom(this.chart.xscale)
    //       .ticks(this.xticks)
    //   )

    this.chart.yscale = d3
      .scaleLinear()
      // .domain([0, d3.max(this.ydata)])
      // .range([this.dims.innerHeight, 0])
    this.chart.yaxis = this.chart.innersvg.append('g')
      // .call(d3.axisLeft(this.chart.yscale))

    this.chart.line = this.chart.innersvg.append('path')
      .attr('fill', 'none')
      .attr('stroke', 'var(--primary)')
      .attr('stroke-width', 2)
      // .attr('d', d3.line()(this.xypath));
    this.chart.linefill = this.chart.innersvg.append('path')
      .attr('fill', 'url(#fillgrad)')
      .attr('stroke', 'none')

      this.updateCallback = () => this.forceUpdate();
      window.addEventListener('resize', this.updateCallback);
      this.forceUpdate()
  }

  componentDidUpdate(psprops, pstate) {
    this.updateChart();
  }

  componentWillUnmount() {
    window.removeEventListener('resize',  this.updateCallback);
  }

  render() {
    return (
      <svg className='linechart' ref={this.chartref}>
        <defs>
          <linearGradient id="fillgrad" x1="50%" y1="100%" x2="50%" y2="0%">
            <stop offset='0%' style={{stopColor: 'var(--primary)', stopOpacity:0.1}} />
            <stop offset='75%' style={{stopColor: 'var(--secondary)', stopOpacity:0.6}} />
          </linearGradient>
        </defs>
      </svg>
    );
  }
}

export default LineChart;
