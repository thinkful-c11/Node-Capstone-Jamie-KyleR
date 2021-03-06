'use strict';
require('dotenv').config();
exports.DATABASE_URL = process.env.DATABASE_URL ||
                       global.DATABASE_URL;

exports.TEST_DATABASE_URL = process.env.TEST_DATABASE_URL ||
                       global.TEST_DATABASE_URL;

exports.PORT = process.env.PORT || 8080;

exports.API_KEY = process.env.API_KEY || global.API_KEY;