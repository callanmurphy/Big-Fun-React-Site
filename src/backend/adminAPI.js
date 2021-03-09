import { users } from './tempdata';
import { getFavoriteGame, gameHistory, getBestRival } from './gameAPI';
import { getUser } from './userAPI';

export function getUsers() {
    let ret = users.map(u => {
        u.favoriteGame = getFavoriteGame(u.id);
        u.gamesPlayed = gameHistory(u.id).length;
        u.bestRival = getUser(parseInt(getBestRival(u.id))).name;
        return u;
    });
    return ret;
}