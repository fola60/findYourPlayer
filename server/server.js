const express = require('express')
const app = express();
const pool = require("./dataBase")

app.use(express.json())

//ROUTES//

app.get("/allValue", async(req,res) => {
    try{
        
        const getAll = await pool.query(`
        SELECT *
        FROM playerdata
        JOIN playerdataPER ON playerdata.per_id = playerdataper.id
        JOIN playerclasses ON playerdataper.plcl_id = playerclasses.id;`);

        res.json(getAll.rows)
    } catch (err) {
        console.error(err.message)
    }
});


app.get("/allValue/id/:id", async (req,res) => {
    const { id } = req.params;
    try {
        const player = await pool.query(`
        SELECT *
        FROM playerdata
        JOIN playerdataPER ON playerdata.per_id = playerdataper.id
        JOIN playerclasses ON playerdataper.plcl_id = playerclasses.id WHERE per_id = $1;`,[id]);
        
        res.json(player.rows[0])
    } catch (err){
        console.error(err.message);
    }
});

//POSITION ROUTING//

app.get("/allValue/pos/fw", async (req,res) => {
    try {
        const playerPosFw = await pool.query(`
        SELECT *
        FROM playerdata
        JOIN playerdataPER ON playerdata.per_id = playerdataper.id
        JOIN playerclasses ON playerdataper.plcl_id = playerclasses.id WHERE pos IN ('FW', 'FW,MF', 'FW,DF') ;`);
        
        res.json(playerPosFw.rows)
    } catch (err){
        console.error(err.message);
    }
});

app.get("/allValue/pos/mf", async (req,res) => {
    try {
        const playerPosMf = await pool.query(`
        SELECT *
        FROM playerdata
        JOIN playerdataPER ON playerdata.per_id = playerdataper.id
        JOIN playerclasses ON playerdataper.plcl_id = playerclasses.id WHERE pos IN ('MF', 'MF,FW', 'DF,MF', 'MF,DF') ;`);
        
        res.json(playerPosMf.rows)
    } catch (err){
        console.error(err.message);
    }
});

app.get("/allValue/pos/df", async (req,res) => {
    try {
        const playerPosDf = await pool.query(`
        SELECT *
        FROM playerdata
        JOIN playerdataPER ON playerdata.per_id = playerdataper.id
        JOIN playerclasses ON playerdataper.plcl_id = playerclasses.id WHERE pos IN ('DF', 'DF,FW') ;`);
        
        res.json(playerPosDf.rows)
        console.log(playerPosDf.rows.length)
    } catch (err){
        console.error(err.message);
    }
});

//League Routing//

//Prem

app.get("/allValue/pos/fw/league/prem", async (req,res) => {
    try {
        const playerPosFwPl = await pool.query(`
        SELECT *
        FROM playerdata
        JOIN playerdataPER ON playerdata.per_id = playerdataper.id
        JOIN playerclasses ON playerdataper.plcl_id = playerclasses.id WHERE pos IN ('FW', 'FW,MF', 'FW,DF') AND comp = 'Premier League' ;`);
        
        res.json(playerPosFwPl.rows);
    } catch (err){
        console.error(err.message);
    }
});

app.get("/allValue/pos/mf/league/prem", async (req,res) => {
    try {
        const playerPosMfPl = await pool.query(`
        SELECT *
        FROM playerdata
        JOIN playerdataPER ON playerdata.per_id = playerdataper.id
        JOIN playerclasses ON playerdataper.plcl_id = playerclasses.id WHERE pos IN ('MF', 'MF,FW', 'DF,MF', 'MF,DF') AND comp = 'Premier League' ;`);
        
        res.json(playerPosMfPl.rows)
    } catch (err){
        console.error(err.message);
    }
});

app.get("/allValue/pos/df/league/prem", async (req,res) => {
    try {
        const playerPosDfPl = await pool.query(`
        SELECT *
        FROM playerdata
        JOIN playerdataPER ON playerdata.per_id = playerdataper.id
        JOIN playerclasses ON playerdataper.plcl_id = playerclasses.id WHERE pos IN ('DF', 'DF,FW') AND comp = 'Premier League';`);
        
        res.json(playerPosDf.rows)
        console.log(playerPosDfPl.rows.length)
    } catch (err){
        console.error(err.message);
    }
});

//Bundesliga

app.get("/allValue/pos/fw/league/bundesliga", async (req,res) => {
    try {
        const playerPosFwBl = await pool.query(`
        SELECT *
        FROM playerdata
        JOIN playerdataPER ON playerdata.per_id = playerdataper.id
        JOIN playerclasses ON playerdataper.plcl_id = playerclasses.id WHERE pos IN ('FW', 'FW,MF', 'FW,DF') AND comp = 'Bundesliga' ;`);
        
        res.json(playerPosFwBl.rows);
    } catch (err){
        console.error(err.message);
    }
});

app.get("/allValue/pos/mf/league/bundesliga", async (req,res) => {
    try {
        const playerPosMfBl = await pool.query(`
        SELECT *
        FROM playerdata
        JOIN playerdataPER ON playerdata.per_id = playerdataper.id
        JOIN playerclasses ON playerdataper.plcl_id = playerclasses.id WHERE pos IN ('MF', 'MF,FW', 'DF,MF', 'MF,DF') AND comp = 'Bundesliga' ;`);
        
        res.json(playerPosMfBl.rows)
    } catch (err){
        console.error(err.message);
    }
});

