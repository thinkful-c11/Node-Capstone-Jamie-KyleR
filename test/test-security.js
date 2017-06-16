'use strict';

const chai = require('chai');
const chaiHttp = require('chai-http');
const mongoose = require('mongoose');
const faker = require('faker');

const should = chai.should();

const{Security} = require('../src/js/schemas/portfolioSchema');
const {generateRandomUrl} = require('../src/js/helpers');
const {app, runServer, closeServer} = require('../server');
const router = require('../src/js/routes/portfolioRouter');

const {TEST_DATABASE_URL} = require('../config/config');
const dirname = __dirname.split('/').slice(0, -3).join('/');

chai.use(chaiHttp);
chai.use(require('chai-moment'));

function seedSecuritiesData() {
  console.info('seeding securities data');
  const seedData = [];

  for (let i = 1; i <= 1; i++) {
    seedData.push(generateSecuritiesData());
  }
  // this will return a promise
  return Security.insertMany(seedData);
}

function generateSecuritiesData(portfolioLink) {
  return {
    link: portfolioLink || generateRandomUrl(),
    symbol: faker.address.city(),
    name: faker.company.companyName(),
    initialPrice: faker.random.number({min: 1, max: 500}),
    // currentPrice: faker.random.number({min: 1, max: 500}),
    numShare: faker.random.number({min:1, max: 500})
  };
}


function tearDownDb() {
  console.warn('Deleting database');
  return mongoose.connection.dropDatabase();
}

describe('Portfolio API resource', function () {

  before(function () {
    return runServer(TEST_DATABASE_URL);
  });

  beforeEach(function () {
    return seedSecuritiesData();
  });

  // afterEach(function () {
  //   return tearDownDb();
  // });

  after(function () {
    return closeServer();
  });


  describe.skip('GET endpoint', function () {
    it('should return portfolios with right fields', function () {
      // Strategy: Get back portfolio, and ensure it has expected keys
      return Portfolio
        .find()
        .exec()
        .then(res => {
          let url = res[0].link;
          return chai.request(app)
          .get(`/portfolio/${url}`);
        })
        .then(function (res) {
          res.should.have.status(200);
          res.should.be.a('object');
        });
    });
  });

  describe.skip('POST endpoint', function () {

    it('should add a new security to portfolio', function () {
      const newPortfolio = generatePortfolioData();
    
      return chai.request(app)
        .post('/')
        .send(newPortfolio)
        .then(function (res) {
          res.should.have.status(201);
          res.should.be.json;
          res.body.should.be.a('object');
          res.body.should.include.keys(
            'id', 'link', 'name', 'value');
          res.body.link.should.equal(newPortfolio.link);
          // cause Mongo should have created id on insertion
          res.body.id.should.not.be.null;
          res.body.name.should.equal(newPortfolio.name);
          res.body.value.should.equal(newPortfolio.value);
          createdAt = res.body.created;
          return Portfolio.findById(res.body.id);
        })
        .then(function (portfolio) {
          portfolio.title.should.equal(newPortfolio.title);
          portfolio.content.should.equal(newPortfolio.content);
          portfolio.author.firstName.should.equal(newPortfolio.author.firstName);
          portfolio.created.should.be.sameMoment(createdAt);
        });
    });
  });


}); //closing describe 

module.exports = {generateSecuritiesData};
