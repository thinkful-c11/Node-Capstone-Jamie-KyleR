'use strict';
const express = require('express');
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const morgan = require('morgan');
const bodyParser = require('body-parser');
const fs = require('fs');

const { Portfolio } = require('../schemas/portfolioSchema');
const { generateRandomUrl, validateFields } = require('../helpers');

const router = express.Router();
router.use(morgan('common'));
router.use(bodyParser.json());
router.use(express.static('src'));

const dirname = __dirname.split('/').slice(0, -3).join('/');

// REMOVE IN PRODUCTION
router.get('/', function (req, res) {
  Portfolio
        .find()
        .then(function (portfolio) {
          res.json(portfolio);
        })
        .catch(function (err) {
          console.error(err);
        });
});

router.get('/:link', function (req, res) {
  Portfolio
        .find({ link: req.params.link })
        .select('-_id link name value')
        .then(function (item) {
          const data = fs.readFileSync(dirname + '/src/html/portfolioview.html', 'utf-8');
          console.log('Type of data from file read: ', typeof data);
          const script = `<script>const portfolio = ${item}</script>`;
          // console.log('this is before the replace', res);
          res.send(data.replace('<replace></replace>', script));
        })
        .catch(function (err) {
          console.error(err);
          res.status(404).json({ error: 'Not Found' });
        });
});


router.post('/', function (req, res) {
  const valid = validateFields(req.body,
    {
      'name': String(),
      'value': Number()
    });
  console.log('this is our body', req.body);
  if (valid.error) {
    console.error(valid.error);
    return res.status(400).json({ response: valid.error });
  }


  Portfolio
        .create({
          link: generateRandomUrl(),
          name: req.body.name,
          value: req.body.value
        })
        .then(function (createdPortfolio) {
            /*
            app should redirect to portfolio page
            */
          res.json(createdPortfolio.link);
        })
        .catch(function (err) {
          console.error(err);
          res.status(500).json({ error: 'Something went wrong' });
        });
});

router.put('/:link', function (req, res) {
  Portfolio
        // new: true => returns the updated object
        .findOneAndUpdate(
        { link: req.params.link },
        { value: req.body.value },
        { new: true }
        )
        .then(function (updatedPortfolio) {
          res.status(201).json(updatedPortfolio);
        });
});

module.exports = router;