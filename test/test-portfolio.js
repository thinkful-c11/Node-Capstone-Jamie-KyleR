'use strict';

const chai = require('chai');
const chaiHttp = require('chai-http');
const mongoose = require('mongoose');
const faker = require('faker');

const should = chai.should();

const{Portfolio} = require('../src/js/schemas/portfolioSchema');
const {generateRandomUrl} = require('../src/js/helpers');
const {app, runServer, closeServer} = require('../server');
const router = require('../src/js/routes/portfolioRouter');

const {TEST_DATABASE_URL} = require('../config/config');
const dirname = __dirname.split('/').slice(0, -3).join('/');

chai.use(chaiHttp);
chai.use(require('chai-moment'));

function seedPortfolioData() {
  console.info('seeding portfolio data');
  const seedData = [];

  for (let i = 1; i <= 1; i++) {
    seedData.push(generatePortfolioData());
  }
  // this will return a promise
  return Portfolio.insertMany(seedData);
}

function generatePortfolioData() {
  return {
    link: generateRandomUrl(),
    name: faker.name.firstName() + ' ' + faker.name.lastName(),
    value: faker.random.number({min: 100000, max: 10000000})
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
    return seedPortfolioData();
  });

  // afterEach(function () {
  //   return tearDownDb();
  // });

  after(function () {
    return closeServer();
  });


  describe('GET endpoint', function () {
    it('should return all existing portfolio accounts', function () {
      Portfolio
        .findOne()
        .exec()
        .then(res => {
          let url = res.url;
          return chai.request(router)
          .get(`/${url}`);
        })
        .then(function (_res) {
          let res = _res;
          res.should.have.status(200);
        });
    });

    it.only('should return portfolios with right fields', function () {
      // Strategy: Get back portfolio, and ensure it has expected keys
      let resPortfolio;
      Portfolio
        .findOne()
        .exec()
        .then(res => {
          let url = res.url;
          return chai.request(app)
          .get(`/${url}`);
        })
        .then(function (res) {
          res.should.have.status(200);
          console.log(res);
          

          res.body.blogs.forEach(function (blog) {
            blog.should.be.a('object');
            blog.should.include.keys(
              'id', 'title', 'content', 'author', 'created');
          });
          resPortfolio = res.body.blogs[0];
          return Portfolio.findByName(resPortfolio.name);
        })
        .then(function (blog) {

          resPortfolio.link.should.equal();
          resPortfolio.name.should.equal();
          resPortfolio.value.should.equal();
          //resPortfolio.author.lastName.should.equal(blog.author.lastName);
          resPortfolio.created.should.be.sameMoment();
          //try making created to created.should.equal and see if there is difference//
        });
    });
  });

  describe('POST endpoint', function () {
    // strategy: make a POST request with data,
    // then prove that the restaurant we get back has
    // right keys, and that `id` is there (which means
    // the data was inserted into db)
    it('should add a new portfolio', function () {

      const newPortfolio = generatePortfolioData();
      console.log('this is the original date', newPortfolio.created);
      let createdAt;
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
