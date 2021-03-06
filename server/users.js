const express = require('express');
const router = express.Router();

// used lecture code from mongodb_express_ajax.zip

/** User
 * id: int                    (can we just use the name?)
 * name: str
 * password: str
 * online: bool
 * profilePiv: int
 * rivals: List[id: int]
 * status: str                (customizable?)
 * challenges: List[{
 *      gid: int -> game id
 *      rid: int -> user id
 *      date: timestamp
 *      inviter: bool
 *      confirmed: bool
 *      points: int           (what is this for?)
 *    ? isAdmin: bool         (maybe we should include this)
 * }]
 */

const { ObjectID } = require('mongodb')
const { mongoose } = require('../db/mongoose')
mongoose.set('bufferCommands', false);  // don't buffer db requests if the db server isn't connected - minimizes http requests hanging if this is the case.
mongoose.set('useFindAndModify', false);

// import the mongoose models
const { User } = require('../models/user')

// mongo error handling
function isMongoError(error) { // checks for first error returned by promise rejection if Mongo database suddently disconnects
	return typeof error === 'object' && error !== null && error.name === "MongoNetworkError"
}

/**********************************/
/**********************************/


router.get('/', (req, res) => {
    res.send('you\'ve hit the user API!');
});

router.get('/user/:name', async (req, res) => {
    /** id: int =>
     * User
     */
    
    try {
        const username = req.params.name;
        console.log(`Getting user with username ${username}`);
        const user = await User.findOne({username: username}).exec();
        res.send(user);
    } catch (e) {
        console.log(e);
        if (isMongoError(e)) { // check for if mongo server suddenly dissconnected before this request.
			res.status(500).send('Internal server error')
		} else {
			res.status(400).send('Bad Request') // 400 for bad request gets sent to client.
		}
    }
});

router.get('/user/id/:id', async (req, res) => {
    /** id: int =>
     * User
     */
    
    try {
        const id = req.params.id;
        console.log(`Getting user with id ${id}`)
        const user = await User.findOne({_id: id})
        res.send(user)
    } catch (e) {
        console.log(e);
        if (isMongoError(e)) { // check for if mongo server suddenly dissconnected before this request.
            res.status(500).send('Internal server error')
        } else {
            res.status(400).send('Bad Request') // 400 for bad request gets sent to client.
        }
    }
});

router.get('/user', async (req, res) => {
    /** req body contains id
     */
    
    try {
        const username = req.params.name;
        console.log(`Getting user with username ${username}`);
        const exists = await User.find({_id: username});
        res.send(exists);
    } catch (e) {
        console.log(e);
        if (isMongoError(error)) { // check for if mongo server suddenly dissconnected before this request.
            res.status(500).send('Internal server error')
        } else {
            res.status(400).send('Bad Request') // 400 for bad request gets sent to client.
        }
    }
});

// Route for getting information for one user by id.
/* router.get('/user/:id', async (req, res) => {

	const id = req.params.id
	// Good practise: Validate id immediately.
	if (!ObjectID.isValid(id)) {
		res.status(404).send()  // if invalid id, definitely can't find resource, 404.
		return;  // so that we don't run the rest of the handler.
	}

	// check mongoose connection established.
	if (mongoose.connection.readyState != 1) {
		log('Issue with mongoose connection')
		res.status(500).send('Internal server error')
		return;
	}

	try {
		const result = await User.findById(id)
		if (!result) {
			res.status(404).send('Resource not found')  // could not find this user
		} else {
			/// sometimes we wrap returned object in another object:
			//res.send({user})   
			res.send(result)
		}

	}
	catch (error) {
		log(error)
		res.status(500).send('Internal Server Error')  // server error
	}

}) */

