const appConfig = require('../config');
const config = require('../../knexfile.js')[appConfig.env];

module.exports = require('knex')(config);
