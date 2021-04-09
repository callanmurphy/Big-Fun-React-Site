const gameTypes = [
    {
      id: 0,
      title: 'Follow the dot',
    }, {
      id: 1,
      title: 'Type the keys',
    }, {
      id: 2,
      title: 'Pong',
    },
  ]


// function makeGame(name, score, daysago) {
//     let date = new Date();
//     date.setDate(date.getDate() - daysago);
//     return {
//       name: name,
//       score: score,
//       date: date,
//       user1: users[Math.floor(Math.random() * users.length)].id,
//       user2: users[Math.floor(Math.random() * users.length)].id,
//     }
// }
// function makeGamesData(i, start) {
//     let range = Array.from(Array(i).keys());
//     return range.map((i) => {
//         let r = Math.random();
//         let score = 100 * r;
//         let k = Math.floor(r * games.length);
//         return makeGame(games[k].title, score, start + i);
//     })
// }


// const matches = makeGamesData(400, 0);

export async function gameHistory(user) {
    let games = (await fetch(`/api/games/gameinfo/${user}`)).json();
    // for (let i=0; i < games.length; i++) {
    //     games[i].date = new Date(games[i].date);
    // }

    return games;
}

export function gameInfo(gid) {
    if (gid) {
        return gameTypes.map(g => g).filter(({id}) => id === gid)[0];
    } else {
        return gameTypes.map(g => g);
    }
}

// export function soloGames(games) {
//     return games.filter(({user2}) => (!user2 || user2 === user1));
// }

export function vsGames(games) {
    return games.filter(({user1, user2}) => user2 !== user1)
}

export function getBestRival(uid, games) {
    let counts = {};
    vsGames(games).forEach(g => {
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

export function getFavoriteGame(games) {
    if (games.length && games.length > 0) {
        let gamecounts = gameTypes.map(_ => 0)
        games.forEach(g => {
          gamecounts[games.indexOf(g.name)] += 1;
        });
        return gameTypes[gamecounts.indexOf(Math.max(...gamecounts))].title;
    } else {
        return gameTypes[0].title;
    }
}
