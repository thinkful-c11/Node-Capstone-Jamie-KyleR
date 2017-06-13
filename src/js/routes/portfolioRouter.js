'use strict';
const express = require('express');
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const morgan = require('morgan');
const bodyParser = require('body-parser');

const {Portfolio} = require('../schemas/portfolioSchema');
const {generateRandomUrl, validateFields} = require('../helpers');

const router = express.Router();
router.use(morgan('common'));
router.use(bodyParser.json());

router.get('/:portfolio', function(req, res) {
    Portfolio
        .findOne(req.params.portfolio)
        .then(function(item) {
            res.json(item);
        })
        .catch(function() {
            res.status(404).json({error: 'Not Found'});
        });
});

router.post('/', function(req, res) {
    validateFields();
    
    // randomUrl pulled out of scope to use 
    // in the redirect
    const portfolioUrl = generateRandomUrl();
    Portfolio
        .create({
            link: portfolioUrl,
            name: req.body.name,
            value: req.body.value
        })
        .then(function() {
            res.json({response: "created"});
        })
        .catch(function(err) {
            console.error(err);
            res.status(500).json({error: 'Something went wrong'});
        });
});

module.exports = router;