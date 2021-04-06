const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.send('you\'ve hit the admin API!');
});

router.get('/users', (req, res) => {
    /** List of all users in database
     * ???
     */
    res.status(413);
});

router.delete('/users', (req, res) => {
    /** List of all users in database
     * ???
     */
    res.status(413);
});


module.exports = router;