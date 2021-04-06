const express = require('express');
const session = require('express-session');
const path = require('path');

const adminRoutes = require('./admin');
const gameRoutes = require('./games');
const userRoutes = require('./users');

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
const { ObjectID } = require('mongodb');
const { env } = require('process');


/*********************
 * Middleware
 *********************/
//sessions
app.use(session({
    secret: process.env.COOKIE || 'csc309team05',
    cookie: {
        expires: 600000,
        httpOnly: true
	},
    saveUninitialized: false,
    resave: false,
}));


// bodyparser
app.use(express.json());

// sessions
const sessionChecker = (req, res, next) => {
	if (req.session.user) {
		res.redirect('/???'); // redirect to dashboard if logged in.
	} else {
		next(); // next() moves on to the route.
	}    
};

// mongo
const mongoChecker = (req, res, next) => {
	// check mongoose connection established.
	if (mongoose.connection.readyState != 1) {
		log('Issue with mongoose connection')
		res.status(500).send('Internal server error')
		return;
	} else {
		next()	
	}	
}


/*********************
 * These are the API routes
 * - parameters can be accessed by accessing req.body.<param>
 * - session information can be accessed by req.session.<param>
 */
app.use('/api/admin', adminRoutes);
app.use('/api/games', gameRoutes);
app.use('/api/users', userRoutes);


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