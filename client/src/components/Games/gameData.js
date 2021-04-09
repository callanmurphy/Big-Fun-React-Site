import PongImg from './gamePics/pong.png';
import DotImg from './gamePics/followTheDot.png';
import TypeImg from './gamePics/typeTheKeys.png';
import { Pong, DotFollow, TypeType } from './GamePages';


const gamelinks = [
    {
        path: '/games/follow-the-dot',
        title: 'Follow the dot',
        img: DotImg,
        description: (<span>Can you keep track of the dot?</span>),
        element: (user) => (<DotFollow user={user} />),
    
    }, {
        path: '/games/type-the-keys',
        title: 'Type the keys',
        img: TypeImg,
        description: (<span>How fast can <em>you</em> type??</span>),
        element: (user) => (<TypeType user={user} />),
    
    }, {
        path: '/games',
        title: 'Pong',
        img: PongImg,
        description: (<span>Try to battle an AI in the <em>gruelling</em> game of <b>PONG</b>!</span>),
        element: (user) => (<Pong user={user} />),
    
    },
]
export { gamelinks };