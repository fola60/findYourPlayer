const express = require('express')
const app = express();
const pool = require("./dataBase")
const http = require("http")
const { Server } = require("socket.io")
const cors = require("cors")

app.use(cors());
const serverS = http.createServer(app);
const PORT = 1357;
// const IP_ADDRESS = '13.48.124.9';
const IP_ADDRESS = 'http://localhost:'

const io = new Server(serverS, {
    cors: {
        origin: IP_ADDRESS,
        methods: ["GET", "POST"]
    }
});

io.on("connection", (socket) => {
    let dataPoints;
    let dataPointsFw;
    let dataPointsDf;
    let mfBool = false;
    let fwBool = false;
    let dfBool = false;
    socket.on("send_id", (data) => {
        socket.broadcast.emit("receive_id", data);
        console.log("received id : " + data.id);
    });
    socket.on("send_league", (data) => { 
        socket.broadcast.emit("received_league", data);
        console.log("received league : " + data);
    });
    socket.on("send_position", (data) => {
        socket.broadcast.emit("received_position", data);
        console.log("received position", data);
    });
    socket.on("send_data_points",(data) => {
        socket.broadcast.emit("receive_data_points",data);
        dataPoints = data;
        console.log("received data points! :", dataPoints);
        mfBool = true;
        dfBool = false;
        fwBool = false;
    });
    socket.on("send-data_points_fw", (data) => {
        socket.broadcast.emit("receive_data_points_fw",data);
        dataPointsFw = data;
        console.log("received data points Forward! :", dataPointsFw);
        fwBool = true;
        mfBool = false;
        dfBool = false;
    })
    socket.on("send-data_points_df", (data) => {
        socket.broadcast.emit("receive_data_points_df",data);
        dataPointsDf = data;
        console.log("received data points Defender! :", dataPointsDf);
        dfBool = true;
        mfBool = false;
        fwBool = false;
    })
    socket.on("send_players",(data) => {
        socket.broadcast.emit("receive_players",data);
        console.log("received player: " + data[0].player);
    })
    socket.on("send_player_data",(data) =>{
        if(mfBool && data){
            for (let i = 0;i < data.length; i++){
                console.log(data[i]);
                data[i].score = (data[i].mf_hvp * dataPoints.hvp) + (data[i].mf_da * dataPoints.da) + (data[i].mf_ca * dataPoints.ca) + (data[i].mf_gs * dataPoints.gs) + (data[i].mf_br  * dataPoints.br);
            }
            data.sort((a,b) => b.score - a.score);
            socket.broadcast.emit("receive_sorted_player", data.slice(0,50));
            console.log(data);
            
            console.log("Player received!");
            fwBool = false;
            mfBool = false;
            fwBool = false;
        }

        socket.broadcast.emit("receive_sorted_player", null);
    });
    socket.on("send_player_data_fw", (data) => {
        if(fwBool && data){
            for(let i = 0;i < data.length; i++){
                data[i].score = (data[i].fw_pr * dataPointsFw.pr) + (data[i].fw_fin * dataPointsFw.fin) + (data[i].fw_dr * dataPointsFw.dr) + (data[i].fw_cm * dataPointsFw.cm) + (data[i].fw_pass * dataPointsFw.pass);
            }
            data.sort((a,b) => b.score - a.score);
            socket.broadcast.emit("receive_sorted_player_fw", data.slice(0,50));
            
            console.log("Player received!");
            fwBool = false;
            mfBool = false;
            fwBool = false;
        } else {
            console.log("Forward Fail!")
        }
    });
    socket.on("send_player_data_df", (data) => {
        if(dfBool && data){
            for(let i = 0;i < data.length; i++){
                data[i].score = (data[i].df_aggr * dataPointsDf.aggr) + (data[i].df_bpa * dataPointsDf.bpa) + (data[i].df_passv * dataPointsDf.passv) + (data[i].df_aa * dataPointsDf.aa) + (data[i].df_da * dataPointsDf.da) + (data[i].df_pr * dataPointsDf.pr);
            }
            data.sort((a,b) => b.score - a.score);
            socket.broadcast.emit("receive_sorted_player_df", data.slice(0,50));
            
            console.log("Player received!");
            fwBool = false;
            mfBool = false;
            fwBool = false;
        } else {
            console.log("Defender Fail!");
        }
    });

})

serverS.listen(PORT, () => {
    console.log("socket started on port " + PORT);
});

app.use(express.json());

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
        
        res.json(playerPosDfPl.rows)
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
        
        res.json(playerPosDfPl.rows)
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

app.get("/allValue/search", async (req,res) => {
    try{
    const names = await pool.query(`
        SELECT player,id,pos,born,comp
        FROM playerdata WHERE pos != 'GK'; 
    `)
    res.json(names.rows);
    } catch (err) {
        console.error(err.message);
    }
});

app.post("/receiveId", async (req,res) => {
    try {
        const id = req.body.res;
        const pushId = await pool.query(`UPDATE dataid SET id = ${id};`)
    } catch (err) {
        console.error(err.message)
    }
})

app.get("/getId", async (req,res) => {
    try {
        const id = await pool.query(`SELECT id FROM dataid;`);
        res.json(id.rows)
    } catch (err) {
        console.error(err.message)
    }
})

app.listen(PORT,IP_ADDRESS, () =>{
    console.log("Server started on port 5000");

});

