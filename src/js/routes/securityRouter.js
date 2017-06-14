'use strict';
const express = require('express');
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const morgan = require('morgan');
const bodyParser = require('body-parser');

const {Security} = require('../schemas/securitySchema');
const {generateRandomUrl, validateFields} = require('../helpers');

export const router = express.Router();
router.use(morgan('common'));
router.use(bodyParser.json());

//REMOVE IN PRODUCTION
router.get('/', function(req, res) {
    Security
        .find()
        .then(function(allSecurities) {
            res.json(allSecurities);
        })
        .catch(function(err) {
            console.error(err);
        });
});

router.get('/:id', function(req, res) {
    Security
        .find({id: req.params.id})
        .then(function(item) {
            res.json(item);
        })
        .catch(function() {
            res.status(404).json({error: 'Not Found'});
        });
});

router.post('/:id', function(req, res) {
    const valid = validateFields(
        {
                'symbol': String(),
                'name': String(),
                'initialPrice': String(),
                'numShare': Number()
        }, 
        req.body);
    
    if (valid.error) {
        return res.status(400).json({response: valid.error});
    }

    Security
        .create({
            symbol: req.body.symbol,
            name: req.body.name,
            initialPrice: req.body.initialPrice,
            currentPrice: req.body.initialPrice,
            numShare: req.body.numShare
        })
        .then(function(item) {
            res.json(item);
        })
        .catch(function(err) {
            console.error(err);
            res.status(500).json({error: "Something went wrong"});
        });
});

router.put('/:id', function(req, res) {
    Security
        // new: true => returns the updated object
        .findOneAndUpdate(
            {link: req.params.id}, 
            {$set : {
                symbol: req.body.symbol,
                name: req.body.name,
                currentPrice: req.body.currentPrice,
                numShare: req.body.numShare
                }
            },
            {new: true}
        )
        .then(function(updatedSecurity) {
            res.status(201).json(updatedSecurity);
        });
});

router.delete('/:id', function(req, res) {
    Security
        .findByIdAndRemove(req.params.id)
        .exec()
        .then(() => {
          console.log(`Deleted security with id ${req.params.ID}`);
          res.status(204).end();
        });
});

