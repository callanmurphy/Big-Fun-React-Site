function populateGame(game) {
    /**
     * game: {
     *      name,
     *      user1,
     *      user2,
     *      score,
     *      date
     * }
     */
    fetch(`/api/games/recordgame`, {
        method: 'post',
        body: JSON.stringify(game),
        headers: { 'Content-type': 'application/json' }
    });
}


function randomCos(n) {
    /** Random cosine from 0-2pi + 1 */
    const diff = 2 * Math.PI / n;
    let curr = 0;
    const ret = [];
    while (curr < 2 * Math.PI) {
        ret.push(Math.cos(curr) + 1);
        curr += diff;
    }
    return ret;
}

function datesInRange(n, daysAgo=28) {
    const before = new Date();
    before.setDate(before.getDate() - daysAgo);
    const allHours = 24 * daysAgo;
    const diff = allHours / n;
    let curr = 0;
    let ret = [];
    while (curr < allHours) {
        const d = new Date();
        d.setHours(d.getHours() - curr);
        ret.push(d);
        curr += diff;
    }
    return ret;
}


const gameNames = ['Follow the dot', 'Type the keys', 'Pong'];


function gamesBetweenCos(n, user1, user2, dayOffset=0, gameIndex=0) {
    const dates = datesInRange(n);
    const scores = randomCos(n).map(s => s * (50 + 50 * Math.random()));
    for (let i of dates.keys()) {
        dates[i].setDate(dates[i].getDate() - dayOffset);
        populateGame({
            name: gameNames[gameIndex],
            user1: user1,
            user2: user2,
            score: scores[i],
            date: dates[i]
        });
    }
}