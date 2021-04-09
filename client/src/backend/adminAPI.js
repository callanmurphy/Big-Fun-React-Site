import { getFavoriteGame, gameHistory, getBestRival } from './gameAPI';

export async function getUsers() {
    
    const users = await (await fetch(`/api/admin/users`)).json();
    const ret = [];
    for (let i=0; i < users.length; i++) {
        const u = users[i];
        const gamehist = await gameHistory(u.username);
        u.favoriteGame = getFavoriteGame(gamehist);
        u.gamesPlayed = gamehist.length;
        u.bestRival = getBestRival(u.username, gamehist);
        ret.push(u);
    }
    return ret;
}