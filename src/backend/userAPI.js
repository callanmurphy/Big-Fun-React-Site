const users = [
  {id: 0, name: 'admin', password: 'admin', online: false, profilePic: 0, rivals: [2,3,4], status: 'Offline', rivalGames: [{rid: 1, date: "2021-05-24T15:30"}, {rid: 2, date: "2021-05-24T16:30"}]},
  {id: 1, name: 'user', password: 'user', online: true, profilePic: 2, rivals: [0,2,4], status: 'Idle', rivalGames: [{rid: 0, date: "2021-05-24T15:30"}]},
  {id: 2, name: 'user2', password: 'user2', online: true, profilePic: 2, rivals: [0,1,4], status: 'Playing Follow the Dot', rivalGames: [{rid: 0, date: "2021-05-24T16:30"}]},
  {id: 3, name: 'user3', password: 'user3', online: true, profilePic: 1, rivals: [0,4], status: 'Playing Pong', rivalGames: []},
  {id: 4, name: 'user4', password: 'user4', online: false, profilePic: 2, rivals: [0,1,2,3], status: 'Offline', rivalGames: []},
]
export { users };

export function getUser(id) {
  return users.filter( u => u.id === id)[0]
}

export function login(uname, password) {
  return users.filter(u => (u.name === uname) && (u.password === password)).length > 0;
}

export function getUserByName(name) {
  return users.filter(u => (u.name === name))[0]
}