const config = require('../knexfile.js')[process.env.development];

module.exports = require('knex')(config);
