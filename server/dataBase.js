const Pool = require('pg').Pool;

const pool= new Pool({
    host: "findyourplayer-db.c5cg68esmfdc.eu-north-1.rds.amazonaws.com",
    user: "fola",
    port: 5432,
    password:"Folasgmailaccount123!",
    database: "FindYourPlayer",
    idleTimeoutMillis: 20000,
    connectionTimeoutMillis: 20000,
});

module.exports = pool;

