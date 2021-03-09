import React, { Component } from "react";
import { uid } from "react-uid";
import LineChart from "../LineChart/lineChart";
import './Admin.css';
import {
  Grid, Paper, TableHead, TableRow,
  TableCell, Table, TableBody, TableSortLabel,
  Toolbar, Typography, Select, FormControl, MenuItem,
  Input, TablePagination, TableFooter, IconButton,
  Slide,
  Divider, Container, TextField
} from '@material-ui/core';
import { FilterList, ArrowBackIos as BackArrow, ArrowForwardIos as ForwardArrow,
         DeleteForever, Visibility, VisibilityOff, Search
        } from '@material-ui/icons';
import { getUser, gameHistory, gameInfo, getUsers, getFavoriteGame } from "../../backend";
import * as d3 from 'd3';


class Admin extends Component {
  constructor(props) {
    super(props);

    this.perPage = 6;
    this.usersPerPage = 4;

    this.games = gameInfo();
    const gameHist = gameHistory()
    const usrs = getUsers();
    this.state = {
      recentGames: gameHist,
      users: usrs,
      direction: 1,
      by: 'date',
      udirection: 1,
      uby: 'name',
      tablePage: 0,
      utablePage: 0,
      gameFilter: 'All',
      showGame: 0,
      chartTransitions: this.games.map((g, i) => (i === 0 ? 'left' : 'right')),
      chartTransitionsIn: this.games.map((g, i) => (i === 0)),
      userPasswordHidden: usrs.map(u => true),
      userSearchString: '',
    }
  }


  componentDidMount() {
    document.title = 'Progress - Big Fun';
  }

  updateUserFilter(v) {
    this.setState({
      userSearchString: v
    })
  }

