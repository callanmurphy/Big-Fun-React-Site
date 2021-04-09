const express = require('express');
const router = express.Router();

// used lecture code from mongodb_express_ajax.zip

// const PicSchema = new mongoose.Schema({
//     name: String,
//     desc: String,
//     img:
//     {
//         data: Buffer,
//         contentType: String
//     }
// });


const { mongoose } = require('../db/mongoose')
mongoose.set('bufferCommands', false);  // don't buffer db requests if the db server isn't connected - minimizes http requests hanging if this is the case.

// import the mongoose models
const { picModel } = require('../models/pic')

// mongo error handling
function isMongoError(error) { // checks for first error returned by promise rejection if Mongo database suddently disconnects
	return typeof error === 'object' && error !== null && error.name === "MongoNetworkError"
}

/**********************************/
// https://www.geeksforgeeks.org/upload-and-retrieve-image-on-mongodb-using-mongoose/
// The Multer documentation is terrible
/**********************************/

const multer = require('multer')

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'ProfilePictures')
    },
    filename: (req, file, cb) => {
        cb(null, file.filename + '-' + Date.now())
    }
})

const upload = multer({storage: storage})


/**********************************/
/**********************************/

router.get('/', (req, res) => {
    res.send('you\'ve hit the pic API!');
    // picModel.find({}, (e, items) => {
    //     if (error) {
    //         console.log(e);
    //         res.status(500).send('Picture Error')
    //     } else {
    //         res.render('')
    //     }
    // })
});

router.get('/pic/:number', async (req, res) => {
    /** id: int =>
     * User
     */
    
    try {
        const picNumber = req.params.number;
        console.log(`Getting user with picNumber ${picNumber}`);
        const pic = await Pic.findOne({picNumber: picNumber}).exec();
        res.send(pic);
    } catch (e) {
        console.log(e);
        if (isMongoError(error)) { // check for if mongo server suddenly dissconnected before this request.
			res.status(500).send('Internal server error')
		} else {
			res.status(400).send('Bad Request') // 400 for bad request gets sent to client.
		}
    }
});

router.post('/pic', upload.single('image'), async (req, res, next) => {
    // req.body should have name, desc, number, and image {data, contentType}

    // check mongoose connection established
	if (mongoose.connection.readyState != 1) {
		console.log('Issue with mongoose connection')
		res.status(500).send('Internal server error')
		return;
	}  

    // create user
    console.log(`Attempting to create pic with name ${req.body.name} and desc ${req.body.desc}.`)
    const pic = new Pic({
		name: req.body.name,
		desc: req.body.desc,
        img: {
            data: fs.readFileSynce(path.join(__dirname + '/ProfilePictures/' + req.file.filename)),
            contentType: 'image/png'
        }
	})

    // save user + error checking
    try {
		const result = await pic.save()	
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