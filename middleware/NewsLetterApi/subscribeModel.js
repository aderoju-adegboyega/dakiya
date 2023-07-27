const mongoose = require('mongoose');

const subscribeSchema = new mongoose.Schema({
    email: String,
});

const Subscribe = mongoose.model('subscribeUsers', subscribeSchema);

module.exports = Subscribe;
