const { Client } = require('pg');

// PostgreSQL connection details
const client = new Client({
  user: process.env.USER,
  host: process.env.HOST,
  database: process.env.DATABASE,
  password: process.env.PASSWORD,
  port: process.env.PORT_DB, 

});



module.exports = client;