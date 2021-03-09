import { users } from './userAPI';

const games = [
    {
        id: 0,
        title: 'Follow the dot',
    }, {
        id: 0,
        title: 'Type the keys',
    }, {
        id: 0,
        title: 'Pong',
    },
]

function makeGame(name, score, daysago) {
    let date = new Date();
    date.setDate(date.getDate() - daysago);
    return {
      name: name,
      score: score,
      date: date,
      user1: users[Math.floor(Math.random() * users.length)].id,
      user2: users[Math.floor(Math.random() * users.length)].id,
    }
}
function makeGamesData(i, start) {
    let range = Array.from(Array(i).keys());
    return range.map((i) => {
        let r = Math.random();
        let score = 100 * r;
        let k = Math.floor(r * games.length);
        return makeGame(games[k].title, score, start + i);
    })
}


const matches = makeGamesData(400, 0);

export function gameHistory(uid) {
    return matches.filter(g => (g.user1 === uid) || (g.user2 === uid));
}

export function gameInfo(gid) {
    return games.filter(({id}) => id === gid)[0];
}

export function soloGames(uid) {
    return gameHistory(uid).filter(({user2}) => user2 === -1);
}

export function vsGames(uid) {
    return gameHistory(uid).filter(({user2}) => user2 !== -1)
}

export function getBestRival(uid) {
    let counts = {};
    vsGames(uid).forEach(g => {
        let u = g.user1;
        if (u === uid) {
            u = g.user2;
        }
        if (counts[u]) {
            counts[u] ++;
        } else {
            counts[u] = 1;
        }
    });
    let rivals = Object.keys(counts);
    let max = rivals[0];
    rivals.forEach(r => {
        if (counts[r] > counts[max]) {
            max = r;
        }
    })
    return max;
}