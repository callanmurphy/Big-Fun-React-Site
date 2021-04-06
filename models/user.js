/* User mongoose model */
const mongoose = require('mongoose')

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

const User = mongoose.model('User', {
	// id: {
	// 	type: Number,
	// 	required: true,
	// },
	username: {
		type: String,
		required: true,
	},
	password: {
		type: String,
		required: true,
	},
	online: {
		type: Boolean,
		required: true,
		default: false
	},
	profilePic: {
		type: Number,
		required: true,
		default: 0
	}
})

module.exports = { User }