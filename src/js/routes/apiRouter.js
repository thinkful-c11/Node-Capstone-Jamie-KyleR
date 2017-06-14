'use strict';
const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const https = require('https');

const router = express.Router();
router.use(morgan('common'));
router.use(bodyParser.json());

const {API_KEY} = process.env; 

const barchartURl = 'https://marketdata.websol.barchart.com/getQuote.json';

router.get('/', function(req, res) {
    const options = {
        api_key: API_KEY,
        mode: 'i',
        symbols: req.body.symbol
    };
    
    https.get(barchartURl, options, function(apiData) {
        console.log(apiData);
        res.json(apiData);
    });
});

module.exports = router;