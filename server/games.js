const express = require('express');
const router = express.Router();
const { Game } = require('../models/game');

router.get('/', (req, res) => {
    res.send('you\'ve hit the game API!');
});

router.post('/recordgame', (req, res) => {
    /**
     * gid: auto-incrementing id
     * name: str,
     * score: float,
     * date: timestamp,
     * user1, user2: int
     */
    console.log(`Recording match between ${req.body.user1} and ${req.body.user2}.`);
    try {
        const game = new Game({
            name: req.body.name,
            score: req.body.score,
            date: req.body.date,
            user1: req.body.user1,
            user2: req.body.user2
        });
        game.save();
        res.status(200).send();
    } catch (e) {
        console.log(e);
        if (isMongoError(error)) { // check for if mongo server suddenly dissconnected before this request.
			res.status(500).send('Internal server error')
		} else {
			res.status(400).send('Bad Request') // 400 for bad request gets sent to client.
		}
    }
});

router.get('/gameinfo/:name', async (req, res) => {
    /**
     * Returns a list of all games that this user is in
     */
    
     try {
        const username = req.params.name;
        console.log(`Getting games for user ${username}`);
        const games = await Game.find().or([
            {user1: username},
            {user2: username}
        ]).exec();
        res.send(games);
    } catch (e) {
        console.log(e);
        if (isMongoError(error)) { // check for if mongo server suddenly dissconnected before this request.
			res.status(500).send('Internal server error')
		} else {
			res.status(400).send('Bad Request') // 400 for bad request gets sent to client.
		}
    }
});




module.exports = router;