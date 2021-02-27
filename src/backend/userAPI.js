const users = [
  {id: 0, name: 'admin', password: 'admin', online: false},
  {id: 0, name: 'user1', password: 'user1', online: true},
  {id: 0, name: 'user2', password: 'user2', online: false},
  {id: 0, name: 'user3', password: 'user3', online: true},
  {id: 0, name: 'user4', password: 'user4', online: false},
]

export function getUser(id) {
  return users.filter( u => u.id === id)[0]
}

export function login(id, password) {
  return getUser(id).password === password
}

