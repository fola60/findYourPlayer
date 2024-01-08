const {Client} = require('pg');

const client = new Client({
    host: "localhost",
    user: "postgres",
    port: 5432,
    password:"sarah2014",
    database: "top5playerdata"
})
const test = new Client({
    host: "localhost",
    user: "postgres",
    port: 5432,
    password:"sarah2014",
    database: "test"
})
client.connect();
test.connect();
client.query(`SELECT * FROM playerdata`,(err, res)=>{
    // if(!err){
    //     console.log(res.rows);
    // } else {
    //     console.log(err.message)
    // }
    for (r in res.rows){
        console.log(r)
    }
    
    client.end;
})
console.log("I cant believe that we made it this far")