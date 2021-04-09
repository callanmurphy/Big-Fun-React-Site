import { users } from './tempdata';

export function getUser(id) {
  return users.filter( u => u._id === id)[0]
}

export async function login(uname, password) {
  const res = await fetch('/api/users/login', {
    method: 'post',
    body: JSON.stringify({username: uname, password: password}),
    headers: { 'Content-type': 'application/json' }
  })

  return res.status === 200;
}

export async function getUserByName(name) {
  const res = await fetch(`/api/users/user/${name}`)
  return res.json();
}

export function createUser(username, password) {
  fetch('/api/users/user', {
    method: 'post',
    body: JSON.stringify({username: username, password: password}),
    headers: { 'Content-type': 'application/json' }
  }).catch(err => console.log(err));
}

export async function addRival(id, rivalId) {
  // console.log("Connecting ", username, " and ", rivalUsername)
	const res = await fetch('/api/users/user', {
		method: 'put',
		body: JSON.stringify({id: id, update: {$push: {rivals: rivalId}}}),
		headers: { 'Content-type': 'application/json' }
	}).catch(err => console.log(err));

  console.log(res)
  // fetch('/api/users/user', {
  //   method: 'put',
  //   body: JSON.stringify({username: rivalUsername, update: {$push: {rivals: username}}}),
  //   headers: { 'Content-type': 'application/json' }
  // }).catch(err => console.log(err));
}

export async function updateStatus(id, status) {
	const result = await fetch('/api/users/user', {
		method: 'put',
		body: JSON.stringify({id: id, update: {$set: {status: status}}}),
		headers: { 'Content-type': 'application/json' }
	}).catch(err => console.log(err));
  console.log(result)
}

export async function clearRivals(id) {
  const result = await fetch('/api/users/user', {
    method: 'put',
    body: JSON.stringify({id: id, update: {$set: {rivals: []}}}),
    headers: { 'Content-type': 'application/json' }
  }).catch(err => console.log(err));
  console.log(result)
}

export async function getUserById(id) {
  const res = await fetch(`/api/users/user/id/${id}`)
  return res.json();
}