import PongImg from './gamePics/pong.png';
import DotImg from './gamePics/followDot.png';
import { Pong, DotFollow, TypeType } from './GamePages';


const gamelinks = [
    {
        path: '/games/game1',
        title: 'Follow the dot',
        img: DotImg,
        description: (<span>Can you keep track of the dot?</span>),
        element: (<DotFollow />),
    
    }, {
        path: '/games/game2',
        title: 'Type the keys',
        img: PongImg,
        description: (<span>How fast can <em>you</em> type??</span>),
        element: (<TypeType />),
    
    }, {
        path: '/games/game3',
        title: 'Pong',
        img: PongImg,
        description: (<span>Try to battle an AI in the <em>gruelling</em> game of <b>PONG</b>!</span>),
        element: (<Pong />),
    
    },
]
export { gamelinks };