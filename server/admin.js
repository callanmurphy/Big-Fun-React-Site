const express = require('express');
const router = express.Router();

const { ObjectID } = require('mongodb')
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
    res.send('you\'ve hit the admin API!');
});

router.get('/users', async (req, res) => {
    // check mongoose connection established.
	if (mongoose.connection.readyState != 1) {
		log('Issue with mongoose connection')
		res.status(500).send('Internal server error')
		return;
	} 

	// async-await
	try {
		const result = await User.find()
		res.send(result)
	}
	catch (error) {
		log(error)
		res.status(500).send("Internal Server Error")
	}
});

router.delete('/users', (req, res) => {
    /** List of all users in database
     * ???
     */
    res.status(413);
});


module.exports = router;