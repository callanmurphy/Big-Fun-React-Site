import React, { Component } from "react";
import { uid } from "react-uid";
import LineChart from "../LineChart/lineChart";
import './Progress.css';


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

    this.state = {
      recentGames: makeGamesData(40, 0, this.props.games)
    }
  }

  getMoreData() {
    let newGames = makeGamesData(10, this.state.recentGames.length, this.props.games);
    this.setState({
      recentGames: this.state.recentGames.concat(newGames)
    });
  }

  render() {
    return (
      <div>
        <div id='recentgames'>
          <table>
            <thead>
              <tr>
                <th className='gamename'>Game</th>
                <th className='gamescore'>Score</th>
                <th className='gamedate'>Date</th>
              </tr>
            </thead>
            <tbody>
              { this.state.recentGames.map((g, i) => {
                return (
                  <tr key={uid(g)}>
                    <td className='gamename'>{g.name}</td>
                    <td className='gamescore'>{Math.round(g.score)}</td>
                    <td className='gamedate'>{g.date.toLocaleDateString('en-US')}</td>
                  </tr>
                );
              }) }
              <tr>
                <td className='gamedate' colSpan='3'>
                  <button onClick={() => this.getMoreData()}>...</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div id='chartContainer'>
          {
            this.props.games.map((g) => {
              return (
                <LineChart
                  key={ uid(g) }
                  title={ g }
                  data={ this.state.recentGames.filter((game) => game.name === g) }
                  gety={ (d, i) => d.score }
                  getx={ (d, i) => i }
                  />
              );
            })
          }
        </div>
      </div>
    );
  }
}

export default Progress;
