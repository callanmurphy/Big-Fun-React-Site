import { getFavoriteGame, gameHistory, getBestRival } from './gameAPI';

export async function getUsers() {
    
    const users = (await fetch(`/api/admin/users`)).json();

    let ret = users.map(async (u) => {
        const gamehist = await gameHistory(u.username);
        u.favoriteGame = getFavoriteGame(gamehist);
        u.gamesPlayed = gamehist.length;
        u.bestRival = getBestRival(gamehist);
        return u;
    });
    return ret;
}