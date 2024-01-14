const Pool = require('pg').Pool;

const pool= new Pool({
    host: "localhost",
    user: "postgres",
    port: 5432,
    password:"sarah2014",
    database: "top5playerdata",
    idleTimeoutMillis: 20000,
    connectionTimeoutMillis: 20000,
});

module.exports = pool;

