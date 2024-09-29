const { Pool } = require('pg');
require("dotenv").config({path:'../server/.env'});

// Set your database credentials here
const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
});

// Log any error during connection
pool.on('error', (err, client) => {
    console.error('Unexpected error on idle client', err);
    process.exit(-1);
});

// Export the pool object for use in other parts of your app
module.exports = pool;