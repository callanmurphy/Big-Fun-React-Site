import { users } from './tempdata';
import { games } from './tempdata';

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
    if (uid || uid === 0) {
        return matches.map(m => m).filter(g => (g.user1 === uid) || (g.user2 === uid));
    } else {
        return matches.map(m => m);
    }
}

export function gameInfo(gid) {
    if (gid) {
        return games.map(g => g).filter(({id}) => id === gid)[0];
    } else {
        return games.map(g => g);
    }
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

export function getFavoriteGame(uid) {
    let gamecounts = games.map(g => 0)
    gameHistory(uid).forEach(g => {
      gamecounts[games.indexOf(g.name)] += 1;
    });
    return games[gamecounts.indexOf(Math.max(...gamecounts))].title;
}
