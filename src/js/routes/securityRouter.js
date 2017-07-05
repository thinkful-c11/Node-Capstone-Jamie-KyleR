
const express = require('express');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
const morgan = require('morgan');
const bodyParser = require('body-parser');

const { Security } = require('../schemas/securitySchema');
const { validateFields } = require('../helpers');

const router = express.Router();
router.use(morgan('common'));
router.use(bodyParser.json());

// REMOVE IN PRODUCTION
router.get('/', (req, res) => {
  Security
        .find()
        .then((allSecurities) => {
          res.json(allSecurities);
        })
        .catch((err) => {
          console.error(err);
        });
});

router.get('/:link', (req, res) => {
  Security
        .find({ link: req.params.link })
        .then((item) => {
          res.json(item);
        })
        .catch(() => {
          res.status(404).json({ error: 'Not Found' });
        });
});

router.post('/', (req, res) => {
  const valid = validateFields(
    {
      link: String(),
      symbol: String(),
      name: String(),
      initialPrice: Number(),
      numShares: Number(),
    },
        req.body);

  if (valid.error) {
    console.error(valid.error);
    return res.status(400).json({ response: valid.error });
  }
  console.log(req.body);
  Security
        .create({
          link: req.body.link,
          symbol: req.body.symbol,
          name: req.body.name,
          initialPrice: req.body.initialPrice,
          currentPrice: req.body.initialPrice,
          numShares: req.body.numShares,
        })
        .then((item) => {
          res.json(item);
        })
        .catch((err) => {
          console.error(err);
          res.status(500).json({ error: 'Something went wrong' });
        });
});

router.put('/', (req) => {
  Security
    .findOne({ link: req.body.link, symbol: req.body.symbol })
    .then((security) => {
      const updatedShares = security.numShares + req.body.numShares;
      Security.findOneAndUpdate(
        { link: req.body.link, symbol: req.body.symbol },
        { $set: {
          currentPrice: req.body.currentPrice,
          numShares: updatedShares,
        } },
        { new: true }
      )
      .then((updatedSecurity) => {
        console.log(updatedSecurity.link);
      });
    });
});

router.delete('/:link', (req, res) => {
  Security
    .findOneAndRemove({ link: req.params.link, symbol: req.body.symbol })
    .exec()
    .then(() => {
      console.log(`Deleted security with id ${req.params.ID}`);
      res.status(204).end();
    });
});

module.exports = router;