router.post('/user', async (req, res) => {
    // req.body should have username and password

    // check mongoose connection established
	if (mongoose.connection.readyState != 1) {
		console.log('Issue with mongoose connection')
		res.status(500).send('Internal server error')
		return;
	}  

    // create user
    console.log(`Attempting to create user with username ${req.body.username} and password ${req.body.password}.`)
    const user = new User({
		username: req.body.username,
		password: req.body.password
	})

    // save user + error checking
    try {
		const result = await user.save()	
		res.send(result)
	} catch(error) {
		console.log(error) // log server error to the console, not to the client.
		if (isMongoError(error)) { // check for if mongo server suddenly dissconnected before this request.
			res.status(500).send('Internal server error')
		} else {
			res.status(400).send('Bad Request') // 400 for bad request gets sent to client.
		}
	}

    res.status(413);
});

router.put('/user', async (req, res) => {
    // req.body should have id and update

    // check mongoose connection established
    if (mongoose.connection.readyState != 1) {
        console.log('Issue with mongoose connection')
        res.status(500).send('Internal server error')
        return;
    }  

    // update user
    console.log(`Attempting to update user with ${req.body.id ? 'id' : 'username'} ${req.body.id || req.body.username}.`)

    console.log(req.body)

    // save user + error checking
    try {
        // let rival = await User.findOne({username: req.body.update})
        if (req.body.id) {
            await User.findOneAndUpdate({_id: req.body.id}, req.body.update)
            res.send(true)            
        } else {
            await User.findOneAndUpdate({username: req.body.username}, req.body.update)
            res.send(true)
        }
    } catch(error) {
        console.log(error) // log server error to the console, not to the client.
        if (isMongoError(error)) { // check for if mongo server suddenly dissconnected before this request.
            res.status(500).send('Internal server error')
        } else {
            res.status(400).send('Bad Request') // 400 for bad request gets sent to client.
        }
    }

    res.status(413);
});

router.get('/user', async (req, res) => {
    // req.body should have id

    // check mongoose connection established
    if (mongoose.connection.readyState != 1) {
        console.log('Issue with mongoose connection')
        res.status(500).send('Internal server error')
        return;
    }  

    // update user
    console.log(`Attempting to update user with id ${req.body.id}.`)

    console.log(req.body)

    // save user + error checking
    try {
        let user = await User.findOne({_id: req.body.id})
        res.send(user)
    } catch(error) {
        console.log(error) // log server error to the console, not to the client.
        if (isMongoError(error)) { // check for if mongo server suddenly dissconnected before this request.
            res.status(500).send('Internal server error')
        } else {
            res.status(400).send('Bad Request') // 400 for bad request gets sent to client.
        }
    }

    res.status(413);
});

router.post('/login', async (req, res) => {
    /** uname, pass =>
     * statuscode
     */ 
    try {
        const username = req.body.username;
        const password = req.body.password;
        console.log(`Logging in with ${req.body.username}:${password}`);
        const user = await User.findOne({username: req.body.username}).exec();
        if ((user.username === username) && (user.password === password)) {
            req.session.username = username;
            req.session.user = user;
            res.send(user);
        } else {
            res.status(400);
        }
    } catch (e) {
        console.log(e);
        if (isMongoError(e)) { // check for if mongo server suddenly dissconnected before this request.
			res.status(500).send('Internal server error')
		} else {
			res.status(400).send('Bad Request') // 400 for bad request gets sent to client.
		}
    }
});

// A route to logout a user
router.get('/logout', (req, res) => {
	req.session.destroy((error) => {
		if (error) {
			res.status(500).send(error);
		} else {
			res.redirect('/');
		}
	})
});

