
const { Client } = require('pg');
require("dotenv").config({path:'./server/.env'});

// PostgreSQL connection details
const client = new Client({
  user: process.env.USER,
  host: process.env.HOST,
  database: process.env.DATABASE,
  password: process.env.PASSWORD,
  port: process.env.PORT_DB, 
  ssl: {
    rejectUnauthorized: false, // Set this to true if you have valid SSL certificates
  }
});



module.exports = client;