app.get("/allValue/pos/df/league/bundesliga", async (req,res) => {
    try {
        const playerPosDfPl = await pool.query(`
        SELECT *
        FROM playerdata
        JOIN playerdataPER ON playerdata.per_id = playerdataper.id
        JOIN playerclasses ON playerdataper.plcl_id = playerclasses.id WHERE pos IN ('DF', 'DF,FW') AND comp = 'Bundesliga';`);
        
        res.json(playerPosDf.rows)
        console.log(playerPosDfPl.rows.length)
    } catch (err){
        console.error(err.message);
    }
});

//Ligue 1 

app.get("/allValue/pos/fw/league/ligue1", async (req,res) => {
    try {
        const playerPosFwLg = await pool.query(`
        SELECT *
        FROM playerdata
        JOIN playerdataPER ON playerdata.per_id = playerdataper.id
        JOIN playerclasses ON playerdataper.plcl_id = playerclasses.id WHERE pos IN ('FW', 'FW,MF', 'FW,DF') AND comp = 'Ligue 1' ;`);
        
        res.json(playerPosFwLg.rows);
    } catch (err){
        console.error(err.message);
    }
});

app.get("/allValue/pos/mf/league/ligue1", async (req,res) => {
    try {
        const playerPosMfLg = await pool.query(`
        SELECT *
        FROM playerdata
        JOIN playerdataPER ON playerdata.per_id = playerdataper.id
        JOIN playerclasses ON playerdataper.plcl_id = playerclasses.id WHERE pos IN ('MF', 'MF,FW', 'DF,MF', 'MF,DF') AND comp = 'Ligue 1' ;`);
        
        res.json(playerPosMfLg.rows)
    } catch (err){
        console.error(err.message);
    }
});

app.get("/allValue/pos/df/league/ligue1", async (req,res) => {
    try {
        const playerPosDfLg = await pool.query(`
        SELECT *
        FROM playerdata
        JOIN playerdataPER ON playerdata.per_id = playerdataper.id
        JOIN playerclasses ON playerdataper.plcl_id = playerclasses.id WHERE pos IN ('DF', 'DF,FW') AND comp = 'Ligue 1';`);
        
        res.json(playerPosDfLg.rows)
        console.log(playerPosDfLg.rows.length)
    } catch (err){
        console.error(err.message);
    }
});

//Serie A

app.get("/allValue/pos/fw/league/seriea", async (req,res) => {
    try {
        const playerPosFwSa = await pool.query(`
        SELECT *
        FROM playerdata
        JOIN playerdataPER ON playerdata.per_id = playerdataper.id
        JOIN playerclasses ON playerdataper.plcl_id = playerclasses.id WHERE pos IN ('FW', 'FW,MF', 'FW,DF') AND comp = 'Serie A' ;`);
        
        res.json(playerPosFwSa.rows);
    } catch (err){
        console.error(err.message);
    }
});

app.get("/allValue/pos/mf/league/seriea", async (req,res) => {
    try {
        const playerPosMfSa = await pool.query(`
        SELECT *
        FROM playerdata
        JOIN playerdataPER ON playerdata.per_id = playerdataper.id
        JOIN playerclasses ON playerdataper.plcl_id = playerclasses.id WHERE pos IN ('MF', 'MF,FW', 'DF,MF', 'MF,DF') AND comp = 'Serie A' ;`);
        
        res.json(playerPosMfSa.rows)
    } catch (err){
        console.error(err.message);
    }
});

app.get("/allValue/pos/df/league/seriea", async (req,res) => {
    try {
        const playerPosDfSa = await pool.query(`
        SELECT *
        FROM playerdata
        JOIN playerdataPER ON playerdata.per_id = playerdataper.id
        JOIN playerclasses ON playerdataper.plcl_id = playerclasses.id WHERE pos IN ('DF', 'DF,FW') AND comp = 'Serie A';`);
        
        res.json(playerPosDfSa.rows)
    } catch (err){
        console.error(err.message);
    }
});

//La Liga

app.get("/allValue/pos/fw/league/laliga", async (req,res) => {
    try {
        const playerPosFwLl = await pool.query(`
        SELECT *
        FROM playerdata
        JOIN playerdataPER ON playerdata.per_id = playerdataper.id
        JOIN playerclasses ON playerdataper.plcl_id = playerclasses.id WHERE pos IN ('FW', 'FW,MF', 'FW,DF') AND comp = 'La Liga' ;`);
        
        res.json(playerPosFwLl.rows);
    } catch (err){
        console.error(err.message);
    }
});

app.get("/allValue/pos/mf/league/laliga", async (req,res) => {
    try {
        const playerPosMfLl = await pool.query(`
        SELECT *
        FROM playerdata
        JOIN playerdataPER ON playerdata.per_id = playerdataper.id
        JOIN playerclasses ON playerdataper.plcl_id = playerclasses.id WHERE pos IN ('MF', 'MF,FW', 'DF,MF', 'MF,DF') AND comp = 'La Liga' ;`);
        
        res.json(playerPosMfLl.rows)
    } catch (err){
        console.error(err.message);
    }
});

app.get("/allValue/pos/df/league/laliga", async (req,res) => {
    try {
        const playerPosDfLl = await pool.query(`
        SELECT *
        FROM playerdata
        JOIN playerdataPER ON playerdata.per_id = playerdataper.id
        JOIN playerclasses ON playerdataper.plcl_id = playerclasses.id WHERE pos IN ('DF', 'DF,FW') AND comp = 'La Liga';`);
        
        res.json(playerPosDfLl.rows)
    } catch (err){
        console.error(err.message);
    }
});

app.listen(5000, () =>{
    console.log("Server started on port 5000")
});