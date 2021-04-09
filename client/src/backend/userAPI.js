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

export function addRival(username, rivalUsername) {
	fetch('/api/users/user', {
		method: 'put',
		body: JSON.stringify({username: username, update: {$push: {rivals: rivalUsername}}}),
		headers: { 'Content-type': 'application/json' }
	}).catch(err => console.log(err));
}

export function updateStatus(username, status) {
	fetch('/api/users/user', {
		method: 'put',
		body: JSON.stringify({username: username, update: {$set: {status: status}}}),
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
