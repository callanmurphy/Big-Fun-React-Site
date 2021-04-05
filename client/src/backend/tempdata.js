const users = [
  {id: 0, name: 'admin', password: 'admin', online: false, profilePic: 0, rivals: [1,2,3,4], status: 'Offline', rivalGames: [{gid: 1, rid: 1, date: "2021-05-24T15:30", inviter: false, confirmed: false}, {gid: 0, rid: 2, date: "2021-05-24T16:30", inviter: true, confirmed: true}], points: 10},
  {id: 1, name: 'user', password: 'user', online: true, profilePic: 2, rivals: [0,2,4], status: 'Idle', rivalGames: [{gid: 1, rid: 0, date: "2021-05-24T15:30", inviter: true, confirmed: false}], points: 9},
  {id: 2, name: 'user2', password: 'user2', online: true, profilePic: 2, rivals: [0,1,4], status: 'Playing Follow the Dot', rivalGames: [{gid: 0,  rid: 0, date: "2021-05-24T16:30", inviter: false, confirmed: true}], points: 6},
  {id: 3, name: 'user3', password: 'user3', online: true, profilePic: 1, rivals: [0,4], status: 'Playing Pong', rivalGames: [], points: 5},
  {id: 4, name: 'user4', password: 'user4', online: false, profilePic: 2, rivals: [0,1,2,3], status: 'Offline', rivalGames: [], points: 20},
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


export { users, games };