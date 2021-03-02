import React, { Component } from "react";
import { uid } from "react-uid";
import LineChart from "../LineChart/lineChart";
import './Progress.css';
import {
  Grid, Paper, TableHead, TableRow,
  TableCell, Table, TableBody, TableSortLabel,
  Toolbar, Typography, Select, FormControl, MenuItem,
  Input, TablePagination, TableFooter, IconButton,
  Slide,
  Divider
} from '@material-ui/core';
import { FilterList, ArrowBackIos as BackArrow, ArrowForwardIos as ForwardArrow } from '@material-ui/icons';

function makeGame(name, score, daysago) {
  let date = new Date();
  date.setDate(date.getDate() - daysago);
  return {
    name: name,
    score: score,
    date: date,
  }
}
function makeGamesData(i, start, gameSelection) {
  let range = Array.from(Array(i).keys());
  return range.map((i) => {
    let r = Math.random();
    let score = 100 * r;
    let k = Math.floor(r * gameSelection.length);
    return makeGame(gameSelection[k], score, start + i);
  })
}
class Progress extends Component {
  constructor(props) {
    super(props);

    this.perPage = 8;

    this.state = {
      recentGames: makeGamesData(40, 0, this.props.games),
      direction: 1,
      by: 'date',
      tablePage: 0,
      gameFilter: 'All',
      showGame: 0,
      chartTransitions: this.props.games.map((g, i) => (i === 0 ? 'left' : 'right')),
      chartTransitionsIn: this.props.games.map((g, i) => (i === 0)),
    }
  }

  moveChart(n) {
    const oldgame = this.state.showGame;
    const ngames = this.props.games.length;
    const newgame = (((this.state.showGame + n) % ngames) + ngames) % ngames;
    const slides = this.state.chartTransitions.map((b, i) => {
      if (oldgame === i) {
        return n > 0 ? 'left' : 'right';
      } else {
        return n > 0 ? 'right' : 'left';
      }
    });
    this.setState({
      showGame: newgame,
      chartTransitions: slides,
      chartTransitionsIn: this.props.games.map((g, i) => (i === newgame))
    })
  }

  comparator(a, b) {
    const by = this.state.by
    if (a[by] < b[by]) {
      return 1 * this.state.direction;
    }
    if (b[by] < a[by]) {
      return -1 * this.state.direction;
    }
    return 0;
  }

  getMoreData() {
    let newGames = makeGamesData(10, this.state.recentGames.length, this.props.games);
    this.setState({
      recentGames: this.state.recentGames.concat(newGames)
    });
  }

  setSort(by) {
    if (by === this.state.by) {
      this.setState({
        direction: -1 * this.state.direction
      })
    } else {
      this.setState({
        direction: 1,
        by: by
      })
    }
  }

