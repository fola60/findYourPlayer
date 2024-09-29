const { Pool } = require('pg');
require("dotenv").config({path:'./server/.env'});

// Set your database credentials here
const pool = new Pool({
    user: process.env.USER,
    host: process.env.HOST,
    database: process.env.DATABASE,
    password: process.env.PASSWORD,
    port: process.env.PORT_DB, 

});

// Log any error during connection
pool.on('error', (err, client) => {
    console.error('Unexpected error on idle client', err);
    process.exit(-1);
});

// Export the pool object for use in other parts of your app
module.exports = pool;