const mysql = require('mysql2');

const pool = mysql.createPool({
  host: 'srv691.hstgr.io',
  user: 'u817008098_biasantana',
  password: 'q7Q~k4$k$',
  database: 'u817008098_biasantana'
}).promise();

 // Enable promise-based queries

module.exports = pool;