  render() {
    const setFilter = (e) => {
      this.setState({
        gameFilter: e.target.value,
        tablePage: 0,
      })
    };
    const gameFilter = (g) => this.state.gameFilter === 'All'
      || g.name === this.state.gameFilter;
    const filteredGames = this.state.recentGames
      .filter(gameFilter)
      .sort((a, b) => this.comparator(a, b));

    const charts = this.props.games.map((g, i) => (
      <div className='progressSlider' key={uid(g)}>
        <Slide
          in={this.state.chartTransitionsIn[i]}
          direction={this.state.chartTransitions[i]}
          overflow='hidden'
        >
          <LineChart
            title={g}
            data={this.state.recentGames.filter((game) => game.name === g)}
            gety={(d, i) => d.score}
            getx={(d, i) => d.date}
            xaxisTime
            blocky
          />
        </Slide>
      </div>
    ));

    let gamecounts = this.props.games.map(g => 0)
    this.state.recentGames.forEach(g => {
      gamecounts[this.props.games.indexOf(g.name)] += 1;
    });
    let favoriteGame = this.props.games[gamecounts.indexOf(Math.max(...gamecounts))]


    return (
      <Grid container spacing={3} alignItems='stretch' className='progessGrid'>
        <Grid item xs={4}>
          <Paper className='progressFullHeight'>
            <Toolbar>
              <Typography variant='h5' className='progressToolbarHeader'>
                My Games
              </Typography>
              <FilterList />
              <FormControl>
                <Select
                  value={this.state.gameFilter}
                  input={<Input />}
                  onChange={setFilter}
                >
                  <MenuItem value='All'><em>All</em></MenuItem>
                  {
                    this.props.games.map(g => (
                      <MenuItem key={g} value={g}>{g}</MenuItem>
                    ))
                  }
                </Select>
              </FormControl>
            </Toolbar>
            <Table size='medium'>
              <TableHead>
                <TableRow>
                  <TableCell>
                    <TableSortLabel
                      align='left'
                      active={this.state.by === 'date'}
                      direction={this.state.direction === 1 ? 'asc' : 'desc'}
                      onClick={(e) => this.setSort('date')}
                    >
                      Date
                    </TableSortLabel>
                  </TableCell>
                  <TableCell>
                    <TableSortLabel
                      align='right'
                      active={this.state.by === 'score'}
                      direction={this.state.direction === 1 ? 'asc' : 'desc'}
                      onClick={(e) => this.setSort('score')}
                    >
                      Score
                    </TableSortLabel>
                  </TableCell>
                  <TableCell>
                    <TableSortLabel
                      align='right'
                      active={this.state.by === 'name'}
                      direction={this.state.direction === 1 ? 'asc' : 'desc'}
                      onClick={(e) => this.setSort('name')}
                    >
                      Game
                    </TableSortLabel>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {
                  filteredGames
                    .slice(
                      this.state.tablePage * this.perPage,
                      (this.state.tablePage + 1) * this.perPage)
                    .map((g, i) => (
                      <TableRow
                        hover
                        key={uid(g.date)}
                      >
                        <TableCell className={(i%2 === 1) ? 'progressFaintPrimary' : ''}>
                          {g.date.toLocaleDateString('en-US')}
                        </TableCell>
                        <TableCell className={(i%2 === 1) ? 'progressFaintPrimary' : ''}>
                          {Math.round(g.score)}
                        </TableCell>
                        <TableCell className={(i%2 === 1) ? 'progressFaintPrimary' : ''}>
                          {g.name}
                        </TableCell>
                      </TableRow>
                    ))
                }
                { // blank rows
                  filteredGames.length % this.perPage !== 0
                    && this.state.tablePage === Math.floor(filteredGames.length / this.perPage)
                    ? [...Array(this.perPage - (filteredGames.length % this.perPage)).keys()]
                      .map(i => (
                        <TableRow key={i}>
                          <TableCell>{"\u00a0"}</TableCell>
                          <TableCell></TableCell>
                          <TableCell></TableCell>
                        </TableRow>
                      ))
                    : null
                }
              </TableBody>
              <TableFooter>
                <TableRow>
                  <TablePagination
                    count={filteredGames.length}
                    rowsPerPage={this.perPage}
                    page={this.state.tablePage}
                    onChangePage={(e, p) => this.setState({ tablePage: p })}
                    rowsPerPageOptions={[]}
                  />
                </TableRow>
              </TableFooter>
            </Table>
          </Paper>
        </Grid>
        <Grid item xs={8}>
          <Paper className='progressFullHeight progressCharts'>
            <Typography variant='h5' display='block' align='center'>
              {this.props.games[this.state.showGame]}
            </Typography>
            <div className='progressChartCarosoul'>
              <div>
                <IconButton
                  className='progressCarosoulButton'
                  onClick={(e) => this.moveChart(-1)}
                >
                  <BackArrow ></BackArrow>
                </IconButton>
              </div>
              <div className='progressChartContainer'>
                {charts}
              </div>
              <div>
                <IconButton
                  className='progressCarosoulButton'
                  onClick={(e) => this.moveChart(1)}
                >
                  <ForwardArrow ></ForwardArrow>
                </IconButton>
              </div>
            </div>
          </Paper>
        </Grid>
        <Grid item xs={3}>
          <Paper className='progressFullHeight progressStatPaper'>
            <Typography className='progressStatTitle' variant='h4' align='center' display='block'>
              Games Played
            </Typography>
            <Divider />
            <Typography className='progressStatVal' variant='h2' align='center'>
              {this.state.recentGames.length}
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={3}>
          <Paper className='progressFullHeight progressStatPaper'>
            <Typography className='progressStatTitle' variant='h4' align='center' display='block'>
              High Score
            </Typography>
            <Divider />
            <Typography className='progressStatVal' variant='h2' align='center'>
              {Math.round(Math.max(...this.state.recentGames.map(g => g.score)))}
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={3}>
          <Paper className='progressFullHeight progressStatPaper'>
            <Typography className='progressStatTitle' variant='h4' align='center' display='block'>
              Best Rival
            </Typography>
            <Divider />
            <Typography className='progressStatVal' variant='h2' align='center'>
              TODO
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={3}>
          <Paper className='progressFullHeight progressStatPaper'>
            <Typography className='progressStatTitle' variant='h4' align='center' display='block'>
              Favorite Game
            </Typography>
            <Divider />
            <Typography className='progressStatVal' variant='h2' align='center'>
              {favoriteGame}
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    );
  }
}

export default Progress;
  // <div>
  //   <div id='recentgames'>
  //     <table>
  //       <thead>
  //         <tr>
  //           <th className='gamename'>Game</th>
  //           <th className='gamescore'>Score</th>
  //           <th className='gamedate'>Date</th>
  //         </tr>
  //       </thead>
  //       <tbody>
  //         { this.state.recentGames.map((g, i) => {
  //           return (
  //             <tr key={uid(g)}>
  //               <td className='gamename'>{g.name}</td>
  //               <td className='gamescore'>{Math.round(g.score)}</td>
  //               <td className='gamedate'>{g.date.toLocaleDateString('en-US')}</td>
  //             </tr>
  //           );
  //         }) }
  //         <tr>
  //           <td className='gamedate' colSpan='3'>
  //             <button onClick={() => this.getMoreData()}>...</button>
  //           </td>
  //         </tr>
  //       </tbody>
  //     </table>
  //   </div>
  //   <div id='chartContainer'>
  //     {
  //       this.props.games.map((g) => {
  //         return (
  //           <LineChart
  //             key={ uid(g) }
  //             title={ g }
  //             data={ this.state.recentGames.filter((game) => game.name === g) }
  //             gety={ (d, i) => d.score }
  //             getx={ (d, i) => i }
  //             />
  //         );
  //       })
  //     }
  //   </div>
  // </div>
