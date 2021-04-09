import { login, getUser, getUserByName, createUser, getAllUsers, getChallenges } from './userAPI';
import {
    gameHistory,
    gameInfo,
    vsGames,
    getBestRival,
    getFavoriteGame,
} from './gameAPI';
import {
    getUsers,
    delUser
} from './adminAPI';

/** How to communicate with the server
 * const req = new Request(url, {
 *      method: 'get/post/delete/put/...',
 *      body: Json.stringify({...}),
 *      headers: {
 *           'Accept': 'application/json, text/plain, * /*',
 *           'Content-Type': 'application/json'
 *      }
 * })
 * will be a promise (.then().catch() and await)
 */


export { login, getUser, getUserByName, createUser, getAllUsers, getChallenges };
export {
    gameHistory,
    gameInfo,
    vsGames,
    getBestRival,
    getFavoriteGame
};
export {
    getUsers,
    delUser
}