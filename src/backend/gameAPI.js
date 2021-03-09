const matches = [
    {
        user1: 2, user2: 1, game: 1, score: 25, date: new Date('3/4/2021')
    }, {
        user1: 3, user2: 2, game: 1, score: 15, date: new Date('3/4/2021')
    }, {
        user1: 0, user2: 1, game: 0, score: 13, date: new Date('3/1/2021')
    }, {
        user1: 0, user2: -1, game: 0, score: 83, date: new Date('3/2/2021')
    }, {
        user1: 0, user2: -1, game: 1, score: 52, date: new Date('3/3/2021')
    }, {
        user1: 0, user2: -1, game: 2, score: 37, date: new Date('3/4/2021')
    }
]

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

export function gameHistory(uid) {
    return matches.filter(({user1, user2, game}) => (user1 === uid) || (user2 === uid));
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