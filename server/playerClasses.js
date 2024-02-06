const {Client} = require('pg');

const client = new Client({
    host: "localhost",
    user: "postgres",
    port: 5432,
    password:"sarah2014",
    database: "top5playerdata",
    idleTimeoutMillis: 20000,
    connectionTimeoutMillis: 20000,
});
client.end()
//client.connect();
//bpa = ball playing ability ,pr = press resistance, aggr = aggression, passv = passive, da = defensive ability, aa = attacking ability
//br = ball retention, hvp = high volume passer, ca = creative ability, gs = goal scoring
//dr = dribbling, cm = chance magnet, fin = finishing, pr = pressing, pass = passing
/*
client.query(`CREATE TABLE playerclasses(
    id BIGINT PRIMARY KEY,
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
    fw_pass FLOAT);`,() => {




        
    });
    */
/*
client.query(`SELECT * FROM playerdata JOIN playerdataPER ON playerdata.per_id = playerdataPER.id ;`,
    (err,res)=>{
        if(!err){
            console.log(res.rows.length)
            for(let i = 0; i < res.rows.length;i++){
                let df_bpa = (parseFloat(res.rows[i].cmp90per) + parseFloat(res.rows[i].sho_cmppctper) + parseFloat(res.rows[i].med_cmppctper) + parseFloat(res.rows[i].lon_cmppctper) + parseFloat(res.rows[i].p_rec90per) + parseFloat(res.rows[i].prg_prec90per) + parseFloat(res.rows[i].kp90per)) / 7;
                let df_pr = (parseFloat(res.rows[i].sho_cmppctper) + parseFloat(res.rows[i].dis90per) + parseFloat(res.rows[i].mis90per) + parseFloat(res.rows[i].to_tklpctper)) / 4;
                let df_aggr = (parseFloat(res.rows[i].drb_chl90per) + parseFloat(res.rows[i].tkl90per)) / 2;
                let df_passv = (parseFloat(res.rows[i].drb_tklpct));
                let df_da = (parseFloat(res.rows[i].tkl_w90per) + parseFloat(res.rows[i].chl_lst90per) + parseFloat(res.rows[i].blck90per) + parseFloat(res.rows[i].intc90per) + parseFloat(res.rows[i].clr90per) + parseFloat(res.rows[i].sh_blck90per)) / 6;
                let df_aa = (parseFloat(res.rows[i].npxg90per) + parseFloat(res.rows[i].sotpctper) + parseFloat(res.rows[i].sca_p90per) + parseFloat(res.rows[i].sca_to90per) + parseFloat(res.rows[i].crrs_pen90per)) / 5;

                let mf_br = (parseFloat(res.rows[i].sho_cmppctper) + parseFloat(res.rows[i].med_cmppctper) + parseFloat(res.rows[i].intc90per) + parseFloat(res.rows[i].to_att90)) / 4;
                let mf_hvp = (parseFloat(res.rows[i].cmp90per) + parseFloat(res.rows[i].p_rec90per) + parseFloat(res.rows[i].tch90per)) / 3;
                let mf_ca = (parseFloat(res.rows[i].sca_p90per) + parseFloat(res.rows[i].gca_90per) + parseFloat(res.rows[i].sca_to90per) + parseFloat(res.rows[i].ast90per) + parseFloat(res.rows[i].xa90per) + parseFloat(res.rows[i].xag90per) + parseFloat(res.rows[i].kp90per) + parseFloat(res.rows[i].fin3rd_p90per) + parseFloat(res.rows[i].prg_prec90per) + parseFloat(res.rows[i].crrs_pen90per)) / 10;
                let mf_da = (parseFloat(res.rows[i].tkl_w90per) + parseFloat(res.rows[i].chl_lst90per) + parseFloat(res.rows[i].blck90per) + parseFloat(res.rows[i].intc90per) + parseFloat(res.rows[i].clr90per) + parseFloat(res.rows[i].sh_blck90per)) / 6;
                let mf_gs = (parseFloat(res.rows[i].sotpctper) + parseFloat(res.rows[i].gls90per) + parseFloat(res.rows[i].g_sh90per) + parseFloat(res.rows[i].xg90per) + parseFloat(res.rows[i].npxg90per) + parseFloat(res.rows[i].gmin_xg90per) + parseFloat(res.rows[i].npxg_sh90per)) / 7;
                
                let fw_dr = (parseFloat(res.rows[i].crrs_pen90per) + parseFloat(res.rows[i].sca_to90per) + parseFloat(res.rows[i].sca_fd90per) + parseFloat(res.rows[i].gca_90per) + parseFloat(res.rows[i].gca_to90per) + parseFloat(res.rows[i].crrs90per) + parseFloat(res.rows[i].crrs_dis90per) + parseFloat(res.rows[i].crss_prgdis90per) + parseFloat(res.rows[i].crrs_fin3rd90per) + parseFloat(res.rows[i].prg_prec90per) + parseFloat(res.rows[i].to_succ)) / 10;
                let fw_cm = (parseFloat(res.rows[i].prg_prec90per) + parseFloat(res.rows[i].npxg90per) + parseFloat(res.rows[i].sh90per) + parseFloat(res.rows[i].av_dis90per )) / 4;
                let fw_fin = (parseFloat(res.rows[i].sotpctper) + parseFloat(res.rows[i].gls90per) + parseFloat(res.rows[i].g_sh90per) + parseFloat(res.rows[i].xg90per)) / 4;
                let fw_pr = (parseFloat(res.rows[i].sca_def90per) + parseFloat(res.rows[i].intc90per) + parseFloat(res.rows[i].tkl_att3rd90per)) / 3;
                let fw_pass = (parseFloat(res.rows[i].sca_p90per) + parseFloat(res.rows[i].gca_90per) + parseFloat(res.rows[i].sca_to90per) + parseFloat(res.rows[i].ast90per) + parseFloat(res.rows[i].xa90per) + parseFloat(res.rows[i].xag90per) + parseFloat(res.rows[i].kp90per) + parseFloat(res.rows[i].fin3rd_p90per) + parseFloat(res.rows[i].prg_prec90per) + parseFloat(res.rows[i].crrs_pen90per)) / 10;
                
                client.query(`INSERT INTO playerclasses(id, df_bpa, df_pr, df_aggr, df_passv, df_da, df_aa, mf_br, mf_hvp, mf_ca, mf_da, mf_gs, fw_dr, fw_cm, fw_fin, fw_pr, fw_pass)VALUES(${res.rows[i].id}, ${df_bpa}, ${df_pr}, ${df_aggr}, ${df_passv}, ${df_da}, ${df_aa}, ${mf_br}, ${mf_hvp}, ${mf_ca}, ${mf_da}, ${mf_gs}, ${fw_dr}, ${fw_cm}, ${fw_fin}, ${fw_pr}, ${fw_pass})`);
               
            }
            
            
        } else {
            console.log(err.message);
            
        }
        
})
*/
