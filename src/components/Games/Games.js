import React, { Component } from "react";
import { Link } from 'react-router-dom';
import { Container } from '@material-ui/core';

class Games extends Component {
  render() {
    return (
      <Container>
        {
          this.props.gamelinks.map(g => (
            <Link key={g.title} to={g.path}>
              <h1>
                {g.title}
              </h1>
            </Link>
          ))
        }
      </Container>
    )
  }
}


const gamelinks = [
  { path: '/games/game1', title: 'Follow the dot', element: (<h1>Game 1</h1>) },
  { path: '/games/game2', title: 'Type the keys', element: (<h1>Game 2</h1>) },
  { path: '/games/game3', title: 'Pong', element: (<h1>Game 3</h1>) },
];

export default Games;
export { gamelinks };