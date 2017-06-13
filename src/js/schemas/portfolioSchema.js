const mongoose = require('mongoose');

const portfolioSchema = mongoose.Schema({
    link: String,
    name: String,
    value: Number,
});

const Portfolio = mongoose.model('Portfolio', portfolioSchema);

module.exports = {Portfolio};
