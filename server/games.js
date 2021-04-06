const express = require('express');
const router = express.Router();

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
    res.status(413);
});

router.get('/gameinfo', (req, res) => {
    /** gid: int
     * =>
     * name: str,
     * score: float,
     * date: timestamp,
     * user1, user2: int
     */
    res.status(413);
});




module.exports = router;