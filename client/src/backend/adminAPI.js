import { getFavoriteGame, gameHistory, getBestRival } from './gameAPI';

export async function getUsers() {
    
    const users = (await (await fetch(`/api/admin/users`)).json()).users;
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

export async function delUser(name) {
    fetch(`/api/admin/users/${name}`, {
        method: 'DELETE'
    });
}

export async function toggleAdmin(name, admin) {
    await fetch('/api/users/user', {
		method: 'put',
		body: JSON.stringify({
            username: name,
            update: {$set: {isAdmin: admin}}}
        ),
		headers: { 'Content-type': 'application/json' }
	}).catch(err => console.log(err));
}