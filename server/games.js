const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.send('you\'ve hit the game API!');
});

module.exports = router;