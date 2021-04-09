// referenced e4 code (restaurant.js)
// and https://mongoosejs.com/docs/guide.html

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
 * }]
 * ? isAdmin: bool         (maybe we should include this)
 */

const mongoose = require('mongoose');

const ChallengeSchema = new mongoose.Schema({
    /* gid: mongoose.Types.ObjectId, */
    rid: mongoose.Types.ObjectId,
    inviter: {type: Boolean, default: true},
    date: {type: Date, default: Date.now},
    confirmed: {type: Boolean, default: false},
    /* points: Number, */
})

const UserSchema = new mongoose.Schema({
    username: {type: String, unique: true},
    password: String,
    online: {type: Boolean, default: false},
    profilePic: {type: Number, default: 0},
    rivals: [mongoose.Types.ObjectId],
    status: {type: String, default: 'bumblefucking'},
    challenges: [ChallengeSchema],
    isAdmin: {type: Boolean, default: false},
    points: {type: Number, default: 0}
});

const User = mongoose.model('User', UserSchema);

module.exports = { User };
