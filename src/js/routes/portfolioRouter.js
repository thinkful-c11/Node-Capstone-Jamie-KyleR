'use strict';
const express = require('express');
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const morgan = require('morgan');
const bodyParser = require('body-parser');

const {Portfolio} = require('../schemas/portfolioSchema');
const {generateRandomUrl, validateFields} = require('../helpers');

export const router = express.Router();
router.use(morgan('common'));
router.use(bodyParser.json());

// REMOVE IN PRODUCTION
router.get('/', function(req, res) {
    Portfolio
        .find()
        .then(function(allPortfolios) {
            res.json(allPortfolios);
        })
        .catch(function(err) {
            console.error(err);
        });
});

router.get('/:link', function(req, res) {
    Portfolio
        .find({link: req.params.link})
        .then(function(item) {
            
            res.json(item);
        })
        .catch(function() {
            res.status(404).json({error: 'Not Found'});
        });
});

router.post('/', function(req, res) {
    const valid = validateFields(req.body,
        {
            'name': String(), 
            'value': Number()
        });
    
    if (valid.error) {
        return res.status(400).json({response: valid.error});
    }
    
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
            /*
            app should redirect to portfolio page
            */
            res.json({response: "created"});
        })
        .catch(function(err) {
            console.error(err);
            res.status(500).json({error: "Something went wrong"});
        });
});

router.put('/:link', function(req, res) {
    Portfolio
        // new: true => returns the updated object
        .findOneAndUpdate(
            {link: req.params.link}, 
            {value: req.body.value}, 
            {new: true}
        )
        .then(function(updatedPortfolio) {
            res.status(201).json(updatedPortfolio);
        });
});
