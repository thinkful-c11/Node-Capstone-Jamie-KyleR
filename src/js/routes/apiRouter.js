
const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const fetch = require('node-fetch');

const router = express.Router();
router.use(morgan('common'));
router.use(bodyParser.json());

const { API_KEY } = process.env;

const barchartUrl = 'https://marketdata.websol.barchart.com/getQuote.json'
                    + `?key=${API_KEY}&mode=i&symbols=`;

router.get('/', (req, res) => {
  fetch(barchartUrl + req.query.symbol)
    .then(temp => temp.json())
    .then(data => res.json(data));
});

module.exports = router;
