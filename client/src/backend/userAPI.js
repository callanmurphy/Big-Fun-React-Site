const users = [
  {id: 0, name: 'admin', password: 'admin', online: false, profilePic: 0, rivals: [1,2,3,4], status: 'Offline', challenges: [{gid: 1, rid: 1, date: "2021-05-24T15:30", inviter: false, confirmed: false}, {gid: 0, rid: 2, date: "2021-05-24T16:30", inviter: true, confirmed: true}], points: 10},
  {id: 1, name: 'user', password: 'user', online: true, profilePic: 2, rivals: [0,2,4], status: 'Idle', challenges: [{gid: 1, rid: 0, date: "2021-05-24T15:30", inviter: true, confirmed: false}], points: 9},
  {id: 2, name: 'user2', password: 'user2', online: true, profilePic: 2, rivals: [0,1,4], status: 'Playing Follow the Dot', challenges: [{gid: 0,  rid: 0, date: "2021-05-24T16:30", inviter: false, confirmed: true}], points: 6},
  {id: 3, name: 'user3', password: 'user3', online: true, profilePic: 1, rivals: [0,4], status: 'Playing Pong', challenges: [], points: 5},
  {id: 4, name: 'user4', password: 'user4', online: false, profilePic: 2, rivals: [0,1,2,3], status: 'Offline', challenges: [], points: 20},
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
          alert("Could not get users");
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

// Gets the challenges 
export const getChallenges = (Challenges) => {
  const currUser = Challenges.state.currUser
  const rivalNames = []
  console.log(currUser)
  currUser.rivals.forEach(rid => {
    fetch(`/api/users/user/id/${rid}`)
    .then(res => {
        if (res.status === 200) {
            // return a promise that resolves with the JSON body
            return res.json();
        } else {
            alert("Could not get users");
        }
    })
    .then(rival => {
        rivalNames.push({id: rid, username: rival.username})
        //Challenges.setState({rivalName: rival.username})
        Challenges.setState({ rivalNames: rivalNames });
        console.log(rivalNames)
    })
    .catch(error => {
        console.log(error);
    });
  });

  const scheduled = []
  console.log(currUser.challenges)
  currUser.challenges.forEach(game => {
    fetch(`/api/users/user/id/${game.rid}`)
    .then(res => {
        if (res.status === 200) {
            // return a promise that resolves with the JSON body
            return res.json();
        } else {
            alert("Could not get users");
        }
    })
    .then(rival => {
        scheduled.push({rname: rival.username, date: game.date, inviter: game.inviter, confirmed: game.confirmed})
        scheduled.sort((a, b) => (new Date(a.date) < new Date(b.date)) ? 1 : -1)
        Challenges.setState({ scheduled: scheduled });
        console.log(scheduled)
    })
    .catch(error => {
        console.log(error);
    });
  });
 
};

// A function to send two Post requests with challenge objects
// One Inviter, one for Invitee
export const makeChallenge = (Component) => {
  // the URL for the request
  const currUser = Component.state.currUser
  const rivalName = Component.state.rivalName
  console.log(currUser._id.valueOf())
  const uid = currUser._id
  const rid = Component.state.rivalNames.filter(r => r.username === rivalName)[0].id
  const date = Component.state.scheduleDate

  // The data we are going to send in our request
  const inviterChallenge = {
    rid: rid, 
    date: date,
    inviter: true,
    confirmed: false
  }
  const inviteeChallenge = {
    rid: uid, 
    date: date,
    inviter: false,
    confirmed: false
  }

  // Create our request constructor with all the parameters we need
  const request1 = new Request(`/api/users/challenge/${uid}`, {
      method: "post",
      body: JSON.stringify(inviterChallenge),
      headers: { 'Content-type': 'application/json' }
  });

  const request2 = new Request(`/api/users/challenge/${rid}`, {
    method: "post",
    body: JSON.stringify(inviteeChallenge),
    headers: { 'Content-type': 'application/json' }
  });

  // Send the request with fetch()
  fetch(request1)
      .then(function (res) {
          // Handle response we get from the API.
          // Usually check the error codes to see what happened.
          if (res.status === 200) {
              // challenge was added successfully
              //alert("Challenge added succesfully")
          } else {
              // If server couldn't add the challenge, tell the user.
              //alert("Could not add challenge")
          }
      })
      .catch(error => {
          console.log(error);
      });

  fetch(request2)
      .then(function (res) {
          // Handle response we get from the API.
          // Usually check the error codes to see what happened.
          if (res.status === 200) {
              // challenge was added successfully
              //alert("Challenge added succesfully")
          } else {
              // If server couldn't add the challenge, tell the user.
              //alert("Could not add challenge")
              
          }
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

export async function updatePic(id, pic) {
  const result = await fetch('/api/users/user', {
    method: 'put',
    body: JSON.stringify({id: id, update: {$set: {profilePic: pic}}}),
    headers: { 'Content-type': 'application/json' }
  }).catch(err => console.log(err));
  console.log(result)
}

export async function setCustomPic(id, url) {
  const result = await fetch('/api/users/user', {
    method: 'put',
    body: JSON.stringify({id: id, update: {$set: {profilePic: -1}}}),
    headers: { 'Content-type': 'application/json' }
  }).catch(err => console.log(err));
  console.log(result)
  const result2 = await fetch('/api/users/user', {
    method: 'put',
    body: JSON.stringify({id: id, update: {$set: {customProfilePic: url}}}),
    headers: { 'Content-type': 'application/json' }
  }).catch(err => console.log(err));
  console.log(result2)
}
