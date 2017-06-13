const mongoose = require('mongoose');

const portfolioSchema = mongoose.Schema({
    name: String,
    value: Number,
});

const Portfolio = mongoose.model('Portfolio', portfolioSchema);

module.exports = {Portfolio};
