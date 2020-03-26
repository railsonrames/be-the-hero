const knex = require('knex');
const config = require('../../knexfile');

const dbconnection = knex(config.development);

module.exports = dbconnection;
