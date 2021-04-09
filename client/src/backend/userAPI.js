const users = [
  {id: 0, name: 'admin', password: 'admin', online: false, profilePic: 0, rivals: [1,2,3,4], status: 'Offline', rivalGames: [{gid: 1, rid: 1, date: "2021-05-24T15:30", inviter: false, confirmed: false}, {gid: 0, rid: 2, date: "2021-05-24T16:30", inviter: true, confirmed: true}], points: 10},
  {id: 1, name: 'user', password: 'user', online: true, profilePic: 2, rivals: [0,2,4], status: 'Idle', rivalGames: [{gid: 1, rid: 0, date: "2021-05-24T15:30", inviter: true, confirmed: false}], points: 9},
  {id: 2, name: 'user2', password: 'user2', online: true, profilePic: 2, rivals: [0,1,4], status: 'Playing Follow the Dot', rivalGames: [{gid: 0,  rid: 0, date: "2021-05-24T16:30", inviter: false, confirmed: true}], points: 6},
  {id: 3, name: 'user3', password: 'user3', online: true, profilePic: 1, rivals: [0,4], status: 'Playing Pong', rivalGames: [], points: 5},
  {id: 4, name: 'user4', password: 'user4', online: false, profilePic: 2, rivals: [0,1,2,3], status: 'Offline', rivalGames: [], points: 20},
]

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
