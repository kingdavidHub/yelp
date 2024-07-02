const pg = require("pg");
const { Pool } = pg;

// create a new pool here using the connection string above
const pool = new Pool();

module.exports = {
  query: (text, params) => pool.query(text, params),
};
