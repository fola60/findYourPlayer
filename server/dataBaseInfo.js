
const { Client } = require('pg');
require("dotenv").config({path:'../server/.env'});

// PostgreSQL connection details
const client = new Client({
  connectionString: process.env.DATABASE_URL,
});



module.exports = client;