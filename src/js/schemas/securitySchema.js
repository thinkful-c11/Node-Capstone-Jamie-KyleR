const mongoose = require('mongoose');

const securitySchema = mongoose.Schema({
    symbol: String,
    name: String,
    initialPrice: Number,
    currentPrice: Number,
    numShare: Number
});

const Security = mongoose.model('Security', securitySchema);

module.exports = {Security};