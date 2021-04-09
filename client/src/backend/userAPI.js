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
}

export async function removeRival(id, rivalId) {
  // console.log("Connecting ", username, " and ", rivalUsername)
  const res = await fetch('/api/users/user', {
    method: 'put',
    body: JSON.stringify({id: id, update: {$pull: {rivals: rivalId}}}),
    headers: { 'Content-type': 'application/json' }
  }).catch(err => console.log(err));

  console.log(res)
}

export async function updateStatus(id, status) {
	const result = await fetch('/api/users/user', {
		method: 'put',
		body: JSON.stringify({id: id, update: {$set: {status: status}}}),
		headers: { 'Content-type': 'application/json' }
	}).catch(err => console.log(err));
}

export const getAllUsers = (component) => {
  fetch("/api/admin/users")
  .then(res => {
      if (res.status === 200) {
          // return a promise that resolves with the JSON body
          return res.json();
      } else {
          alert("Could not get students");
      }
  })
  .then(json => {
      // the resolved promise with the JSON body
      component.setState({ users: json.users });
  })
  .catch(error => {
      console.log(error);
  });
};


export async function clearRivals(id) {
  const user = await getUserById(id)
  for (let i = 0; i < user.rivals.length; i++) {
    removeRival(user.rivals[i], id)
  }
  const result = await fetch('/api/users/user', {
    method: 'put',
    body: JSON.stringify({id: id, update: {$set: {rivals: []}}}),
    headers: { 'Content-type': 'application/json' }
  }).catch(err => console.log(err));
}

export async function getUserById(id) {
  const res = await fetch(`/api/users/user/id/${id}`)
  return res.json();
}


export async function setOnline(id) {
  const result = await fetch('/api/users/user', {
    method: 'put',
    body: JSON.stringify({id: id, update: {$set: {online: true}}}),
    headers: { 'Content-type': 'application/json' }
  }).catch(err => console.log(err));
  console.log(result)
}

export async function setOffline(id) {
  const result = await fetch('/api/users/user', {
    method: 'put',
    body: JSON.stringify({id: id, update: {$set: {online: false}}}),
    headers: { 'Content-type': 'application/json' }
  }).catch(err => console.log(err));
  console.log(result)

  updateStatus(id, "Offline")
}

export async function deleteUserById(id) {
  const result = await fetch('/api/users/user', {
    method: 'delete',
    body: JSON.stringify({id: id}),
    headers: { 'Content-type': 'application/json' }
  }).catch(err => console.log(err));
  console.log(result)
}
