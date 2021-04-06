// referenced e4 code (restaurant.js)

const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username: String,
    password: Number
});

const RestaurantSchema = new mongoose.Schema({
    name: String,
    description: String,
    reservations: [ReservationSchema]
});

const User = mongoose.model('User', UserSchema);

module.exports = { User };