  moveChart(n) {
    const oldgame = this.state.showGame;
    const ngames = this.games.length;
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
      chartTransitionsIn: this.games.map((g, i) => (i === newgame))
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

  userComparator(a, b) {
    const by = this.state.uby
    if (a[by] < b[by]) {
      return 1 * this.state.udirection;
    }
    if (b[by] < a[by]) {
      return -1 * this.state.udirection;
    }
    return 0;
  }

  getData(g) {
    const data = this.state.recentGames.filter((game) => game.name === g);
    const maxX = new Date(d3.max(data.map(d => d.date)).getTime());
    const minX = new Date(d3.min(data.map(d => d.date)).getTime());
    
    let ret = [];
    let currDay = minX;
    let tmrw = new Date(currDay.getTime());
    tmrw.setDate(currDay.getDate() + 7)

    while (currDay < maxX) {
      let tmp = {count: 0, day: new Date(currDay.getTime())};
      data.forEach(d => {
        if (currDay <= d.date && d.date < tmrw) {
          tmp.count++;
        }
      })
      ret.push(tmp);
      tmrw.setDate(tmrw.getDate() + 7)
      currDay.setDate(currDay.getDate() + 7);
    }
    return ret;
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

  setUserSort(by) {
    if (by === this.state.uby) {
      this.setState({
        udirection: -1 * this.state.udirection
      })
    } else {
      this.setState({
        udirection: 1,
        uby: by
      })
    }
  }

  togglePasswordVisible(i) {
    let newlist = this.state.userPasswordHidden.map((t, i_) => {
      if (i === i_) {
        return !t;
      } else {
        return t;
      }
    });
    this.setState({
      userPasswordHidden: newlist
    })
  }

  render() {
    const games = this.games;
    const gameNames = games.map(g => g.title);

    const setFilter = (e) => {
      this.setState({
        gameFilter: e.target.value,
        tablePage: 0,
      })
    };
    const gameFilter = (g) => this.state.gameFilter === 'All'
      || g.name === this.state.gameFilter;
    const filteredGames = this.state.recentGames.map(g => g)
      .filter(gameFilter)
      .sort((a, b) => this.comparator(a, b));

    const userFilter = (u) => u.name.match(this.state.userSearchString) !== null;
    const filteredUsers = this.state.users
      .filter(userFilter)
      .sort((a, b) => this.userComparator(a, b));

    const charts = gameNames.map((g, i) => (
      <div className='progressSlider' key={uid(g)}>
        <Slide
          in={this.state.chartTransitionsIn[i]}
          direction={this.state.chartTransitions[i]}
          overflow='hidden'
        >
          <LineChart
            title={`Number of ${g.title} games played`}
            data={this.getData(g)}
            gety={(d, i) => d.count}
            getx={(d, i) => d.day}
            xaxisTime
            blocky
          />
        </Slide>
      </div>
    ));

    let userTableFillers = this.usersPerPage - (filteredUsers.length % this.usersPerPage);
    if (filteredUsers.length === 0) {
      userTableFillers = this.usersPerPage;
    }

    const today = new Date();
    let weekago = new Date(today.getTime());
    weekago.setDate(weekago.getDate() - 7);
    const oneWeekFilter = d => (weekago < d.date) && (d.date < today);

    return (
      <Container maxWidth={false}>
        <Grid container spacing={3} alignItems='stretch' className='progessGrid'>
          <Grid item xs={6}>
            <Paper className='progressFullHeight'>
              <Toolbar>
                <Typography variant='h5' className='progressToolbarHeader'>
                  Games Played
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
                      gameNames.map(g => (
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
                    <TableCell>
                      <TableSortLabel
                        align='right'
                        active={this.state.by === 'user1'}
                        direction={this.state.direction === 1 ? 'asc' : 'desc'}
                        onClick={(e) => this.setSort('user1')}
                      >
                        User1
                      </TableSortLabel>
                    </TableCell>
                    <TableCell>
                      <TableSortLabel
                        align='right'
                        active={this.state.by === 'user2'}
                        direction={this.state.direction === 1 ? 'asc' : 'desc'}
                        onClick={(e) => this.setSort('user2')}
                      >
                        User2
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
                          key={uid(i)}
                        >
                          <TableCell>
                            {g.date.toLocaleDateString('en-US')}
                          </TableCell>
                          <TableCell>
                            {Math.round(g.score)}
                          </TableCell>
                          <TableCell>
                            {g.name}
                          </TableCell>
                          <TableCell>
                            { getUser(g.user1).name }
                          </TableCell>
                          <TableCell>
                            { getUser(g.user2).name }
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


          <Grid item xs={6}>
            <Paper className='progressFullHeight progressCharts'>
              <Typography variant='h5' display='block' align='center' className='progressChartTitle'>
                Number of weekly <span className='adminTertText'>{ gameNames[this.state.showGame] }</span> players
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

          <Grid item xs={4}>
            <Grid container spacing={2} alignItems='stretch'>
              <Grid item xs={6}>
                <Paper className='progressFullHeight progressStatPaper'>
                  <Typography className='progressStatTitle' variant='h5' align='center' display='block'>
                    Games Played
                  </Typography>
                  <Divider />
                  <Typography className='progressStatVal' variant='h3' align='center'>
                      { this.state.recentGames.length }
                  </Typography>
                </Paper>
              </Grid>
              <Grid item xs={6}>
                <Paper className='progressFullHeight progressStatPaper'>
                  <Typography className='progressStatTitle' variant='h5' align='center' display='block'>
                  Games This Week
                  </Typography>
                  <Divider />
                  <Typography className='progressStatVal' variant='h3' align='center'>
                    { this.state.recentGames.filter(oneWeekFilter).length }
                  </Typography>
                </Paper>
              </Grid>
              <Grid item xs={6}>
                <Paper className='progressFullHeight progressStatPaper'>
                  <Typography className='progressStatTitle' variant='h5' align='center' display='block'>
                    Best User
                  </Typography>
                  <Divider />
                  <Typography className='progressStatVal' variant='h4' align='center'>
                    TODO
                  </Typography>
                </Paper>
              </Grid>
              <Grid item xs={6}>
                <Paper className='progressFullHeight progressStatPaper'>
                  <Typography className='progressStatTitle' variant='h5' align='center' display='block'>
                    Best Game
                  </Typography>
                  <Divider />
                  <Typography className='progressStatVal' variant='h4' align='center'>
                    { getFavoriteGame() }
                  </Typography>
                </Paper>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={8}>
          <Paper className='progressFullHeight'>
              <Toolbar>
                <Typography variant='h5' className='progressToolbarHeader'>
                  Users
                </Typography>
                <FormControl>
                  <Grid container direction='row' alignItems='flex-end' spacing={1}>
                    <Grid item className='progressFullHeight'><Search /></Grid>
                    <Grid item ><TextField
                      value={this.state.userSearchString}
                      label='username'
                      onChange={(e) => this.updateUserFilter(e.target.value)}
                    /></Grid>
                  </Grid>
                </FormControl>
              </Toolbar>
              <Table size='medium'>
                <TableHead>
                  <TableRow>
                    <TableCell>
                      <TableSortLabel
                        align='left'
                        active={this.state.uby === 'name'}
                        direction={this.state.udirection === 1 ? 'asc' : 'desc'}
                        onClick={(e) => this.setUserSort('name')}
                      >
                        Name
                      </TableSortLabel>
                    </TableCell>
                    <TableCell>
                      <TableSortLabel
                        align='right'
                        active={this.state.uby === 'password'}
                        direction={this.state.udirection === 1 ? 'asc' : 'desc'}
                        onClick={(e) => this.setUserSort('password')}
                      >
                        Password
                      </TableSortLabel>
                    </TableCell>
                    <TableCell>
                      <TableSortLabel
                        align='right'
                        active={this.state.uby === 'favoriteGame'}
                        direction={this.state.udirection === 1 ? 'asc' : 'desc'}
                        onClick={(e) => this.setUserSort('favoriteGame')}
                      >
                        Favorite Game
                      </TableSortLabel>
                    </TableCell>
                    <TableCell>
                      <TableSortLabel
                        align='right'
                        active={this.state.uby === 'gamesPlayed'}
                        direction={this.state.udirection === 1 ? 'asc' : 'desc'}
                        onClick={(e) => this.setUserSort('gamesPlayed')}
                      >
                        Games Played
                      </TableSortLabel>
                    </TableCell>
                    <TableCell>
                      <TableSortLabel
                        align='right'
                        active={this.state.uby === 'bestRival'}
                        direction={this.state.udirection === 1 ? 'asc' : 'desc'}
                        onClick={(e) => this.setUserSort('bestRival')}
                      >
                        Best Rival
                      </TableSortLabel>
                    </TableCell>
                    <TableCell padding='checkbox'>
                      Delete
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {
                    filteredUsers
                      .slice(
                        this.state.utablePage * this.usersPerPage,
                        (this.state.utablePage + 1) * this.usersPerPage)
                      .map((u, i) => {
                        return (
                          <TableRow
                            hover
                            key={uid(i)}
                          >
                            <TableCell>
                              {u.name}
                            </TableCell>
                            <TableCell>
                              {this.state.userPasswordHidden[i]
                                ?
                                  (<IconButton size='small' onClick={() => this.togglePasswordVisible(i)}>
                                    <Visibility />
                                  </IconButton>)
                                :
                                  (<IconButton size='small' onClick={() => this.togglePasswordVisible(i)}>
                                    <VisibilityOff />
                                  </IconButton>)
                              }
                              <span className={this.state.userPasswordHidden[i] ? 'adminPassword' : 'adminNotPassword'}>{u.password}</span>
                              
                            </TableCell>
                            <TableCell>
                              {u.favoriteGame}
                            </TableCell>
                            <TableCell>
                              {u.gamesPlayed}
                            </TableCell>
                            <TableCell>
                              {u.bestRival}
                            </TableCell>
                            <TableCell>
                              <IconButton size='small' edge='start' >
                                <DeleteForever color='error' />
                              </IconButton>
                            </TableCell>
                          </TableRow>
                      )})
                  }
                  { // blank rows
                    (filteredUsers.length % this.usersPerPage !== 0
                      && this.state.utablePage === Math.floor(filteredUsers.length / this.usersPerPage))
                    || filteredUsers.length === 0
                      ? [...Array(userTableFillers).keys()]
                        .map(i => (
                          <TableRow key={i}>
                            <TableCell>{"\u00a0"}</TableCell>
                            <TableCell></TableCell>
                            <TableCell></TableCell>
                            <TableCell></TableCell>
                            <TableCell></TableCell>
                            <TableCell>
                              <IconButton disabled={true} size='small' edge='start' className='adminBlankButton' >
                                <DeleteForever color='error' />
                              </IconButton>
                            </TableCell>
                          </TableRow>
                        ))
                      : null
                  }
                </TableBody>
                <TableFooter>
                  <TableRow>
                    <TablePagination
                      count={filteredUsers.length}
                      rowsPerPage={this.usersPerPage}
                      page={this.state.utablePage}
                      onChangePage={(e, p) => this.setState({ utablePage: p })}
                      rowsPerPageOptions={[]}
                    />
                  </TableRow>
                </TableFooter>
              </Table>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    );
  }
}

export default Admin;