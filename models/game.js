// referenced e4 code (restaurant.js)
// and https://mongoosejs.com/docs/guide.html

/**
 * name: String
 * score: Number
 * date: Date
 * user1: ObjectID
 * user2: ObjectID
 */

const mongoose = require('mongoose');

const GameSchema = new mongoose.Schema({
    name: {type: String, required: true},
    score: {type: Number, required: true},
    date: {type: Date, default: Date.now},
    user1: {type: String, required: true},
    user2: {type: String, required: false},
});

const Game = mongoose.model('Game', GameSchema);
 
module.exports = { Game };
 