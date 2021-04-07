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
 * rivalGames: List[{
 *      gid: int -> game id
 *      rid: int -> user id
 *      date: timestamp
 *      inviter: bool
 *      confirmed: bool
 *      points: int           (what is this for?)
 *    ? isAdmin: bool         (maybe we should include this)
 * }]
 */


const { mongoose } = require('../db/mongoose')
mongoose.set('bufferCommands', false);  // don't buffer db requests if the db server isn't connected - minimizes http requests hanging if this is the case.

// import the mongoose models
const { User } = require('../models/usere4')

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
        if (isMongoError(error)) { // check for if mongo server suddenly dissconnected before this request.
			res.status(500).send('Internal server error')
		} else {
			res.status(400).send('Bad Request') // 400 for bad request gets sent to client.
		}
    }
});

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
})


module.exports = router;