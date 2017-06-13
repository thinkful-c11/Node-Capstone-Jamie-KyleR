const mongoose = require('mongoose');

const portfolioSchema = mongoose.Schema({
    link: {type: String, required: true},
    name: {type: String, required: true},
    value: {type: Number, required: true},
});

const Portfolio = mongoose.model('Portfolio', portfolioSchema);

module.exports = {Portfolio};
