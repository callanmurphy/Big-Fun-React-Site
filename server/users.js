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
const { User } = require('../models/user')

// to validate object IDs
const { ObjectID } = require('mongodb');
const { env } = require('process');

// mongo error handling
function isMongoError(error) { // checks for first error returned by promise rejection if Mongo database suddently disconnects
	return typeof error === 'object' && error !== null && error.name === "MongoNetworkError"
}

/**********************************/
/**********************************/


router.get('/', (req, res) => {
    res.send('you\'ve hit the user API!');
});

router.get('/user', (req, res) => {
    /** id: int =>
     * User
     */
    res.status(413);
});

router.post('/user', async (req, res) => {
    // req.body should have username and password

    // check mongoose connection established
	if (mongoose.connection.readyState != 1) {
		log('Issue with mongoose connection')
		res.status(500).send('Internal server error')
		return;
	}  

    // create user
    const user = new User({
		username: req.body.username,
		password: req.body.password
	})

    // save user + error checking
    try {
		const result = await user.save()	
		res.send(result)
	} catch(error) {
		log(error) // log server error to the console, not to the client.
		if (isMongoError(error)) { // check for if mongo server suddenly dissconnected before this request.
			res.status(500).send('Internal server error')
		} else {
			res.status(400).send('Bad Request') // 400 for bad request gets sent to client.
		}
	}

    res.status(413);
});

router.get('/userbyname', (req, res) => {
    /** uname: str =>
     * User
     */
    res.status(413);
});

router.post('/login', (req, res) => {
    /** uname, pass =>
     * statuscode
     */ 
    const uname = req.body.uname;
    const pass = req.body.password;
    // TODO: authenticate
    const auth = true;
    if (auth) {
        res.redirect('/progress');
        req.session.uname = uname;
    } else {
        res.redirect('/login');
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