import Pong from './gamePics/pong.png';

const gamelinks = [
    {
        path: '/games/game1',
        title: 'Follow the dot',
        img: Pong,
        description: (<span>Can you keep track of the dot?</span>),
        element: (<h1>Game 1</h1>),
    
    }, {
        path: '/games/game2',
        title: 'Type the keys',
        img: Pong,
        description: (<span>How fast can <em>you</em> type??</span>),
        element: (<h1>Game 2</h1>),
    
    }, {
        path: '/games/game3',
        title: 'Pong',
        img: Pong,
        description: (<span>Try to battle an AI in the <em>gruelling</em> game of <b>PONG</b>!</span>),
        element: (<h1>Game 3</h1>),
    
    },
]
export { gamelinks };