/// Route for adding challenge to a particular user.
/* 
Request body expects:
{
    rid: <id of rival>, 
    date: <deadline of challenge>,
    inviter: <boolean if this user is the inviter>,
    confirmed: <boolean if this challenge has been confirmed>
}
*/
// POST /challenge/id
router.post('/challenge/:id', async (req, res) => {
	// Add code here

	const id = req.params.id
	// Good practise: Validate id immediately.
	if (!ObjectID.isValid(id)) {
		res.status(404).send()  // if invalid id, definitely can't find resource, 404.
		return;  // so that we don't run the rest of the handler.
	}

	// check mongoose connection established.
	if (mongoose.connection.readyState != 1) {
		log('Issue with mongoose connection')
		res.status(500).send('Internal server error')
		return;
	}  

	// Save user to the database
	// async-await version:
	try {
		const user = await User.findById(id)
		if (!user) {
			res.status(404).send('Resource not found')  // could not find this student
		} 
		else {
			const challenge = user.challenges.create({
				rid: req.body.rid,
				date: req.body.date,
                inviter: req.body.inviter,
                confirmed: req.body.confirmed
			});
			user.challenges.push(challenge)
            user.challenges.sort(function(a, b) {return new Date(a.date) - new Date(b.date)})
	
			const result = await user.save()
			res.send(result)
		}
    } catch(error) {
        console.log(error) // log server error to the console, not to the client.
        if (isMongoError(error)) { // check for if mongo server suddenly dissconnected before this request.
            res.status(500).send('Internal server error')
        } else {
            res.status(400).send('Bad Request') // 400 for bad request gets sent to client.
        }
    }
});

// A route to forfeit a challenge
router.delete('/challenge/:id/:cid', async (req, res) => {
    	// Add code here
	const id = req.params.id
	const cid = req.params.cid

	// Good practise: Validate id immediately.
	if (!ObjectID.isValid(id) || !ObjectID.isValid(cid)) {
		res.status(404).send()  // if invalid id, definitely can't find resource, 404.
		return;  // so that we don't run the rest of the handler.
	}

	// check mongoose connection established.
	if (mongoose.connection.readyState != 1) {
		log('Issue with mongoose connection')
		res.status(500).send('Internal server error')
		return;
	}

	// If id and resv_id are valid, findById
	try {
		const user = await User.findById(id)
		if (!user) {
			res.status(404).send('Resource not found')  // could not find this student
		} else {
			const challenge = user.challenges.id(cid).remove()
            user.challenges.sort(function(a, b) {return new Date(a.date) - new Date(b.date)})
			const result = await user.save()
			res.send({"challenge" : challenge, "user": result})
		}
	} catch(error) {
		log(error)
		res.status(500).send('Internal Server Error')  // server error
	}
});

router.patch('/challenge/:id/:cid', async (req, res) => {
	// Add code here

	const id = req.params.id
	const resv_id = req.params.resv_id

	// Good practise: Validate id immediately.
	if (!ObjectID.isValid(id) || !ObjectID.isValid(resv_id)) {
		res.status(404).send()  // if invalid id, definitely can't find resource, 404.
		return;  // so that we don't run the rest of the handler.
	}

	// check mongoose connection established.
	if (mongoose.connection.readyState != 1) {
		log('Issue with mongoose connection')
		res.status(500).send('Internal server error')
		return;
	}

	// If id and cid are valid, findById
	try {
		const user = await User.findById(id)
		if (!user) {
			res.status(404).send('Resource not found')  // could not find this student
		} else {
			const challenge = user.challenges.id(cid)
			/* challenge.time = req.body.time
			reservation.people = req.body.people */
			const result = await user.save()
			res.send({"challenge" : challenge, "user": user})
		}
	} catch(error) {
		log(error)
		if (typeof error === 'object' && error !== null && error.name === "MongoNetworkError") { // check for if mongo server suddenly dissconnected before this request.
			res.status(500).send('Internal server error')
		} else {
			res.status(400).send('Bad Request') // 400 for bad request gets sent to client.
		}
	}

})

// A route to delete a user
router.delete('/user', async (req, res) => {
    /** req body contains id
     */
    
    try {
        const id = req.body.id;
        console.log(`Deleting user with id ${id}`);
        const del = await User.deleteOne({_id: id});
        res.send(del);
    } catch (e) {
        console.log(e);
        if (isMongoError(error)) { // check for if mongo server suddenly dissconnected before this request.
            res.status(500).send('Internal server error')
        } else {
            res.status(400).send('Bad Request') // 400 for bad request gets sent to client.
        }
    }
})


module.exports = router;