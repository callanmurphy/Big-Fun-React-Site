const express = require('express');
const router = express.Router();

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


router.get('/', (req, res) => {
    res.send('you\'ve hit the user API!');
});

router.get('/user', (req, res) => {
    /** id: int =>
     * User
     */
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
app.get('/logout', (req, res) => {
	req.session.destroy((error) => {
		if (error) {
			res.status(500).send(error);
		} else {
			res.redirect('/');
		}
	})
})


module.exports = router;