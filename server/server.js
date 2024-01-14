const express = require('express')
const app = express();
const pool = require("./dataBase")

app.use(express.json())

//ROUTES//

app.get("/allValue", async(req,res) => {
    try{
        
        const getAll = await pool.query(`SELECT * FROM playerdata JOIN playerdataPER ON playerdata.per_id = playerdataPER.id`);
        res.json(getAll.rows)
    } catch (err) {
        console.error(err.message)
    }
});


app.get("/allValue/:id", async (req,res) => {
    const { id } = req.params;
    try {
        const player = await pool.query(`SELECT * FROM playerdata WHERE id = ${id}`)
        res.json(player.rows[0])
    } catch (err){
        console.error(err.message);
    }
});

app.listen(5000, () =>{
    console.log("Server started on port 5000")
})