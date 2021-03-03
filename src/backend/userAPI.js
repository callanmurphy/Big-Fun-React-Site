const users = [
  {id: 0, name: 'admin', password: 'admin', online: false, profilePic: 0, rivals: [1,2,3,4], status: 'Offline'},
  {id: 1, name: 'user', password: 'user', online: true, profilePic: 2, rivals: [0,2,4], status: 'Idle'},
  {id: 1, name: 'user1', password: 'user1', online: true, profilePic: 2, rivals: [0,2,4], status: 'Idle'},
  {id: 2, name: 'user2', password: 'user2', online: false, profilePic: 2, rivals: [0,1,4], status: 'Offline'},
  {id: 3, name: 'user3', password: 'user3', online: true, profilePic: 1, rivals: [0,4], status: 'Game 3'},
  {id: 4, name: 'user4', password: 'user4', online: false, profilePic: 2, rivals: [0,1,2,3], status: 'Offline'},
]

export function getUser(id) {
  return users.filter( u => u.id === id)[0]
}

export function login(uname, password) {
  return users.filter(u => (u.name === uname) && (u.password === password)).length > 0;
}

