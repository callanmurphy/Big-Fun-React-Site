const express = require('express');
const path = require('path');

const gameRoutes = require('./games');

const clipath = path.join(__dirname, '..', 'client', 'build')
const app = express();

/*********************
 * Mongoose Setup
 *********************/
// mongoose and mongo connection
const { mongoose } = require('../db/mongoose')
mongoose.set('bufferCommands', false);  // don't buffer db requests if the db server isn't connected - minimizes http requests hanging if this is the case.

// import the mongoose models
const { Student } = require('../models/user')

// to validate object IDs
const { ObjectID } = require('mongodb')

// body-parser: middleware for parsing HTTP JSON body into a usable object
const bodyParser = require('body-parser') 
app.use(bodyParser.json())

/*** Helper functions below **********************************/
function isMongoError(error) { // checks for first error returned by promise rejection if Mongo database suddently disconnects
	return typeof error === 'object' && error !== null && error.name === "MongoNetworkError"
}


/*********************
 * These are the API routes
 */
app.use('/api/games', gameRoutes);


/*********************
 * This will serve the React app to any route that is not in the API above
 */
app.use(express.static(clipath))

app.get('*', (req, res) => {
    // TODO: maybe some route checking
	res.sendFile(path.join(clipath, 'index.html'))
});

const port = process.env.PORT || 5000
app.listen(port, () => {
	console.log(`Listening on port ${port}...`)
})