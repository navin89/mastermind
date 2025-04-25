// src/db/db.connection.js
const { Pool } = require('pg');
const config = require('./db.config');

const pool = new Pool(config);

module.exports = {
  query: (text, params) => pool.query(text, params),
  connect: () => pool.connect(),
  // You can add more methods as needed, like ending the pool
  end: () => pool.end(),
};
