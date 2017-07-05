
const express = require('express');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
const morgan = require('morgan');
const bodyParser = require('body-parser');

const { Portfolio } = require('../schemas/portfolioSchema');
const { generateRandomUrl, validateFields, addPortfolioDataToFile } = require('../helpers');

const router = express.Router();
router.use(morgan('common'));
router.use(bodyParser.json());
router.use(express.static('src'));

// REMOVE IN PRODUCTION
router.get('/', (req, res) => {
  Portfolio
        .find()
        .then((portfolio) => {
          res.json(portfolio);
        })
        .catch((err) => {
          console.error(err);
        });
});

router.get('/:link', (req, res) => {
  Portfolio
        .find({ link: req.params.link })
        .select('-_id link name value')
        .then((item) => {
          res.send(addPortfolioDataToFile('/src/html/portfolioview.html', item));
        })
        .catch((err) => {
          console.error(err);
          res.status(404).json({ error: 'Not Found' });
        });
});

router.get('/:link/trade', (req, res) => {
  Portfolio
      .find({ link: req.params.link })
      .select('-_id link name value')
      .then((item) => {
        res.send(addPortfolioDataToFile('/src/html/trade.html', item));
      })
      .catch((err) => {
        console.error(err);
        res.status(404).json({ error: 'Not Found' });
      });
});

router.get('/:link/charts', (req, res) => {
  Portfolio
      .find({ link: req.params.link })
      .select('-_id link name value')
      .then((item) => {
        res.send(addPortfolioDataToFile('/src/html/chart.html', item));
      })
      .catch((err) => {
        console.error(err);
        res.status(404).json({ error: 'Not Found' });
      });
});

router.post('/', (req, res) => {
  const valid = validateFields(req.body,
    {
      name: String(),
      value: Number(),
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
          value: req.body.value,
        })
        .then((createdPortfolio) => {
            /*
            app should redirect to portfolio page
            */
          res.json(createdPortfolio.link);
        })
        .catch((err) => {
          console.error(err);
          res.status(500).json({ error: 'Something went wrong' });
        });
});

router.put('/:link', (req, res) => {
  Portfolio
        // new: true => returns the updated object
        .findOneAndUpdate(
        { link: req.params.link },
        { value: req.body.value },
        { new: true }
        )
        .then((updatedPortfolio) => {
          res.status(201).json(updatedPortfolio);
        });
});

module.exports = router;
