const client = require('./dataBaseInfo');


client.connect()
  .then(() => console.log('Connected to the database'))
  .catch(err => console.error('Connection error', err.stack));


//bpa = ball playing ability ,pr = press resistance, aggr = aggression, passv = passive, da = defensive ability, aa = attacking ability
//br = ball retention, hvp = high volume passer, ca = creative ability, gs = goal scoring
//dr = dribbling, cm = chance magnet, fin = finishing, pr = pressing, pass = passing
/*
client.query(`CREATE TABLE playerclasses(
    id BIGSERIAL PRIMARY KEY,
    df_bpa FLOAT, 
    df_pr FLOAT,
    df_aggr FLOAT,
    df_passv FLOAT,
    df_da FLOAT,
    df_aa FLOAT,
    mf_br FLOAT,
    mf_hvp FLOAT,
    mf_ca FLOAT,
    mf_da FLOAT,
    mf_gs FLOAT,
    fw_dr FLOAT,
    fw_cm FLOAT,
    fw_fin FLOAT,
    fw_pr FLOAT,
    fw_pass FLOAT);`,(err,res) => {
        if(err) {
            console.log(err)
        }
        client.end()
    });
    */
/*
client.query(`SET client_encoding = 'UTF8';`,(err,res)=>{
    if(!err){
        console.log('result: ' + res)
    } else {
        console.log(err)
    }
    client.end()
});
*/
function safeParse(value) {
    let parsed = parseFloat(value);
    return isNaN(parsed) ? 0.0 : parsed;
}
async function runQuery() {
    try {
        

        // Query to select data
        const res = await client.query(`
            SELECT * FROM playerdata
            JOIN playerdataPER ON playerdata.per_id = playerdataPER.id;
        `);

        console.log("Number of rows:", res.rows.length);

        for (let i = 0; i < res.rows.length; i++) {
            console.log(i);
            let df_bpa = (safeParse(res.rows[i].cmp90per) + safeParse(res.rows[i].sho_cmppctper) + safeParse(res.rows[i].med_cmppctper) + safeParse(res.rows[i].lon_cmppctper) + safeParse(res.rows[i].p_rec90per) + safeParse(res.rows[i].prg_prec90per) + safeParse(res.rows[i].kp90per)) / 7;
            let df_pr = (safeParse(res.rows[i].sho_cmppctper) + safeParse(res.rows[i].dis90per) + safeParse(res.rows[i].mis90per) + safeParse(res.rows[i].to_tklpctper)) / 4;
            let df_aggr = (safeParse(res.rows[i].drb_chl90per) + safeParse(res.rows[i].tkl90per)) / 2;
            let df_passv = safeParse(res.rows[i].drb_tklpct);
            let df_da = (safeParse(res.rows[i].tkl_w90per) + safeParse(res.rows[i].chl_lst90per) + safeParse(res.rows[i].blck90per) + safeParse(res.rows[i].intc90per) + safeParse(res.rows[i].clr90per) + safeParse(res.rows[i].sh_blck90per)) / 6;
            let df_aa = (safeParse(res.rows[i].npxg90per) + safeParse(res.rows[i].sotpctper) + safeParse(res.rows[i].sca_p90per) + safeParse(res.rows[i].sca_to90per) + safeParse(res.rows[i].crrs_pen90per)) / 5;

            let mf_br = (safeParse(res.rows[i].sho_cmppctper) + safeParse(res.rows[i].med_cmppctper) + safeParse(res.rows[i].intc90per) + safeParse(res.rows[i].to_att90)) / 4;
            let mf_hvp = (safeParse(res.rows[i].cmp90per) + safeParse(res.rows[i].p_rec90per) + safeParse(res.rows[i].tch90per)) / 3;
            let mf_ca = (safeParse(res.rows[i].sca_p90per) + safeParse(res.rows[i].gca_90per) + safeParse(res.rows[i].sca_to90per) + safeParse(res.rows[i].ast90per) + safeParse(res.rows[i].xa90per) + safeParse(res.rows[i].xag90per) + safeParse(res.rows[i].kp90per) + safeParse(res.rows[i].fin3rd_p90per) + safeParse(res.rows[i].prg_prec90per) + safeParse(res.rows[i].crrs_pen90per)) / 10;
            let mf_da = (safeParse(res.rows[i].tkl_w90per) + safeParse(res.rows[i].chl_lst90per) + safeParse(res.rows[i].blck90per) + safeParse(res.rows[i].intc90per) + safeParse(res.rows[i].clr90per) + safeParse(res.rows[i].sh_blck90per)) / 6;
            let mf_gs = (safeParse(res.rows[i].sotpctper) + safeParse(res.rows[i].gls90per) + safeParse(res.rows[i].g_sh90per) + safeParse(res.rows[i].xg90per) + safeParse(res.rows[i].npxg90per) + safeParse(res.rows[i].gmin_xg90per) + safeParse(res.rows[i].npxg_sh90per)) / 7;

            let fw_dr = (safeParse(res.rows[i].crrs_pen90per) + safeParse(res.rows[i].sca_to90per) + safeParse(res.rows[i].sca_fd90per) + safeParse(res.rows[i].gca_90per) + safeParse(res.rows[i].gca_to90per) + safeParse(res.rows[i].crrs90per) + safeParse(res.rows[i].crrs_dis90per) + safeParse(res.rows[i].crss_prgdis90per) + safeParse(res.rows[i].crrs_fin3rd90per) + safeParse(res.rows[i].prg_prec90per) + safeParse(res.rows[i].to_succ)) / 10;
            let fw_cm = (safeParse(res.rows[i].prg_prec90per) + safeParse(res.rows[i].npxg90per) + safeParse(res.rows[i].sh90per) + safeParse(res.rows[i].av_dis90per)) / 4;
            let fw_fin = (safeParse(res.rows[i].sotpctper) + safeParse(res.rows[i].gls90per) + safeParse(res.rows[i].g_sh90per) + safeParse(res.rows[i].xg90per)) / 4;
            let fw_pr = (safeParse(res.rows[i].sca_def90per) + safeParse(res.rows[i].intc90per) + safeParse(res.rows[i].tkl_att3rd90per)) / 3;
            let fw_pass = (safeParse(res.rows[i].sca_p90per) + safeParse(res.rows[i].gca_90per) + safeParse(res.rows[i].sca_to90per) + safeParse(res.rows[i].ast90per) + safeParse(res.rows[i].xa90per) + safeParse(res.rows[i].xag90per) + safeParse(res.rows[i].kp90per) + safeParse(res.rows[i].fin3rd_p90per) + safeParse(res.rows[i].prg_prec90per) + safeParse(res.rows[i].crrs_pen90per)) / 10;

            // Using parameterized queries for insertion
            await client.query(`
                INSERT INTO playerclasses (
                    df_bpa, df_pr, df_aggr, df_passv, df_da, df_aa, mf_br, mf_hvp, mf_ca, mf_da, mf_gs, fw_dr, fw_cm, fw_fin, fw_pr, fw_pass
                ) VALUES (
                    $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16
                )`,
                [
                    df_bpa, df_pr, df_aggr, df_passv, df_da, df_aa,
                    mf_br, mf_hvp, mf_ca, mf_da, mf_gs,
                    fw_dr, fw_cm, fw_fin, fw_pr, fw_pass
                ]
            );

            console.log('===============');
            console.log('INSERTED');
        }
    } catch (err) {
        console.log('Error message:', err.message);
    } finally {
        await client.end();
    }
}

// Call the function
runQuery();
