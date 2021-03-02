const users = [
  {id: 0, name: 'admin', password: 'admin', online: false, profilePic: 0, rivals: ['user1', 'user2', 'user3', 'user4']},
  {id: 0, name: 'user1', password: 'user1', online: true, profilePic: 2, rivals: ['admin', 'user2', 'user4']},
  {id: 0, name: 'user2', password: 'user2', online: false, profilePic: 2, rivals: ['admin', 'user1', 'user4']},
  {id: 0, name: 'user3', password: 'user3', online: true, profilePic: 1, rivals: ['admin', 'user4']},
  {id: 0, name: 'user4', password: 'user4', online: false, profilePic: 2, rivals: ['admin', 'user1', 'user2', 'user3']},
]

export function getUser(id) {
  return users.filter( u => u.id === id)[0]
}

export function login(id, password) {
  return getUser(id).password === password
}

