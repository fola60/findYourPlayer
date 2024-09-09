const client = require('./dataBaseInfo');


client.connect()
  .then(() => console.log('Connected to the database'))
  .catch(err => console.error('Connection error', err.stack));




/*
client.query(`CREATE TABLE playerdataPER(
    id BIGINT PRIMARY KEY,
    plcl_id BIGSERIAL,  
    _90s FLOAT, 
    gls90PER FLOAT,
    sh90PER FLOAT,
    sotpctPER FLOAT,
    g_sh90PER FLOAT,
    g_sot90PER FLOAT,
    av_dis90PER FLOAT,
    xg90PER FLOAT,
    npxg90PER FLOAT,
    npxg_sh90PER FLOAT,
    gmin_xg90PER FLOAT,
    cmp90PER FLOAT,
    cmppctPER FLOAT,
    sho_cmppctPER FLOAT,
    med_cmppctPER FLOAT,
    lon_cmppctPER FLOAT,
    ast90PER FLOAT,
    xag90PER FLOAT,
    xa90PER FLOAT,
    kp90PER FLOAT,
    fin3rd_p90PER FLOAT,
    p_inpen90PER FLOAT,
    crs_inpen90PER FLOAT,
    prog_p90PER FLOAT,
    tkl90PER FLOAT,
    tkl_w90PER FLOAT,
    tkl_att3rd90PER FLOAT,
    drb_tkl90PER FLOAT,
    drb_chl90PER FLOAT,
    drb_tklpctPER FLOAT,
    chl_lst90PER FLOAT,
    blck90PER FLOAT,
    sh_blck90PER FLOAT,
    p_blck90PER FLOAT,
    intc90PER FLOAT,
    clr90PER FLOAT,
    sca_p90PER FLOAT,
    sca_pl90PER FLOAT,
    sca_to90PER FLOAT,
    sca_sh90PER FLOAT,
    sca_fd90PER FLOAT,
    sca_def90PER FLOAT,
    gca_90PER FLOAT,
    gca_to90PER FLOAT,
    tch90PER FLOAT,
    to_att90 FLOAT,
    to_tklpctPER FLOAT,
    crrs90PER FLOAT,
    crrs_dis90PER FLOAT,
    crss_prgdis90PER FLOAT,
    prg_crss90PER FLOAT,
    crrs_fin3rd90PER FLOAT,
    crrs_pen90PER FLOAT,
    mis90PER FLOAT,
    dis90PER FLOAT,
    p_rec90PER FLOAT,
    prg_prec90PER FLOAT );`)
*/
// test.query(`SELECT * FROM playerdataPER`, (err,res)=>{
//     console.log(res.rows);
// })

let datasizeDf = 0;
let datasizeMfD = 0;
let datasizeMfF = 0;
let datasizeMf = 0;
let datasizeFw = 0;

client.query(`SELECT * FROM playerdata`,(err,res)=>{
    if(!err){
        for(let i = 0; i < res.rows.length;i++){
            if (res.rows[i].pos == 'DF'){    
                datasizeDf++;
            } else if(res.rows[i].pos == 'DF,MF'){
                datasizeMfD++;
            } else if(res.rows[i].pos == 'MF,DF') {
                datasizeMfD++
            } else if(res.rows[i].pos == 'MF'){
                datasizeMf++
            } else if(res.rows[i].pos == 'MF,FW'){
                datasizeMfF++;
            } else if(res.rows[i].pos == 'FW' ){
                datasizeFw++;
            } else if(res.rows[i].pos == 'FW,MF'){
                datasizeFw++
            } else if(res.rows[i].pos == 'FW'){
                datasizeFw++;
            } else if(res.rows[i].pos == 'DF,FW'){
                datasizeDf++
            } else if(res.rows[i].pos == 'FW,DF'){
                datasizeFw++
            }
        }
        
    } else {
        console.log(err.message)
    }
    })
    

client.query(`SELECT * FROM playerdata WHERE pos != 'GK'`,(err, res)=>{
    console.log(`Total size: ${res.rows.length}`)
    console.log(`datasizeDf = ${datasizeDf}`);
    console.log(`datasizeMfD = ${datasizeMfD}`)
    console.log(`datasizeMfF = ${datasizeMfF}`)
    console.log(`datasizeFw = ${datasizeFw}`)
    console.log(`datasizeMf = ${datasizeMf}`)
    console.log(`total data collected ${datasizeDf + datasizeFw + datasizeMf + datasizeMfD + datasizeMfF}`)
    if(!err){
        
        let i = 0;
        let position = 0;

        for(let i = 1;i < res.rows.length; i++){
            if (parseFloat(res.rows[0]._90s) > parseFloat(res.rows[i]._90s)){
                position += 1;
            }
        }
        console.log(position)
        let datasize = res.rows.length;
        percentile = (position / datasize) * (100);
        console.log(percentile.toFixed(2))
        //test.query(`INSERT INTO testpercent(gls, shp)VALUES(${percentile},${percentile})`)
        
        //let invalidcount = 0;
        for(let i = 0; i < res.rows.length;i++){
                let position = 0;
                let datasize = 0;
            

                           
        for(let j = 0; j < res.rows.length;j++){
                if(res.rows[i].pos == res.rows[j].pos || res.rows[i].pos == 'MF' && res.rows[j].pos == 'MF,FW' ||res.rows[i].pos == 'DF' && res.rows[j].pos == 'DF,FW' || res.rows[i].pos  == 'DF,FW' && res.rows[j].pos == 'DF' || res.rows[i].pos == 'FW' && res.rows[j].pos == 'FW,DF' || res.rows[i].pos == 'FW,DF' && res.rows[j].pos == 'FW' ||res.rows[i].pos == 'FW,MF' && res.rows[j].pos == 'FW,DF' ||res.rows[i].pos == 'FW,DF' && res.rows[j].pos == 'FW,MF' || res.rows[i].pos == 'MF' && res.rows[j].pos == 'DF,MF' || res.rows[i].pos == 'MF' && res.rows[j].pos == 'MF,DF' || res.rows[i].pos == 'DF,MF' && res.rows[j].pos == 'MF' || res.rows[i].pos == 'DF,MF' && res.rows[j].pos == 'MF,DF' || res.rows[i].pos == 'MF,DF' && res.rows[j].pos == 'MF' || res.rows[i].pos == 'MF,DF' && res.rows[j].pos == 'DF,MF' || res.rows[i].pos == 'MF,FW' && res.rows[j].pos == 'MF'   || res.rows[i].pos == 'FW' && res.rows[j] == 'FW,MF' || res.rows[i].pos == 'FW,MF' && res.rows[j].pos == 'FW'){
                if ((parseFloat(res.rows[i].gls)  / parseFloat(res.rows[i]._90s) ) >= (parseFloat(res.rows[j].gls)   / parseFloat(res.rows[i]._90s) )){
                    position+=1
                }
            }
            }
            if (res.rows[i].pos == 'DF'){
                datasize = datasizeDf;
            } else if (res.rows[i].pos == 'MF'){
                datasize = datasizeMfD + datasizeMfF + datasizeMf;
            } else if (res.rows[i].pos == 'FW'){
                datasize = datasizeFw;
            } else if (res.rows[i].pos == 'MF,FW'){
                datasize = datasizeMfF + datasizeMf;
            } else if (res.rows[i].pos == 'FW,MF'){
                datasize = datasizeFw;
            } else if(res.rows[i].pos == 'DF,MF' || res.rows[i].pos ==  'MF,DF'){
                datasize = datasizeMfD + datasizeMf;
            } else if(res.rows[i].pos == 'DF,FW'){
                datasize = datasizeDf;
            } else if(res.rows[i].pos == 'FW,DF'){
                datasize = datasizeFw;
            }
            let gls90PER = (position / datasize) * (100);
            if (gls90PER == Infinity){
                gls90PER = 0;
            }

            //console.log(res.rows[i].player)
            
            console.log(`position: ${position}`)
            console.log(`datasize: ${datasize}`)
            
            position = 0;
            

        
        for(let j = 0; j < res.rows.length;j++){
                if(res.rows[i].pos == res.rows[j].pos || res.rows[i].pos == 'MF' && res.rows[j].pos == 'MF,FW' ||res.rows[i].pos == 'DF' && res.rows[j].pos == 'DF,FW' || res.rows[i].pos  == 'DF,FW' && res.rows[j].pos == 'DF' || res.rows[i].pos == 'FW' && res.rows[j].pos == 'FW,DF' || res.rows[i].pos == 'FW,DF' && res.rows[j].pos == 'FW' ||res.rows[i].pos == 'FW,MF' && res.rows[j].pos == 'FW,DF' ||res.rows[i].pos == 'FW,DF' && res.rows[j].pos == 'FW,MF' || res.rows[i].pos == 'MF' && res.rows[j].pos == 'DF,MF' || res.rows[i].pos == 'MF' && res.rows[j].pos == 'MF,DF' || res.rows[i].pos == 'DF,MF' && res.rows[j].pos == 'MF' || res.rows[i].pos == 'DF,MF' && res.rows[j].pos == 'MF,DF' || res.rows[i].pos == 'MF,DF' && res.rows[j].pos == 'MF' || res.rows[i].pos == 'MF,DF' && res.rows[j].pos == 'DF,MF' || res.rows[i].pos == 'MF,FW' && res.rows[j].pos == 'MF'  || res.rows[i].pos == 'FW' && res.rows[j] == 'FW,MF' || res.rows[i].pos == 'FW,MF' && res.rows[j].pos == 'FW'){
                if ((parseFloat(res.rows[i].sh)  / parseFloat(res.rows[i]._90s) ) >= (parseFloat(res.rows[j].sh)   / parseFloat(res.rows[i]._90s) )){
                    position+=1
                }
            }
            }
            if (res.rows[i].pos == 'DF'){
                datasize = datasizeDf;
            } else if (res.rows[i].pos == 'MF'){
                datasize = datasizeMfD + datasizeMfF + datasizeMf;
            } else if (res.rows[i].pos == 'FW'){
                datasize = datasizeFw;
            } else if (res.rows[i].pos == 'MF,FW'){
                datasize = datasizeMfF + datasizeMf;
            } else if (res.rows[i].pos == 'FW,MF'){
                datasize = datasizeFw;
            } else if(res.rows[i].pos == 'DF,MF' || res.rows[i].pos ==  'MF,DF'){
                datasize = datasizeMfD + datasizeMf;
            } else if(res.rows[i].pos == 'DF,FW'){
                datasize = datasizeDf;
            } else if(res.rows[i].pos == 'FW,DF'){
                datasize = datasizeFw;
            }
            let sh90PER = (position / datasize) * (100);
            if (sh90PER == Infinity){
                sh90PER = 0;
            }

            position = 0;
            

        
        for(let j = 0; j < res.rows.length;j++){
                if (res.rows[i].pos == res.rows[j].pos || res.rows[i].pos == 'MF' && res.rows[j].pos == 'MF,FW' ||res.rows[i].pos == 'DF' && res.rows[j].pos == 'DF,FW' || res.rows[i].pos  == 'DF,FW' && res.rows[j].pos == 'DF' || res.rows[i].pos == 'FW' && res.rows[j].pos == 'FW,DF' || res.rows[i].pos == 'FW,DF' && res.rows[j].pos == 'FW' ||res.rows[i].pos == 'FW,MF' && res.rows[j].pos == 'FW,DF' ||res.rows[i].pos == 'FW,DF' && res.rows[j].pos == 'FW,MF' || res.rows[i].pos == 'MF' && res.rows[j].pos == 'DF,MF' || res.rows[i].pos == 'MF' && res.rows[j].pos == 'MF,DF' || res.rows[i].pos == 'DF,MF' && res.rows[j].pos == 'MF' || res.rows[i].pos == 'DF,MF' && res.rows[j].pos == 'MF,DF' || res.rows[i].pos == 'MF,DF' && res.rows[j].pos == 'MF' || res.rows[i].pos == 'MF,DF' && res.rows[j].pos == 'DF,MF' || res.rows[i].pos == 'MF,FW' && res.rows[j].pos == 'MF'   || res.rows[i].pos == 'FW' && res.rows[j] == 'FW,MF' || res.rows[i].pos == 'FW,MF' && res.rows[j].pos == 'FW'){
                if ((parseFloat(res.rows[i].sotpct)   >= parseFloat(res.rows[j].sotpct) )){
                    position+=1
                }
            }
            }
            if (res.rows[i].pos == 'DF'){
                datasize = datasizeDf;
            } else if (res.rows[i].pos == 'MF'){
                datasize = datasizeMfD + datasizeMfF + datasizeMf;
            } else if (res.rows[i].pos == 'FW'){
                datasize = datasizeFw;
            } else if (res.rows[i].pos == 'MF,FW'){
                datasize = datasizeMfF + datasizeMf;
            } else if (res.rows[i].pos == 'FW,MF'){
                datasize = datasizeFw;
            } else if(res.rows[i].pos == 'DF,MF' || res.rows[i].pos ==  'MF,DF'){
                datasize = datasizeMfD + datasizeMf;
            } else if(res.rows[i].pos == 'DF,FW'){
                datasize = datasizeDf;
            } else if(res.rows[i].pos == 'FW,DF'){
                datasize = datasizeFw;
            }
            let sotpctPER = (position / datasize) * (100);
            if (sotpctPER == Infinity){
                sotpctPER = 0;
            }

            position = 0;
            

            
        for(let j = 0; j < res.rows.length;j++){
                if (res.rows[i].pos == res.rows[j].pos || res.rows[i].pos == 'MF' && res.rows[j].pos == 'MF,FW' ||res.rows[i].pos == 'DF' && res.rows[j].pos == 'DF,FW' || res.rows[i].pos  == 'DF,FW' && res.rows[j].pos == 'DF' || res.rows[i].pos == 'FW' && res.rows[j].pos == 'FW,DF' || res.rows[i].pos == 'FW,DF' && res.rows[j].pos == 'FW' ||res.rows[i].pos == 'FW,MF' && res.rows[j].pos == 'FW,DF' ||res.rows[i].pos == 'FW,DF' && res.rows[j].pos == 'FW,MF' || res.rows[i].pos == 'MF' && res.rows[j].pos == 'DF,MF' || res.rows[i].pos == 'MF' && res.rows[j].pos == 'MF,DF' || res.rows[i].pos == 'DF,MF' && res.rows[j].pos == 'MF' || res.rows[i].pos == 'DF,MF' && res.rows[j].pos == 'MF,DF' || res.rows[i].pos == 'MF,DF' && res.rows[j].pos == 'MF' || res.rows[i].pos == 'MF,DF' && res.rows[j].pos == 'DF,MF' || res.rows[i].pos == 'MF,FW' && res.rows[j].pos == 'MF'   || res.rows[i].pos == 'FW' && res.rows[j] == 'FW,MF' || res.rows[i].pos == 'FW,MF' && res.rows[j].pos == 'FW'){
                if ((parseFloat(res.rows[i].g_sh)  / parseFloat(res.rows[i]._90s)  >= parseFloat(res.rows[j].g_sh)  / parseFloat(res.rows[i]._90s) )){
                    position+=1
                }
            }
            }
            if (res.rows[i].pos == 'DF'){
                datasize = datasizeDf;
            } else if (res.rows[i].pos == 'MF'){
                datasize = datasizeMfD + datasizeMfF + datasizeMf;
            } else if (res.rows[i].pos == 'FW'){
                datasize = datasizeFw;
            } else if (res.rows[i].pos == 'MF,FW'){
                datasize = datasizeMfF + datasizeMf;
            } else if (res.rows[i].pos == 'FW,MF'){
                datasize = datasizeFw;
            } else if(res.rows[i].pos == 'DF,MF' || res.rows[i].pos ==  'MF,DF'){
                datasize = datasizeMfD + datasizeMf;
            } else if(res.rows[i].pos == 'DF,FW'){
                datasize = datasizeDf;
            } else if(res.rows[i].pos == 'FW,DF'){
                datasize = datasizeFw;
            }
            let g_sh90PER = (position / datasize) * (100);
            if (g_sh90PER == Infinity){
                g_sh90PER = 0;
            }

            position = 0;
            

            
        for(let j = 0; j < res.rows.length;j++){
                if (res.rows[i].pos == res.rows[j].pos || res.rows[i].pos == 'MF' && res.rows[j].pos == 'MF,FW' ||res.rows[i].pos == 'DF' && res.rows[j].pos == 'DF,FW' || res.rows[i].pos  == 'DF,FW' && res.rows[j].pos == 'DF' || res.rows[i].pos == 'FW' && res.rows[j].pos == 'FW,DF' || res.rows[i].pos == 'FW,DF' && res.rows[j].pos == 'FW' ||res.rows[i].pos == 'FW,MF' && res.rows[j].pos == 'FW,DF' ||res.rows[i].pos == 'FW,DF' && res.rows[j].pos == 'FW,MF' || res.rows[i].pos == 'MF' && res.rows[j].pos == 'DF,MF' || res.rows[i].pos == 'MF' && res.rows[j].pos == 'MF,DF' || res.rows[i].pos == 'DF,MF' && res.rows[j].pos == 'MF' || res.rows[i].pos == 'DF,MF' && res.rows[j].pos == 'MF,DF' || res.rows[i].pos == 'MF,DF' && res.rows[j].pos == 'MF' || res.rows[i].pos == 'MF,DF' && res.rows[j].pos == 'DF,MF' || res.rows[i].pos == 'MF,FW' && res.rows[j].pos == 'MF'   || res.rows[i].pos == 'FW' && res.rows[j] == 'FW,MF' || res.rows[i].pos == 'FW,MF' && res.rows[j].pos == 'FW'){
                if ((parseFloat(res.rows[i].g_sot)  / parseFloat(res.rows[i]._90s)   >= parseFloat(res.rows[j].g_sot)  / parseFloat(res.rows[i]._90s) )){
                    position+=1
                }
            }
            }
            if (res.rows[i].pos == 'DF'){
                datasize = datasizeDf;
            } else if (res.rows[i].pos == 'MF'){
                datasize = datasizeMfD + datasizeMfF + datasizeMf;
            } else if (res.rows[i].pos == 'FW'){
                datasize = datasizeFw;
            } else if (res.rows[i].pos == 'MF,FW'){
                datasize = datasizeMfF + datasizeMf;
            } else if (res.rows[i].pos == 'FW,MF'){
                datasize = datasizeFw;
            } else if(res.rows[i].pos == 'DF,MF' || res.rows[i].pos ==  'MF,DF'){
                datasize = datasizeMfD + datasizeMf;
            } else if(res.rows[i].pos == 'DF,FW'){
                datasize = datasizeDf;
            } else if(res.rows[i].pos == 'FW,DF'){
                datasize = datasizeFw;
            }
            let g_sot90PER = (position / datasize) * (100);
            if (g_sot90PER == Infinity){
                g_sot90PER = 0;
            }
            position = 0;
            

            
        for(let j = 0; j < res.rows.length;j++){
                if (res.rows[i].pos == res.rows[j].pos || res.rows[i].pos == 'MF' && res.rows[j].pos == 'MF,FW' ||res.rows[i].pos == 'DF' && res.rows[j].pos == 'DF,FW' || res.rows[i].pos  == 'DF,FW' && res.rows[j].pos == 'DF' || res.rows[i].pos == 'FW' && res.rows[j].pos == 'FW,DF' || res.rows[i].pos == 'FW,DF' && res.rows[j].pos == 'FW' ||res.rows[i].pos == 'FW,MF' && res.rows[j].pos == 'FW,DF' ||res.rows[i].pos == 'FW,DF' && res.rows[j].pos == 'FW,MF' || res.rows[i].pos == 'MF' && res.rows[j].pos == 'DF,MF' || res.rows[i].pos == 'MF' && res.rows[j].pos == 'MF,DF' || res.rows[i].pos == 'DF,MF' && res.rows[j].pos == 'MF' || res.rows[i].pos == 'DF,MF' && res.rows[j].pos == 'MF,DF' || res.rows[i].pos == 'MF,DF' && res.rows[j].pos == 'MF' || res.rows[i].pos == 'MF,DF' && res.rows[j].pos == 'DF,MF' || res.rows[i].pos == 'MF,FW' && res.rows[j].pos == 'MF'   || res.rows[i].pos == 'FW' && res.rows[j] == 'FW,MF' || res.rows[i].pos == 'FW,MF' && res.rows[j].pos == 'FW'){
                if ((parseFloat(res.rows[i].av_dis)  / parseFloat(res.rows[i]._90s)   >= parseFloat(res.rows[j].av_dis)  / parseFloat(res.rows[i]._90s) )){
                    position+=1
                }
            }
            }
            if (res.rows[i].pos == 'DF'){
                datasize = datasizeDf;
            } else if (res.rows[i].pos == 'MF'){
                datasize = datasizeMfD + datasizeMfF + datasizeMf;
            } else if (res.rows[i].pos == 'FW'){
                datasize = datasizeFw;
            } else if (res.rows[i].pos == 'MF,FW'){
                datasize = datasizeMfF + datasizeMf;
            } else if (res.rows[i].pos == 'FW,MF'){
                datasize = datasizeFw;
            } else if(res.rows[i].pos == 'DF,MF' || res.rows[i].pos ==  'MF,DF'){
                datasize = datasizeMfD + datasizeMf;
            } else if(res.rows[i].pos == 'DF,FW'){
                datasize = datasizeDf;
            } else if(res.rows[i].pos == 'FW,DF'){
                datasize = datasizeFw;
            }
            let av_dis90PER = (position / datasize) * (100);
            if (av_dis90PER == Infinity){
                av_dis90PER = 0;
            }

            position = 0;
            

            
        for(let j = 0; j < res.rows.length;j++){
                if (res.rows[i].pos == res.rows[j].pos || res.rows[i].pos == 'MF' && res.rows[j].pos == 'MF,FW' ||res.rows[i].pos == 'DF' && res.rows[j].pos == 'DF,FW' || res.rows[i].pos  == 'DF,FW' && res.rows[j].pos == 'DF' || res.rows[i].pos == 'FW' && res.rows[j].pos == 'FW,DF' || res.rows[i].pos == 'FW,DF' && res.rows[j].pos == 'FW' ||res.rows[i].pos == 'FW,MF' && res.rows[j].pos == 'FW,DF' ||res.rows[i].pos == 'FW,DF' && res.rows[j].pos == 'FW,MF' || res.rows[i].pos == 'MF' && res.rows[j].pos == 'DF,MF' || res.rows[i].pos == 'MF' && res.rows[j].pos == 'MF,DF' || res.rows[i].pos == 'DF,MF' && res.rows[j].pos == 'MF' || res.rows[i].pos == 'DF,MF' && res.rows[j].pos == 'MF,DF' || res.rows[i].pos == 'MF,DF' && res.rows[j].pos == 'MF' || res.rows[i].pos == 'MF,DF' && res.rows[j].pos == 'DF,MF' || res.rows[i].pos == 'MF,FW' && res.rows[j].pos == 'MF'   || res.rows[i].pos == 'FW' && res.rows[j] == 'FW,MF' || res.rows[i].pos == 'FW,MF' && res.rows[j].pos == 'FW'){
                if ((parseFloat(res.rows[i].xg)  / parseFloat(res.rows[i]._90s)   >= parseFloat(res.rows[j].xg)  / parseFloat(res.rows[i]._90s) )){
                    position+=1
                }
            }
            }
            if (res.rows[i].pos == 'DF'){
                datasize = datasizeDf;
            } else if (res.rows[i].pos == 'MF'){
                datasize = datasizeMfD + datasizeMfF + datasizeMf;
            } else if (res.rows[i].pos == 'FW'){
                datasize = datasizeFw;
            } else if (res.rows[i].pos == 'MF,FW'){
                datasize = datasizeMfF + datasizeMf;
            } else if (res.rows[i].pos == 'FW,MF'){
                datasize = datasizeFw;
            } else if(res.rows[i].pos == 'DF,MF' || res.rows[i].pos ==  'MF,DF'){
                datasize = datasizeMfD + datasizeMf;
            } else if(res.rows[i].pos == 'DF,FW'){
                datasize = datasizeDf;
            } else if(res.rows[i].pos == 'FW,DF'){
                datasize = datasizeFw;
            }
            let xg90PER = (position / datasize) * (100);
            if (xg90PER == Infinity){
                xg90PER = 0;
            }

            position = 0;
            

            
        for(let j = 0; j < res.rows.length;j++){
                if (res.rows[i].pos == res.rows[j].pos || res.rows[i].pos == 'MF' && res.rows[j].pos == 'MF,FW' ||res.rows[i].pos == 'DF' && res.rows[j].pos == 'DF,FW' || res.rows[i].pos  == 'DF,FW' && res.rows[j].pos == 'DF' || res.rows[i].pos == 'FW' && res.rows[j].pos == 'FW,DF' || res.rows[i].pos == 'FW,DF' && res.rows[j].pos == 'FW' ||res.rows[i].pos == 'FW,MF' && res.rows[j].pos == 'FW,DF' ||res.rows[i].pos == 'FW,DF' && res.rows[j].pos == 'FW,MF' || res.rows[i].pos == 'MF' && res.rows[j].pos == 'DF,MF' || res.rows[i].pos == 'MF' && res.rows[j].pos == 'MF,DF' || res.rows[i].pos == 'DF,MF' && res.rows[j].pos == 'MF' || res.rows[i].pos == 'DF,MF' && res.rows[j].pos == 'MF,DF' || res.rows[i].pos == 'MF,DF' && res.rows[j].pos == 'MF' || res.rows[i].pos == 'MF,DF' && res.rows[j].pos == 'DF,MF' || res.rows[i].pos == 'MF,FW' && res.rows[j].pos == 'MF'   || res.rows[i].pos == 'FW' && res.rows[j] == 'FW,MF' || res.rows[i].pos == 'FW,MF' && res.rows[j].pos == 'FW'){
                if ((parseFloat(res.rows[i].npxg)  / parseFloat(res.rows[i]._90s)   >= parseFloat(res.rows[j].npxg)  / parseFloat(res.rows[i]._90s) )){
                    position+=1
                }
            }
            }
            if (res.rows[i].pos == 'DF'){
                datasize = datasizeDf;
            } else if (res.rows[i].pos == 'MF'){
                datasize = datasizeMfD + datasizeMfF + datasizeMf;
            } else if (res.rows[i].pos == 'FW'){
                datasize = datasizeFw;
            } else if (res.rows[i].pos == 'MF,FW'){
                datasize = datasizeMfF + datasizeMf;
            } else if (res.rows[i].pos == 'FW,MF'){
                datasize = datasizeFw;
            } else if(res.rows[i].pos == 'DF,MF' || res.rows[i].pos ==  'MF,DF'){
                datasize = datasizeMfD + datasizeMf;
            } else if(res.rows[i].pos == 'DF,FW'){
                datasize = datasizeDf;
            } else if(res.rows[i].pos == 'FW,DF'){
                datasize = datasizeFw;
            }
            let npxg90PER = (position / datasize) * (100);
            if (npxg90PER == Infinity){
                npxg90PER = 0;
            }

            position = 0;
            

            
        for(let j = 0; j < res.rows.length;j++){
                if (res.rows[i].pos == res.rows[j].pos || res.rows[i].pos == 'MF' && res.rows[j].pos == 'MF,FW' ||res.rows[i].pos == 'DF' && res.rows[j].pos == 'DF,FW' || res.rows[i].pos  == 'DF,FW' && res.rows[j].pos == 'DF' || res.rows[i].pos == 'FW' && res.rows[j].pos == 'FW,DF' || res.rows[i].pos == 'FW,DF' && res.rows[j].pos == 'FW' ||res.rows[i].pos == 'FW,MF' && res.rows[j].pos == 'FW,DF' ||res.rows[i].pos == 'FW,DF' && res.rows[j].pos == 'FW,MF' || res.rows[i].pos == 'MF' && res.rows[j].pos == 'DF,MF' || res.rows[i].pos == 'MF' && res.rows[j].pos == 'MF,DF' || res.rows[i].pos == 'DF,MF' && res.rows[j].pos == 'MF' || res.rows[i].pos == 'DF,MF' && res.rows[j].pos == 'MF,DF' || res.rows[i].pos == 'MF,DF' && res.rows[j].pos == 'MF' || res.rows[i].pos == 'MF,DF' && res.rows[j].pos == 'DF,MF' || res.rows[i].pos == 'MF,FW' && res.rows[j].pos == 'MF'   || res.rows[i].pos == 'FW' && res.rows[j] == 'FW,MF' || res.rows[i].pos == 'FW,MF' && res.rows[j].pos == 'FW'){
                if ((parseFloat(res.rows[i].npxg_sh)  / parseFloat(res.rows[i]._90s)   >= parseFloat(res.rows[j].npxg_sh)  / parseFloat(res.rows[i]._90s) )){
                    position+=1
                }
            }
            }
            if (res.rows[i].pos == 'DF'){
                datasize = datasizeDf;
            } else if (res.rows[i].pos == 'MF'){
                datasize = datasizeMfD + datasizeMfF + datasizeMf;
            } else if (res.rows[i].pos == 'FW'){
                datasize = datasizeFw;
            } else if (res.rows[i].pos == 'MF,FW'){
                datasize = datasizeMfF + datasizeMf;
            } else if (res.rows[i].pos == 'FW,MF'){
                datasize = datasizeFw;
            } else if(res.rows[i].pos == 'DF,MF' || res.rows[i].pos ==  'MF,DF'){
                datasize = datasizeMfD + datasizeMf;
            } else if(res.rows[i].pos == 'DF,FW'){
                datasize = datasizeDf;
            } else if(res.rows[i].pos == 'FW,DF'){
                datasize = datasizeFw;
            }
            let npxg_sh90PER = (position / datasize) * (100);
            if (npxg_sh90PER == Infinity){
                npxg_sh90PER = 0;
            }

            position = 0;
            

            
        for(let j = 0; j < res.rows.length;j++){
                if (res.rows[i].pos == res.rows[j].pos || res.rows[i].pos == 'MF' && res.rows[j].pos == 'MF,FW' ||res.rows[i].pos == 'DF' && res.rows[j].pos == 'DF,FW' || res.rows[i].pos  == 'DF,FW' && res.rows[j].pos == 'DF' || res.rows[i].pos == 'FW' && res.rows[j].pos == 'FW,DF' || res.rows[i].pos == 'FW,DF' && res.rows[j].pos == 'FW' ||res.rows[i].pos == 'FW,MF' && res.rows[j].pos == 'FW,DF' ||res.rows[i].pos == 'FW,DF' && res.rows[j].pos == 'FW,MF' || res.rows[i].pos == 'MF' && res.rows[j].pos == 'DF,MF' || res.rows[i].pos == 'MF' && res.rows[j].pos == 'MF,DF' || res.rows[i].pos == 'DF,MF' && res.rows[j].pos == 'MF' || res.rows[i].pos == 'DF,MF' && res.rows[j].pos == 'MF,DF' || res.rows[i].pos == 'MF,DF' && res.rows[j].pos == 'MF' || res.rows[i].pos == 'MF,DF' && res.rows[j].pos == 'DF,MF' || res.rows[i].pos == 'MF,FW' && res.rows[j].pos == 'MF'   || res.rows[i].pos == 'FW' && res.rows[j] == 'FW,MF' || res.rows[i].pos == 'FW,MF' && res.rows[j].pos == 'FW'){
                if ((parseFloat(res.rows[i].gmin_xg)  / parseFloat(res.rows[i]._90s)   >= parseFloat(res.rows[j].gmin_xg)  / parseFloat(res.rows[i]._90s) )){
                    position+=1
                }
            }
            }
            if (res.rows[i].pos == 'DF'){
                datasize = datasizeDf;
            } else if (res.rows[i].pos == 'MF'){
                datasize = datasizeMfD + datasizeMfF + datasizeMf;
            } else if (res.rows[i].pos == 'FW'){
                datasize = datasizeFw;
            } else if (res.rows[i].pos == 'MF,FW'){
                datasize = datasizeMfF + datasizeMf;
            } else if (res.rows[i].pos == 'FW,MF'){
                datasize = datasizeFw;
            } else if(res.rows[i].pos == 'DF,MF' || res.rows[i].pos ==  'MF,DF'){
                datasize = datasizeMfD + datasizeMf;
            } else if(res.rows[i].pos == 'DF,FW'){
                datasize = datasizeDf;
            } else if(res.rows[i].pos == 'FW,DF'){
                datasize = datasizeFw;
            }
            let gmin_xg90PER = (position / datasize) * (100);
            if (gmin_xg90PER == Infinity){
                gmin_xg90PER = 0;
            }

            position = 0;
            

            
        for(let j = 0; j < res.rows.length;j++){
                if (res.rows[i].pos == res.rows[j].pos || res.rows[i].pos == 'MF' && res.rows[j].pos == 'MF,FW' ||res.rows[i].pos == 'DF' && res.rows[j].pos == 'DF,FW' || res.rows[i].pos  == 'DF,FW' && res.rows[j].pos == 'DF' || res.rows[i].pos == 'FW' && res.rows[j].pos == 'FW,DF' || res.rows[i].pos == 'FW,DF' && res.rows[j].pos == 'FW' ||res.rows[i].pos == 'FW,MF' && res.rows[j].pos == 'FW,DF' ||res.rows[i].pos == 'FW,DF' && res.rows[j].pos == 'FW,MF' || res.rows[i].pos == 'MF' && res.rows[j].pos == 'DF,MF' || res.rows[i].pos == 'MF' && res.rows[j].pos == 'MF,DF' || res.rows[i].pos == 'DF,MF' && res.rows[j].pos == 'MF' || res.rows[i].pos == 'DF,MF' && res.rows[j].pos == 'MF,DF' || res.rows[i].pos == 'MF,DF' && res.rows[j].pos == 'MF' || res.rows[i].pos == 'MF,DF' && res.rows[j].pos == 'DF,MF' || res.rows[i].pos == 'MF,FW' && res.rows[j].pos == 'MF'   || res.rows[i].pos == 'FW' && res.rows[j] == 'FW,MF' || res.rows[i].pos == 'FW,MF' && res.rows[j].pos == 'FW'){
                if ((parseFloat(res.rows[i].cmp)  / parseFloat(res.rows[i]._90s)   >= parseFloat(res.rows[j].cmp)  / parseFloat(res.rows[i]._90s) )){
                    position+=1
                }
            }
            }
            if (res.rows[i].pos == 'DF'){
                datasize = datasizeDf;
            } else if (res.rows[i].pos == 'MF'){
                datasize = datasizeMfD + datasizeMfF + datasizeMf;
            } else if (res.rows[i].pos == 'FW'){
                datasize = datasizeFw;
            } else if (res.rows[i].pos == 'MF,FW'){
                datasize = datasizeMfF + datasizeMf;
            } else if (res.rows[i].pos == 'FW,MF'){
                datasize = datasizeFw;
            } else if(res.rows[i].pos == 'DF,MF' || res.rows[i].pos ==  'MF,DF'){
                datasize = datasizeMfD + datasizeMf;
            } else if(res.rows[i].pos == 'DF,FW'){
                datasize = datasizeDf;
            } else if(res.rows[i].pos == 'FW,DF'){
                datasize = datasizeFw;
            }
            let cmp90PER = (position / datasize) * (100);
            if (cmp90PER == Infinity){
                cmp90PER = 0;
            }

            position = 0;
            

            
        for(let j = 0; j < res.rows.length;j++){
                if (res.rows[i].pos == res.rows[j].pos || res.rows[i].pos == 'MF' && res.rows[j].pos == 'MF,FW' ||res.rows[i].pos == 'DF' && res.rows[j].pos == 'DF,FW' || res.rows[i].pos  == 'DF,FW' && res.rows[j].pos == 'DF' || res.rows[i].pos == 'FW' && res.rows[j].pos == 'FW,DF' || res.rows[i].pos == 'FW,DF' && res.rows[j].pos == 'FW' ||res.rows[i].pos == 'FW,MF' && res.rows[j].pos == 'FW,DF' ||res.rows[i].pos == 'FW,DF' && res.rows[j].pos == 'FW,MF' || res.rows[i].pos == 'MF' && res.rows[j].pos == 'DF,MF' || res.rows[i].pos == 'MF' && res.rows[j].pos == 'MF,DF' || res.rows[i].pos == 'DF,MF' && res.rows[j].pos == 'MF' || res.rows[i].pos == 'DF,MF' && res.rows[j].pos == 'MF,DF' || res.rows[i].pos == 'MF,DF' && res.rows[j].pos == 'MF' || res.rows[i].pos == 'MF,DF' && res.rows[j].pos == 'DF,MF' || res.rows[i].pos == 'MF,FW' && res.rows[j].pos == 'MF'   || res.rows[i].pos == 'FW' && res.rows[j] == 'FW,MF' || res.rows[i].pos == 'FW,MF' && res.rows[j].pos == 'FW'){
                if ((parseFloat(res.rows[i].cpmpct)   >= parseFloat(res.rows[j].cpmpct) )){
                    position+=1
                }
            }
            }
            if (res.rows[i].pos == 'DF'){
                datasize = datasizeDf;
            } else if (res.rows[i].pos == 'MF'){
                datasize = datasizeMfD + datasizeMfF + datasizeMf;
            } else if (res.rows[i].pos == 'FW'){
                datasize = datasizeFw;
            } else if (res.rows[i].pos == 'MF,FW'){
                datasize = datasizeMfF + datasizeMf;
            } else if (res.rows[i].pos == 'FW,MF'){
                datasize = datasizeFw;
            } else if(res.rows[i].pos == 'DF,MF' || res.rows[i].pos ==  'MF,DF'){
                datasize = datasizeMfD + datasizeMf;
            } else if(res.rows[i].pos == 'DF,FW'){
                datasize = datasizeDf;
            } else if(res.rows[i].pos == 'FW,DF'){
                datasize = datasizeFw;
            }
            let cpmpctPER = (position / datasize) * (100);
            if (cpmpctPER == Infinity){
                cpmpctPER = 0;
            }

            position = 0;
            

            
        for(let j = 0; j < res.rows.length;j++){
                if (res.rows[i].pos == res.rows[j].pos || res.rows[i].pos == 'MF' && res.rows[j].pos == 'MF,FW' ||res.rows[i].pos == 'DF' && res.rows[j].pos == 'DF,FW' || res.rows[i].pos  == 'DF,FW' && res.rows[j].pos == 'DF' || res.rows[i].pos == 'FW' && res.rows[j].pos == 'FW,DF' || res.rows[i].pos == 'FW,DF' && res.rows[j].pos == 'FW' ||res.rows[i].pos == 'FW,MF' && res.rows[j].pos == 'FW,DF' ||res.rows[i].pos == 'FW,DF' && res.rows[j].pos == 'FW,MF' || res.rows[i].pos == 'MF' && res.rows[j].pos == 'DF,MF' || res.rows[i].pos == 'MF' && res.rows[j].pos == 'MF,DF' || res.rows[i].pos == 'DF,MF' && res.rows[j].pos == 'MF' || res.rows[i].pos == 'DF,MF' && res.rows[j].pos == 'MF,DF' || res.rows[i].pos == 'MF,DF' && res.rows[j].pos == 'MF' || res.rows[i].pos == 'MF,DF' && res.rows[j].pos == 'DF,MF' || res.rows[i].pos == 'MF,FW' && res.rows[j].pos == 'MF'   || res.rows[i].pos == 'FW' && res.rows[j] == 'FW,MF' || res.rows[i].pos == 'FW,MF' && res.rows[j].pos == 'FW'){
                if ((parseFloat(res.rows[i].sho_cmppct)   >= parseFloat(res.rows[j].sho_cmppct) )){
                    position+=1
                }
            }
            }
            if (res.rows[i].pos == 'DF'){
                datasize = datasizeDf;
            } else if (res.rows[i].pos == 'MF'){
                datasize = datasizeMfD + datasizeMfF + datasizeMf;
            } else if (res.rows[i].pos == 'FW'){
                datasize = datasizeFw;
            } else if (res.rows[i].pos == 'MF,FW'){
                datasize = datasizeMfF + datasizeMf;
            } else if (res.rows[i].pos == 'FW,MF'){
                datasize = datasizeFw;
            } else if(res.rows[i].pos == 'DF,MF' || res.rows[i].pos ==  'MF,DF'){
                datasize = datasizeMfD + datasizeMf;
            } else if(res.rows[i].pos == 'DF,FW'){
                datasize = datasizeDf;
            } else if(res.rows[i].pos == 'FW,DF'){
                datasize = datasizeFw;
            }
            let sho_cmppctPER = (position / datasize) * (100);
            if (sho_cmppctPER == Infinity){
                sho_cmppctPER = 0;
            }

            position = 0;
            

            
        for(let j = 0; j < res.rows.length;j++){
                if (res.rows[i].pos == res.rows[j].pos || res.rows[i].pos == 'MF' && res.rows[j].pos == 'MF,FW' ||res.rows[i].pos == 'DF' && res.rows[j].pos == 'DF,FW' || res.rows[i].pos  == 'DF,FW' && res.rows[j].pos == 'DF' || res.rows[i].pos == 'FW' && res.rows[j].pos == 'FW,DF' || res.rows[i].pos == 'FW,DF' && res.rows[j].pos == 'FW' ||res.rows[i].pos == 'FW,MF' && res.rows[j].pos == 'FW,DF' ||res.rows[i].pos == 'FW,DF' && res.rows[j].pos == 'FW,MF' || res.rows[i].pos == 'MF' && res.rows[j].pos == 'DF,MF' || res.rows[i].pos == 'MF' && res.rows[j].pos == 'MF,DF' || res.rows[i].pos == 'DF,MF' && res.rows[j].pos == 'MF' || res.rows[i].pos == 'DF,MF' && res.rows[j].pos == 'MF,DF' || res.rows[i].pos == 'MF,DF' && res.rows[j].pos == 'MF' || res.rows[i].pos == 'MF,DF' && res.rows[j].pos == 'DF,MF' || res.rows[i].pos == 'MF,FW' && res.rows[j].pos == 'MF'   || res.rows[i].pos == 'FW' && res.rows[j] == 'FW,MF' || res.rows[i].pos == 'FW,MF' && res.rows[j].pos == 'FW'){
                if ((parseFloat(res.rows[i].med_cpmpct)   >= parseFloat(res.rows[j].med_cpmpct) )){
                    position+=1
                }
            }
            }
            if (res.rows[i].pos == 'DF'){
                datasize = datasizeDf;
            } else if (res.rows[i].pos == 'MF'){
                datasize = datasizeMfD + datasizeMfF + datasizeMf;
            } else if (res.rows[i].pos == 'FW'){
                datasize = datasizeFw;
            } else if (res.rows[i].pos == 'MF,FW'){
                datasize = datasizeMfF + datasizeMf;
            } else if (res.rows[i].pos == 'FW,MF'){
                datasize = datasizeFw;
            } else if(res.rows[i].pos == 'DF,MF' || res.rows[i].pos ==  'MF,DF'){
                datasize = datasizeMfD + datasizeMf;
            } else if(res.rows[i].pos == 'DF,FW'){
                datasize = datasizeDf;
            } else if(res.rows[i].pos == 'FW,DF'){
                datasize = datasizeFw;
            }
            let med_cmppctPER = (position / datasize) * (100);
            if (med_cmppctPER == Infinity){
                med_cmppctPER = 0;
            }

            position = 0;
            

            
        for(let j = 0; j < res.rows.length;j++){
                if (res.rows[i].pos == res.rows[j].pos || res.rows[i].pos == 'MF' && res.rows[j].pos == 'MF,FW' ||res.rows[i].pos == 'DF' && res.rows[j].pos == 'DF,FW' || res.rows[i].pos  == 'DF,FW' && res.rows[j].pos == 'DF' || res.rows[i].pos == 'FW' && res.rows[j].pos == 'FW,DF' || res.rows[i].pos == 'FW,DF' && res.rows[j].pos == 'FW' ||res.rows[i].pos == 'FW,MF' && res.rows[j].pos == 'FW,DF' ||res.rows[i].pos == 'FW,DF' && res.rows[j].pos == 'FW,MF' || res.rows[i].pos == 'MF' && res.rows[j].pos == 'DF,MF' || res.rows[i].pos == 'MF' && res.rows[j].pos == 'MF,DF' || res.rows[i].pos == 'DF,MF' && res.rows[j].pos == 'MF' || res.rows[i].pos == 'DF,MF' && res.rows[j].pos == 'MF,DF' || res.rows[i].pos == 'MF,DF' && res.rows[j].pos == 'MF' || res.rows[i].pos == 'MF,DF' && res.rows[j].pos == 'DF,MF' || res.rows[i].pos == 'MF,FW' && res.rows[j].pos == 'MF'   || res.rows[i].pos == 'FW' && res.rows[j] == 'FW,MF' || res.rows[i].pos == 'FW,MF' && res.rows[j].pos == 'FW'){
                if ((parseFloat(res.rows[i].lon_cmppct)   >= parseFloat(res.rows[j].lon_cmppct) )){
                    position+=1
                }
            }
            }
            if (res.rows[i].pos == 'DF'){
                datasize = datasizeDf;
            } else if (res.rows[i].pos == 'MF'){
                datasize = datasizeMfD + datasizeMfF + datasizeMf;
            } else if (res.rows[i].pos == 'FW'){
                datasize = datasizeFw;
            } else if (res.rows[i].pos == 'MF,FW'){
                datasize = datasizeMfF + datasizeMf;
            } else if (res.rows[i].pos == 'FW,MF'){
                datasize = datasizeFw;
            } else if(res.rows[i].pos == 'DF,MF' || res.rows[i].pos ==  'MF,DF'){
                datasize = datasizeMfD + datasizeMf;
            } else if(res.rows[i].pos == 'DF,FW'){
                datasize = datasizeDf;
            } else if(res.rows[i].pos == 'FW,DF'){
                datasize = datasizeFw;
            }
            let lon_cmppctPER = (position / datasize) * (100);
            if (lon_cmppctPER == Infinity){
                lon_cmppctPER = 0;
            }

            position = 0;
            

            
        for(let j = 0; j < res.rows.length;j++){
                if (res.rows[i].pos == res.rows[j].pos || res.rows[i].pos == 'MF' && res.rows[j].pos == 'MF,FW' ||res.rows[i].pos == 'DF' && res.rows[j].pos == 'DF,FW' || res.rows[i].pos  == 'DF,FW' && res.rows[j].pos == 'DF' || res.rows[i].pos == 'FW' && res.rows[j].pos == 'FW,DF' || res.rows[i].pos == 'FW,DF' && res.rows[j].pos == 'FW' ||res.rows[i].pos == 'FW,MF' && res.rows[j].pos == 'FW,DF' ||res.rows[i].pos == 'FW,DF' && res.rows[j].pos == 'FW,MF' || res.rows[i].pos == 'MF' && res.rows[j].pos == 'DF,MF' || res.rows[i].pos == 'MF' && res.rows[j].pos == 'MF,DF' || res.rows[i].pos == 'DF,MF' && res.rows[j].pos == 'MF' || res.rows[i].pos == 'DF,MF' && res.rows[j].pos == 'MF,DF' || res.rows[i].pos == 'MF,DF' && res.rows[j].pos == 'MF' || res.rows[i].pos == 'MF,DF' && res.rows[j].pos == 'DF,MF' || res.rows[i].pos == 'MF,FW' && res.rows[j].pos == 'MF'   || res.rows[i].pos == 'FW' && res.rows[j] == 'FW,MF' || res.rows[i].pos == 'FW,MF' && res.rows[j].pos == 'FW'){
                if ((parseFloat(res.rows[i].ast)  / parseFloat(res.rows[i]._90s)   >= parseFloat(res.rows[j].ast)  / parseFloat(res.rows[i]._90s) )){
                    position+=1
                }
            }
            }
            if (res.rows[i].pos == 'DF'){
                datasize = datasizeDf;
            } else if (res.rows[i].pos == 'MF'){
                datasize = datasizeMfD + datasizeMfF + datasizeMf;
            } else if (res.rows[i].pos == 'FW'){
                datasize = datasizeFw;
            } else if (res.rows[i].pos == 'MF,FW'){
                datasize = datasizeMfF + datasizeMf;
            } else if (res.rows[i].pos == 'FW,MF'){
                datasize = datasizeFw;
            } else if(res.rows[i].pos == 'DF,MF' || res.rows[i].pos ==  'MF,DF'){
                datasize = datasizeMfD + datasizeMf;
            } else if(res.rows[i].pos == 'DF,FW'){
                datasize = datasizeDf;
            } else if(res.rows[i].pos == 'FW,DF'){
                datasize = datasizeFw;
            }
            let ast90PER = (position / datasize) * (100);
            if (ast90PER == Infinity){
                ast90PER = 0;
            }

            position = 0;
            

            
        for(let j = 0; j < res.rows.length;j++){
                if (res.rows[i].pos == res.rows[j].pos || res.rows[i].pos == 'MF' && res.rows[j].pos == 'MF,FW' ||res.rows[i].pos == 'DF' && res.rows[j].pos == 'DF,FW' || res.rows[i].pos  == 'DF,FW' && res.rows[j].pos == 'DF' || res.rows[i].pos == 'FW' && res.rows[j].pos == 'FW,DF' || res.rows[i].pos == 'FW,DF' && res.rows[j].pos == 'FW' ||res.rows[i].pos == 'FW,MF' && res.rows[j].pos == 'FW,DF' ||res.rows[i].pos == 'FW,DF' && res.rows[j].pos == 'FW,MF' || res.rows[i].pos == 'MF' && res.rows[j].pos == 'DF,MF' || res.rows[i].pos == 'MF' && res.rows[j].pos == 'MF,DF' || res.rows[i].pos == 'DF,MF' && res.rows[j].pos == 'MF' || res.rows[i].pos == 'DF,MF' && res.rows[j].pos == 'MF,DF' || res.rows[i].pos == 'MF,DF' && res.rows[j].pos == 'MF' || res.rows[i].pos == 'MF,DF' && res.rows[j].pos == 'DF,MF' || res.rows[i].pos == 'MF,FW' && res.rows[j].pos == 'MF'   || res.rows[i].pos == 'FW' && res.rows[j] == 'FW,MF' || res.rows[i].pos == 'FW,MF' && res.rows[j].pos == 'FW'){
                if ((parseFloat(res.rows[i].xag)  / parseFloat(res.rows[i]._90s)   >= parseFloat(res.rows[j].xag)  / parseFloat(res.rows[i]._90s) )){
                    position+=1
                }
            }
            }
            if (res.rows[i].pos == 'DF'){
                datasize = datasizeDf;
            } else if (res.rows[i].pos == 'MF'){
                datasize = datasizeMfD + datasizeMfF + datasizeMf;
            } else if (res.rows[i].pos == 'FW'){
                datasize = datasizeFw;
            } else if (res.rows[i].pos == 'MF,FW'){
                datasize = datasizeMfF + datasizeMf;
            } else if (res.rows[i].pos == 'FW,MF'){
                datasize = datasizeFw;
            } else if(res.rows[i].pos == 'DF,MF' || res.rows[i].pos ==  'MF,DF'){
                datasize = datasizeMfD + datasizeMf;
            } else if(res.rows[i].pos == 'DF,FW'){
                datasize = datasizeDf;
            } else if(res.rows[i].pos == 'FW,DF'){
                datasize = datasizeFw;
            }
            let xag90PER = (position / datasize) * (100);
            if (xag90PER == Infinity){
                xag90PER = 0;
            }

            position = 0;
            

            
        for(let j = 0; j < res.rows.length;j++){
                if (res.rows[i].pos == res.rows[j].pos || res.rows[i].pos == 'MF' && res.rows[j].pos == 'MF,FW' ||res.rows[i].pos == 'DF' && res.rows[j].pos == 'DF,FW' || res.rows[i].pos  == 'DF,FW' && res.rows[j].pos == 'DF' || res.rows[i].pos == 'FW' && res.rows[j].pos == 'FW,DF' || res.rows[i].pos == 'FW,DF' && res.rows[j].pos == 'FW' ||res.rows[i].pos == 'FW,MF' && res.rows[j].pos == 'FW,DF' ||res.rows[i].pos == 'FW,DF' && res.rows[j].pos == 'FW,MF' || res.rows[i].pos == 'MF' && res.rows[j].pos == 'DF,MF' || res.rows[i].pos == 'MF' && res.rows[j].pos == 'MF,DF' || res.rows[i].pos == 'DF,MF' && res.rows[j].pos == 'MF' || res.rows[i].pos == 'DF,MF' && res.rows[j].pos == 'MF,DF' || res.rows[i].pos == 'MF,DF' && res.rows[j].pos == 'MF' || res.rows[i].pos == 'MF,DF' && res.rows[j].pos == 'DF,MF' || res.rows[i].pos == 'MF,FW' && res.rows[j].pos == 'MF'   || res.rows[i].pos == 'FW' && res.rows[j] == 'FW,MF' || res.rows[i].pos == 'FW,MF' && res.rows[j].pos == 'FW'){
                if ((parseFloat(res.rows[i].xa)  / parseFloat(res.rows[i]._90s)   >= parseFloat(res.rows[j].xa)  / parseFloat(res.rows[i]._90s) )){
                    position+=1
                }
            }
            }
            if (res.rows[i].pos == 'DF'){
                datasize = datasizeDf;
            } else if (res.rows[i].pos == 'MF'){
                datasize = datasizeMfD + datasizeMfF + datasizeMf;
            } else if (res.rows[i].pos == 'FW'){
                datasize = datasizeFw;
            } else if (res.rows[i].pos == 'MF,FW'){
                datasize = datasizeMfF + datasizeMf;
            } else if (res.rows[i].pos == 'FW,MF'){
                datasize = datasizeFw;
            } else if(res.rows[i].pos == 'DF,MF' || res.rows[i].pos ==  'MF,DF'){
                datasize = datasizeMfD + datasizeMf;
            } else if(res.rows[i].pos == 'DF,FW'){
                datasize = datasizeDf;
            } else if(res.rows[i].pos == 'FW,DF'){
                datasize = datasizeFw;
            }
            let xa90PER = (position / datasize) * (100);
            if (xa90PER == Infinity){
                xa90PER = 0;
            }

            position = 0;
            

            
        for(let j = 0; j < res.rows.length;j++){
                if (res.rows[i].pos == res.rows[j].pos || res.rows[i].pos == 'MF' && res.rows[j].pos == 'MF,FW' ||res.rows[i].pos == 'DF' && res.rows[j].pos == 'DF,FW' || res.rows[i].pos  == 'DF,FW' && res.rows[j].pos == 'DF' || res.rows[i].pos == 'FW' && res.rows[j].pos == 'FW,DF' || res.rows[i].pos == 'FW,DF' && res.rows[j].pos == 'FW' ||res.rows[i].pos == 'FW,MF' && res.rows[j].pos == 'FW,DF' ||res.rows[i].pos == 'FW,DF' && res.rows[j].pos == 'FW,MF' || res.rows[i].pos == 'MF' && res.rows[j].pos == 'DF,MF' || res.rows[i].pos == 'MF' && res.rows[j].pos == 'MF,DF' || res.rows[i].pos == 'DF,MF' && res.rows[j].pos == 'MF' || res.rows[i].pos == 'DF,MF' && res.rows[j].pos == 'MF,DF' || res.rows[i].pos == 'MF,DF' && res.rows[j].pos == 'MF' || res.rows[i].pos == 'MF,DF' && res.rows[j].pos == 'DF,MF' || res.rows[i].pos == 'MF,FW' && res.rows[j].pos == 'MF'   || res.rows[i].pos == 'FW' && res.rows[j] == 'FW,MF' || res.rows[i].pos == 'FW,MF' && res.rows[j].pos == 'FW'){
                if ((parseFloat(res.rows[i].kp)  / parseFloat(res.rows[i]._90s)   >= parseFloat(res.rows[j].kp)  / parseFloat(res.rows[i]._90s) )){
                    position+=1
                }
            }
            }
            if (res.rows[i].pos == 'DF'){
                datasize = datasizeDf;
            } else if (res.rows[i].pos == 'MF'){
                datasize = datasizeMfD + datasizeMfF + datasizeMf;
            } else if (res.rows[i].pos == 'FW'){
                datasize = datasizeFw;
            } else if (res.rows[i].pos == 'MF,FW'){
                datasize = datasizeMfF + datasizeMf;
            } else if (res.rows[i].pos == 'FW,MF'){
                datasize = datasizeFw;
            } else if(res.rows[i].pos == 'DF,MF' || res.rows[i].pos ==  'MF,DF'){
                datasize = datasizeMfD + datasizeMf;
            } else if(res.rows[i].pos == 'DF,FW'){
                datasize = datasizeDf;
            } else if(res.rows[i].pos == 'FW,DF'){
                datasize = datasizeFw;
            }
            let kp90PER = (position / datasize) * (100);
            if (kp90PER == Infinity){
                kp90PER = 0;
            }

            position = 0;
            

            
        for(let j = 0; j < res.rows.length;j++){
                if (res.rows[i].pos == res.rows[j].pos || res.rows[i].pos == 'MF' && res.rows[j].pos == 'MF,FW' ||res.rows[i].pos == 'DF' && res.rows[j].pos == 'DF,FW' || res.rows[i].pos  == 'DF,FW' && res.rows[j].pos == 'DF' || res.rows[i].pos == 'FW' && res.rows[j].pos == 'FW,DF' || res.rows[i].pos == 'FW,DF' && res.rows[j].pos == 'FW' ||res.rows[i].pos == 'FW,MF' && res.rows[j].pos == 'FW,DF' ||res.rows[i].pos == 'FW,DF' && res.rows[j].pos == 'FW,MF' || res.rows[i].pos == 'MF' && res.rows[j].pos == 'DF,MF' || res.rows[i].pos == 'MF' && res.rows[j].pos == 'MF,DF' || res.rows[i].pos == 'DF,MF' && res.rows[j].pos == 'MF' || res.rows[i].pos == 'DF,MF' && res.rows[j].pos == 'MF,DF' || res.rows[i].pos == 'MF,DF' && res.rows[j].pos == 'MF' || res.rows[i].pos == 'MF,DF' && res.rows[j].pos == 'DF,MF' || res.rows[i].pos == 'MF,FW' && res.rows[j].pos == 'MF'   || res.rows[i].pos == 'FW' && res.rows[j] == 'FW,MF' || res.rows[i].pos == 'FW,MF' && res.rows[j].pos == 'FW'){
                if ((parseFloat(res.rows[i].fin3rd_p)  / parseFloat(res.rows[i]._90s)   >= parseFloat(res.rows[j].fin3rd_p)  / parseFloat(res.rows[i]._90s) )){
                    position+=1
                }
            }
            }
            if (res.rows[i].pos == 'DF'){
                datasize = datasizeDf;
            } else if (res.rows[i].pos == 'MF'){
                datasize = datasizeMfD + datasizeMfF + datasizeMf;
            } else if (res.rows[i].pos == 'FW'){
                datasize = datasizeFw;
            } else if (res.rows[i].pos == 'MF,FW'){
                datasize = datasizeMfF + datasizeMf;
            } else if (res.rows[i].pos == 'FW,MF'){
                datasize = datasizeFw;
            } else if(res.rows[i].pos == 'DF,MF' || res.rows[i].pos ==  'MF,DF'){
                datasize = datasizeMfD + datasizeMf;
            } else if(res.rows[i].pos == 'DF,FW'){
                datasize = datasizeDf;
            } else if(res.rows[i].pos == 'FW,DF'){
                datasize = datasizeFw;
            }
            let fin3rd_p90PER = (position / datasize) * (100);
            if (fin3rd_p90PER == Infinity){
                fin3rd_p90PER = 0;
            }

            position = 0;
            

            
        for(let j = 0; j < res.rows.length;j++){
                if (res.rows[i].pos == res.rows[j].pos || res.rows[i].pos == 'MF' && res.rows[j].pos == 'MF,FW' ||res.rows[i].pos == 'DF' && res.rows[j].pos == 'DF,FW' || res.rows[i].pos  == 'DF,FW' && res.rows[j].pos == 'DF' || res.rows[i].pos == 'FW' && res.rows[j].pos == 'FW,DF' || res.rows[i].pos == 'FW,DF' && res.rows[j].pos == 'FW' ||res.rows[i].pos == 'FW,MF' && res.rows[j].pos == 'FW,DF' ||res.rows[i].pos == 'FW,DF' && res.rows[j].pos == 'FW,MF' || res.rows[i].pos == 'MF' && res.rows[j].pos == 'DF,MF' || res.rows[i].pos == 'MF' && res.rows[j].pos == 'MF,DF' || res.rows[i].pos == 'DF,MF' && res.rows[j].pos == 'MF' || res.rows[i].pos == 'DF,MF' && res.rows[j].pos == 'MF,DF' || res.rows[i].pos == 'MF,DF' && res.rows[j].pos == 'MF' || res.rows[i].pos == 'MF,DF' && res.rows[j].pos == 'DF,MF' || res.rows[i].pos == 'MF,FW' && res.rows[j].pos == 'MF'   || res.rows[i].pos == 'FW' && res.rows[j] == 'FW,MF' || res.rows[i].pos == 'FW,MF' && res.rows[j].pos == 'FW'){
                if ((parseFloat(res.rows[i].p_inpen)  / parseFloat(res.rows[i]._90s)   >= parseFloat(res.rows[j].p_inpen)  / parseFloat(res.rows[i]._90s) )){
                    position+=1
                }
            }
            }
            if (res.rows[i].pos == 'DF'){
                datasize = datasizeDf;
            } else if (res.rows[i].pos == 'MF'){
                datasize = datasizeMfD + datasizeMfF + datasizeMf;
            } else if (res.rows[i].pos == 'FW'){
                datasize = datasizeFw;
            } else if (res.rows[i].pos == 'MF,FW'){
                datasize = datasizeMfF + datasizeMf;
            } else if (res.rows[i].pos == 'FW,MF'){
                datasize = datasizeFw;
            } else if(res.rows[i].pos == 'DF,MF' || res.rows[i].pos ==  'MF,DF'){
                datasize = datasizeMfD + datasizeMf;
            } else if(res.rows[i].pos == 'DF,FW'){
                datasize = datasizeDf;
            } else if(res.rows[i].pos == 'FW,DF'){
                datasize = datasizeFw;
            }
            let p_inpen90PER = (position / datasize) * (100);
            if (p_inpen90PER == Infinity){
                p_inpen90PER = 0;
            }

            position = 0;
            

            
        for(let j = 0; j < res.rows.length;j++){
                if (res.rows[i].pos == res.rows[j].pos || res.rows[i].pos == 'MF' && res.rows[j].pos == 'MF,FW' ||res.rows[i].pos == 'DF' && res.rows[j].pos == 'DF,FW' || res.rows[i].pos  == 'DF,FW' && res.rows[j].pos == 'DF' || res.rows[i].pos == 'FW' && res.rows[j].pos == 'FW,DF' || res.rows[i].pos == 'FW,DF' && res.rows[j].pos == 'FW' ||res.rows[i].pos == 'FW,MF' && res.rows[j].pos == 'FW,DF' ||res.rows[i].pos == 'FW,DF' && res.rows[j].pos == 'FW,MF' || res.rows[i].pos == 'MF' && res.rows[j].pos == 'DF,MF' || res.rows[i].pos == 'MF' && res.rows[j].pos == 'MF,DF' || res.rows[i].pos == 'DF,MF' && res.rows[j].pos == 'MF' || res.rows[i].pos == 'DF,MF' && res.rows[j].pos == 'MF,DF' || res.rows[i].pos == 'MF,DF' && res.rows[j].pos == 'MF' || res.rows[i].pos == 'MF,DF' && res.rows[j].pos == 'DF,MF' || res.rows[i].pos == 'MF,FW' && res.rows[j].pos == 'MF'   || res.rows[i].pos == 'FW' && res.rows[j] == 'FW,MF' || res.rows[i].pos == 'FW,MF' && res.rows[j].pos == 'FW'){
                if ((parseFloat(res.rows[i].crs_inpen)  / parseFloat(res.rows[i]._90s)   >= parseFloat(res.rows[j].crs_inpen)  / parseFloat(res.rows[i]._90s) )){
                    position+=1
                }
            }
            }
            if (res.rows[i].pos == 'DF'){
                datasize = datasizeDf;
            } else if (res.rows[i].pos == 'MF'){
                datasize = datasizeMfD + datasizeMfF + datasizeMf;
            } else if (res.rows[i].pos == 'FW'){
                datasize = datasizeFw;
            } else if (res.rows[i].pos == 'MF,FW'){
                datasize = datasizeMfF + datasizeMf;
            } else if (res.rows[i].pos == 'FW,MF'){
                datasize = datasizeFw;
            } else if(res.rows[i].pos == 'DF,MF' || res.rows[i].pos ==  'MF,DF'){
                datasize = datasizeMfD + datasizeMf;
            } else if(res.rows[i].pos == 'DF,FW'){
                datasize = datasizeDf;
            } else if(res.rows[i].pos == 'FW,DF'){
                datasize = datasizeFw;
            }
            let crs_inpen90PER = (position / datasize) * (100);
            if (crs_inpen90PER == Infinity){
                crs_inpen90PER = 0;
            }

            position = 0;
            

            
        for(let j = 0; j < res.rows.length;j++){
                if (res.rows[i].pos == res.rows[j].pos || res.rows[i].pos == 'MF' && res.rows[j].pos == 'MF,FW' ||res.rows[i].pos == 'DF' && res.rows[j].pos == 'DF,FW' || res.rows[i].pos  == 'DF,FW' && res.rows[j].pos == 'DF' || res.rows[i].pos == 'FW' && res.rows[j].pos == 'FW,DF' || res.rows[i].pos == 'FW,DF' && res.rows[j].pos == 'FW' ||res.rows[i].pos == 'FW,MF' && res.rows[j].pos == 'FW,DF' ||res.rows[i].pos == 'FW,DF' && res.rows[j].pos == 'FW,MF' || res.rows[i].pos == 'MF' && res.rows[j].pos == 'DF,MF' || res.rows[i].pos == 'MF' && res.rows[j].pos == 'MF,DF' || res.rows[i].pos == 'DF,MF' && res.rows[j].pos == 'MF' || res.rows[i].pos == 'DF,MF' && res.rows[j].pos == 'MF,DF' || res.rows[i].pos == 'MF,DF' && res.rows[j].pos == 'MF' || res.rows[i].pos == 'MF,DF' && res.rows[j].pos == 'DF,MF' || res.rows[i].pos == 'MF,FW' && res.rows[j].pos == 'MF'   || res.rows[i].pos == 'FW' && res.rows[j] == 'FW,MF' || res.rows[i].pos == 'FW,MF' && res.rows[j].pos == 'FW'){
                if ((parseFloat(res.rows[i].prog_p)  / parseFloat(res.rows[i]._90s)   >= parseFloat(res.rows[j].prog_p)  / parseFloat(res.rows[i]._90s) )){
                    position+=1
                }
            }
            }
            if (res.rows[i].pos == 'DF'){
                datasize = datasizeDf;
            } else if (res.rows[i].pos == 'MF'){
                datasize = datasizeMfD + datasizeMfF + datasizeMf;
            } else if (res.rows[i].pos == 'FW'){
                datasize = datasizeFw;
            } else if (res.rows[i].pos == 'MF,FW'){
                datasize = datasizeMfF + datasizeMf;
            } else if (res.rows[i].pos == 'FW,MF'){
                datasize = datasizeFw;
            } else if(res.rows[i].pos == 'DF,MF' || res.rows[i].pos ==  'MF,DF'){
                datasize = datasizeMfD + datasizeMf;
            } else if(res.rows[i].pos == 'DF,FW'){
                datasize = datasizeDf;
            } else if(res.rows[i].pos == 'FW,DF'){
                datasize = datasizeFw;
            }
            let prog_p90PER = (position / datasize) * (100);
            if (prog_p90PER == Infinity){
                prog_p90PER = 0;
            }

            position = 0;
            

            
        for(let j = 0; j < res.rows.length;j++){
                if (res.rows[i].pos == res.rows[j].pos || res.rows[i].pos == 'MF' && res.rows[j].pos == 'MF,FW' ||res.rows[i].pos == 'DF' && res.rows[j].pos == 'DF,FW' || res.rows[i].pos  == 'DF,FW' && res.rows[j].pos == 'DF' || res.rows[i].pos == 'FW' && res.rows[j].pos == 'FW,DF' || res.rows[i].pos == 'FW,DF' && res.rows[j].pos == 'FW' ||res.rows[i].pos == 'FW,MF' && res.rows[j].pos == 'FW,DF' ||res.rows[i].pos == 'FW,DF' && res.rows[j].pos == 'FW,MF' || res.rows[i].pos == 'MF' && res.rows[j].pos == 'DF,MF' || res.rows[i].pos == 'MF' && res.rows[j].pos == 'MF,DF' || res.rows[i].pos == 'DF,MF' && res.rows[j].pos == 'MF' || res.rows[i].pos == 'DF,MF' && res.rows[j].pos == 'MF,DF' || res.rows[i].pos == 'MF,DF' && res.rows[j].pos == 'MF' || res.rows[i].pos == 'MF,DF' && res.rows[j].pos == 'DF,MF' || res.rows[i].pos == 'MF,FW' && res.rows[j].pos == 'MF'   || res.rows[i].pos == 'FW' && res.rows[j] == 'FW,MF' || res.rows[i].pos == 'FW,MF' && res.rows[j].pos == 'FW'){
                if ((parseFloat(res.rows[i].tkl)  / parseFloat(res.rows[i]._90s)   >= parseFloat(res.rows[j].tkl)  / parseFloat(res.rows[i]._90s) )){
                    position+=1
                }
            }
            }
            if (res.rows[i].pos == 'DF'){
                datasize = datasizeDf;
            } else if (res.rows[i].pos == 'MF'){
                datasize = datasizeMfD + datasizeMfF + datasizeMf;
            } else if (res.rows[i].pos == 'FW'){
                datasize = datasizeFw;
            } else if (res.rows[i].pos == 'MF,FW'){
                datasize = datasizeMfF + datasizeMf;
            } else if (res.rows[i].pos == 'FW,MF'){
                datasize = datasizeFw;
            } else if(res.rows[i].pos == 'DF,MF' || res.rows[i].pos ==  'MF,DF'){
                datasize = datasizeMfD + datasizeMf;
            } else if(res.rows[i].pos == 'DF,FW'){
                datasize = datasizeDf;
            } else if(res.rows[i].pos == 'FW,DF'){
                datasize = datasizeFw;
            }
            let tkl90PER = (position / datasize) * (100);
            if (tkl90PER == Infinity){
                tkl90PER = 0;
            }

            position = 0;
            

            
        for(let j = 0; j < res.rows.length;j++){
                if (res.rows[i].pos == res.rows[j].pos || res.rows[i].pos == 'MF' && res.rows[j].pos == 'MF,FW' ||res.rows[i].pos == 'DF' && res.rows[j].pos == 'DF,FW' || res.rows[i].pos  == 'DF,FW' && res.rows[j].pos == 'DF' || res.rows[i].pos == 'FW' && res.rows[j].pos == 'FW,DF' || res.rows[i].pos == 'FW,DF' && res.rows[j].pos == 'FW' ||res.rows[i].pos == 'FW,MF' && res.rows[j].pos == 'FW,DF' ||res.rows[i].pos == 'FW,DF' && res.rows[j].pos == 'FW,MF' || res.rows[i].pos == 'MF' && res.rows[j].pos == 'DF,MF' || res.rows[i].pos == 'MF' && res.rows[j].pos == 'MF,DF' || res.rows[i].pos == 'DF,MF' && res.rows[j].pos == 'MF' || res.rows[i].pos == 'DF,MF' && res.rows[j].pos == 'MF,DF' || res.rows[i].pos == 'MF,DF' && res.rows[j].pos == 'MF' || res.rows[i].pos == 'MF,DF' && res.rows[j].pos == 'DF,MF' || res.rows[i].pos == 'MF,FW' && res.rows[j].pos == 'MF'   || res.rows[i].pos == 'FW' && res.rows[j] == 'FW,MF' || res.rows[i].pos == 'FW,MF' && res.rows[j].pos == 'FW'){
                if ((parseFloat(res.rows[i].tkl_w)  / parseFloat(res.rows[i]._90s)   >= parseFloat(res.rows[j].tkl_w)  / parseFloat(res.rows[i]._90s) )){
                    position+=1
                }
            }
            }
            if (res.rows[i].pos == 'DF'){
                datasize = datasizeDf;
            } else if (res.rows[i].pos == 'MF'){
                datasize = datasizeMfD + datasizeMfF + datasizeMf;
            } else if (res.rows[i].pos == 'FW'){
                datasize = datasizeFw;
            } else if (res.rows[i].pos == 'MF,FW'){
                datasize = datasizeMfF + datasizeMf;
            } else if (res.rows[i].pos == 'FW,MF'){
                datasize = datasizeFw;
            } else if(res.rows[i].pos == 'DF,MF' || res.rows[i].pos ==  'MF,DF'){
                datasize = datasizeMfD + datasizeMf;
            } else if(res.rows[i].pos == 'DF,FW'){
                datasize = datasizeDf;
            } else if(res.rows[i].pos == 'FW,DF'){
                datasize = datasizeFw;
            }
            let tkl_w90PER = (position / datasize) * (100);
            if (tkl_w90PER == Infinity){
                tkl_w90PER = 0;
            }

            position = 0;
            

            
        for(let j = 0; j < res.rows.length;j++){
                if (res.rows[i].pos == res.rows[j].pos || res.rows[i].pos == 'MF' && res.rows[j].pos == 'MF,FW' ||res.rows[i].pos == 'DF' && res.rows[j].pos == 'DF,FW' || res.rows[i].pos  == 'DF,FW' && res.rows[j].pos == 'DF' || res.rows[i].pos == 'FW' && res.rows[j].pos == 'FW,DF' || res.rows[i].pos == 'FW,DF' && res.rows[j].pos == 'FW' ||res.rows[i].pos == 'FW,MF' && res.rows[j].pos == 'FW,DF' ||res.rows[i].pos == 'FW,DF' && res.rows[j].pos == 'FW,MF' || res.rows[i].pos == 'MF' && res.rows[j].pos == 'DF,MF' || res.rows[i].pos == 'MF' && res.rows[j].pos == 'MF,DF' || res.rows[i].pos == 'DF,MF' && res.rows[j].pos == 'MF' || res.rows[i].pos == 'DF,MF' && res.rows[j].pos == 'MF,DF' || res.rows[i].pos == 'MF,DF' && res.rows[j].pos == 'MF' || res.rows[i].pos == 'MF,DF' && res.rows[j].pos == 'DF,MF' || res.rows[i].pos == 'MF,FW' && res.rows[j].pos == 'MF'   || res.rows[i].pos == 'FW' && res.rows[j] == 'FW,MF' || res.rows[i].pos == 'FW,MF' && res.rows[j].pos == 'FW'){
                if ((parseFloat(res.rows[i].tkl_att3rd)  / parseFloat(res.rows[i]._90s)   >= parseFloat(res.rows[j].tkl_att3rd)  / parseFloat(res.rows[i]._90s) )){
                    position+=1
                }
            }
            }
            if (res.rows[i].pos == 'DF'){
                datasize = datasizeDf;
            } else if (res.rows[i].pos == 'MF'){
                datasize = datasizeMfD + datasizeMfF + datasizeMf;
            } else if (res.rows[i].pos == 'FW'){
                datasize = datasizeFw;
            } else if (res.rows[i].pos == 'MF,FW'){
                datasize = datasizeMfF + datasizeMf;
            } else if (res.rows[i].pos == 'FW,MF'){
                datasize = datasizeFw;
            } else if(res.rows[i].pos == 'DF,MF' || res.rows[i].pos ==  'MF,DF'){
                datasize = datasizeMfD + datasizeMf;
            } else if(res.rows[i].pos == 'DF,FW'){
                datasize = datasizeDf;
            } else if(res.rows[i].pos == 'FW,DF'){
                datasize = datasizeFw;
            }
            let tkl_att3rd90PER = (position / datasize) * (100);
            if (tkl_att3rd90PER == Infinity){
                tkl_att3rd90PER = 0;
            }

            position = 0;
            

            
        for(let j = 0; j < res.rows.length;j++){
                if (res.rows[i].pos == res.rows[j].pos || res.rows[i].pos == 'MF' && res.rows[j].pos == 'MF,FW' ||res.rows[i].pos == 'DF' && res.rows[j].pos == 'DF,FW' || res.rows[i].pos  == 'DF,FW' && res.rows[j].pos == 'DF' || res.rows[i].pos == 'FW' && res.rows[j].pos == 'FW,DF' || res.rows[i].pos == 'FW,DF' && res.rows[j].pos == 'FW' ||res.rows[i].pos == 'FW,MF' && res.rows[j].pos == 'FW,DF' ||res.rows[i].pos == 'FW,DF' && res.rows[j].pos == 'FW,MF' || res.rows[i].pos == 'MF' && res.rows[j].pos == 'DF,MF' || res.rows[i].pos == 'MF' && res.rows[j].pos == 'MF,DF' || res.rows[i].pos == 'DF,MF' && res.rows[j].pos == 'MF' || res.rows[i].pos == 'DF,MF' && res.rows[j].pos == 'MF,DF' || res.rows[i].pos == 'MF,DF' && res.rows[j].pos == 'MF' || res.rows[i].pos == 'MF,DF' && res.rows[j].pos == 'DF,MF' || res.rows[i].pos == 'MF,FW' && res.rows[j].pos == 'MF'   || res.rows[i].pos == 'FW' && res.rows[j] == 'FW,MF' || res.rows[i].pos == 'FW,MF' && res.rows[j].pos == 'FW'){
                if ((parseFloat(res.rows[i].drb_tkl)  / parseFloat(res.rows[i]._90s)   >= parseFloat(res.rows[j].drb_tkl)  / parseFloat(res.rows[i]._90s) )){
                    position+=1
                }
            }
            }
            if (res.rows[i].pos == 'DF'){
                datasize = datasizeDf;
            } else if (res.rows[i].pos == 'MF'){
                datasize = datasizeMfD + datasizeMfF + datasizeMf;
            } else if (res.rows[i].pos == 'FW'){
                datasize = datasizeFw;
            } else if (res.rows[i].pos == 'MF,FW'){
                datasize = datasizeMfF + datasizeMf;
            } else if (res.rows[i].pos == 'FW,MF'){
                datasize = datasizeFw;
            } else if(res.rows[i].pos == 'DF,MF' || res.rows[i].pos ==  'MF,DF'){
                datasize = datasizeMfD + datasizeMf;
            } else if(res.rows[i].pos == 'DF,FW'){
                datasize = datasizeDf;
            } else if(res.rows[i].pos == 'FW,DF'){
                datasize = datasizeFw;
            }
            let drb_tkl90PER = (position / datasize) * (100);
            if (drb_tkl90PER == Infinity){
                drb_tkl90PER = 0;
            }

            position = 0;
            

            
        for(let j = 0; j < res.rows.length;j++){
                if (res.rows[i].pos == res.rows[j].pos || res.rows[i].pos == 'MF' && res.rows[j].pos == 'MF,FW' ||res.rows[i].pos == 'DF' && res.rows[j].pos == 'DF,FW' || res.rows[i].pos  == 'DF,FW' && res.rows[j].pos == 'DF' || res.rows[i].pos == 'FW' && res.rows[j].pos == 'FW,DF' || res.rows[i].pos == 'FW,DF' && res.rows[j].pos == 'FW' ||res.rows[i].pos == 'FW,MF' && res.rows[j].pos == 'FW,DF' ||res.rows[i].pos == 'FW,DF' && res.rows[j].pos == 'FW,MF' || res.rows[i].pos == 'MF' && res.rows[j].pos == 'DF,MF' || res.rows[i].pos == 'MF' && res.rows[j].pos == 'MF,DF' || res.rows[i].pos == 'DF,MF' && res.rows[j].pos == 'MF' || res.rows[i].pos == 'DF,MF' && res.rows[j].pos == 'MF,DF' || res.rows[i].pos == 'MF,DF' && res.rows[j].pos == 'MF' || res.rows[i].pos == 'MF,DF' && res.rows[j].pos == 'DF,MF' || res.rows[i].pos == 'MF,FW' && res.rows[j].pos == 'MF'   || res.rows[i].pos == 'FW' && res.rows[j] == 'FW,MF' || res.rows[i].pos == 'FW,MF' && res.rows[j].pos == 'FW'){
                if ((parseFloat(res.rows[i].drb_chl)  / parseFloat(res.rows[i]._90s)   >= parseFloat(res.rows[j].drb_chl)  / parseFloat(res.rows[i]._90s) )){
                    position+=1
                }
            }
            }
            if (res.rows[i].pos == 'DF'){
                datasize = datasizeDf;
            } else if (res.rows[i].pos == 'MF'){
                datasize = datasizeMfD + datasizeMfF + datasizeMf;
            } else if (res.rows[i].pos == 'FW'){
                datasize = datasizeFw;
            } else if (res.rows[i].pos == 'MF,FW'){
                datasize = datasizeMfF + datasizeMf;
            } else if (res.rows[i].pos == 'FW,MF'){
                datasize = datasizeFw;
            } else if(res.rows[i].pos == 'DF,MF' || res.rows[i].pos ==  'MF,DF'){
                datasize = datasizeMfD + datasizeMf;
            } else if(res.rows[i].pos == 'DF,FW'){
                datasize = datasizeDf;
            } else if(res.rows[i].pos == 'FW,DF'){
                datasize = datasizeFw;
            }
            let drb_chl90PER = (position / datasize) * (100);
            if (drb_chl90PER == Infinity){
                drb_chl90PER = 0;
            }

            position = 0;
            

            
        for(let j = 0; j < res.rows.length;j++){
                if (res.rows[i].pos == res.rows[j].pos || res.rows[i].pos == 'MF' && res.rows[j].pos == 'MF,FW' ||res.rows[i].pos == 'DF' && res.rows[j].pos == 'DF,FW' || res.rows[i].pos  == 'DF,FW' && res.rows[j].pos == 'DF' || res.rows[i].pos == 'FW' && res.rows[j].pos == 'FW,DF' || res.rows[i].pos == 'FW,DF' && res.rows[j].pos == 'FW' ||res.rows[i].pos == 'FW,MF' && res.rows[j].pos == 'FW,DF' ||res.rows[i].pos == 'FW,DF' && res.rows[j].pos == 'FW,MF' || res.rows[i].pos == 'MF' && res.rows[j].pos == 'DF,MF' || res.rows[i].pos == 'MF' && res.rows[j].pos == 'MF,DF' || res.rows[i].pos == 'DF,MF' && res.rows[j].pos == 'MF' || res.rows[i].pos == 'DF,MF' && res.rows[j].pos == 'MF,DF' || res.rows[i].pos == 'MF,DF' && res.rows[j].pos == 'MF' || res.rows[i].pos == 'MF,DF' && res.rows[j].pos == 'DF,MF' || res.rows[i].pos == 'MF,FW' && res.rows[j].pos == 'MF'   || res.rows[i].pos == 'FW' && res.rows[j] == 'FW,MF' || res.rows[i].pos == 'FW,MF' && res.rows[j].pos == 'FW'){
                if ((parseFloat(res.rows[i].drb_tklpct)   >= parseFloat(res.rows[j].drb_tklpct) )){
                    position+=1
                }
            }
            }
            if (res.rows[i].pos == 'DF'){
                datasize = datasizeDf;
            } else if (res.rows[i].pos == 'MF'){
                datasize = datasizeMfD + datasizeMfF + datasizeMf;
            } else if (res.rows[i].pos == 'FW'){
                datasize = datasizeFw;
            } else if (res.rows[i].pos == 'MF,FW'){
                datasize = datasizeMfF + datasizeMf;
            } else if (res.rows[i].pos == 'FW,MF'){
                datasize = datasizeFw;
            } else if(res.rows[i].pos == 'DF,MF' || res.rows[i].pos ==  'MF,DF'){
                datasize = datasizeMfD + datasizeMf;
            } else if(res.rows[i].pos == 'DF,FW'){
                datasize = datasizeDf;
            } else if(res.rows[i].pos == 'FW,DF'){
                datasize = datasizeFw;
            }
            let drb_tklpctPER = (position / datasize) * (100);
            if (drb_tklpctPER == Infinity){
                drb_tkl90PER = 0;
            }

            position = 0;
            

            
        for(let j = 0; j < res.rows.length;j++){
                if (res.rows[i].pos == res.rows[j].pos || res.rows[i].pos == 'MF' && res.rows[j].pos == 'MF,FW' ||res.rows[i].pos == 'DF' && res.rows[j].pos == 'DF,FW' || res.rows[i].pos  == 'DF,FW' && res.rows[j].pos == 'DF' || res.rows[i].pos == 'FW' && res.rows[j].pos == 'FW,DF' || res.rows[i].pos == 'FW,DF' && res.rows[j].pos == 'FW' ||res.rows[i].pos == 'FW,MF' && res.rows[j].pos == 'FW,DF' ||res.rows[i].pos == 'FW,DF' && res.rows[j].pos == 'FW,MF' || res.rows[i].pos == 'MF' && res.rows[j].pos == 'DF,MF' || res.rows[i].pos == 'MF' && res.rows[j].pos == 'MF,DF' || res.rows[i].pos == 'DF,MF' && res.rows[j].pos == 'MF' || res.rows[i].pos == 'DF,MF' && res.rows[j].pos == 'MF,DF' || res.rows[i].pos == 'MF,DF' && res.rows[j].pos == 'MF' || res.rows[i].pos == 'MF,DF' && res.rows[j].pos == 'DF,MF' || res.rows[i].pos == 'MF,FW' && res.rows[j].pos == 'MF'   || res.rows[i].pos == 'FW' && res.rows[j] == 'FW,MF' || res.rows[i].pos == 'FW,MF' && res.rows[j].pos == 'FW'){
                if ((parseFloat(res.rows[i].chl_lst)  / parseFloat(res.rows[i]._90s)   <= parseFloat(res.rows[j].chl_lst)  / parseFloat(res.rows[i]._90s) )){
                    position+=1
                }
            }
            }
            if (res.rows[i].pos == 'DF'){
                datasize = datasizeDf;
            } else if (res.rows[i].pos == 'MF'){
                datasize = datasizeMfD + datasizeMfF + datasizeMf;
            } else if (res.rows[i].pos == 'FW'){
                datasize = datasizeFw;
            } else if (res.rows[i].pos == 'MF,FW'){
                datasize = datasizeMfF + datasizeMf;
            } else if (res.rows[i].pos == 'FW,MF'){
                datasize = datasizeFw;
            } else if(res.rows[i].pos == 'DF,MF' || res.rows[i].pos ==  'MF,DF'){
                datasize = datasizeMfD + datasizeMf;
            } else if(res.rows[i].pos == 'DF,FW'){
                datasize = datasizeDf;
            } else if(res.rows[i].pos == 'FW,DF'){
                datasize = datasizeFw;
            }
            let chl_lst90PER = (position / datasize) * (100);
            if (chl_lst90PER == Infinity){
                chl_lst90PER = 0;
            }

            position = 0;
            

            
        for(let j = 0; j < res.rows.length;j++){
                if (res.rows[i].pos == res.rows[j].pos || res.rows[i].pos == 'MF' && res.rows[j].pos == 'MF,FW' ||res.rows[i].pos == 'DF' && res.rows[j].pos == 'DF,FW' || res.rows[i].pos  == 'DF,FW' && res.rows[j].pos == 'DF' || res.rows[i].pos == 'FW' && res.rows[j].pos == 'FW,DF' || res.rows[i].pos == 'FW,DF' && res.rows[j].pos == 'FW' ||res.rows[i].pos == 'FW,MF' && res.rows[j].pos == 'FW,DF' ||res.rows[i].pos == 'FW,DF' && res.rows[j].pos == 'FW,MF' || res.rows[i].pos == 'MF' && res.rows[j].pos == 'DF,MF' || res.rows[i].pos == 'MF' && res.rows[j].pos == 'MF,DF' || res.rows[i].pos == 'DF,MF' && res.rows[j].pos == 'MF' || res.rows[i].pos == 'DF,MF' && res.rows[j].pos == 'MF,DF' || res.rows[i].pos == 'MF,DF' && res.rows[j].pos == 'MF' || res.rows[i].pos == 'MF,DF' && res.rows[j].pos == 'DF,MF' || res.rows[i].pos == 'MF,FW' && res.rows[j].pos == 'MF'   || res.rows[i].pos == 'FW' && res.rows[j] == 'FW,MF' || res.rows[i].pos == 'FW,MF' && res.rows[j].pos == 'FW'){
                if ((parseFloat(res.rows[i].blck)  / parseFloat(res.rows[i]._90s)   >= parseFloat(res.rows[j].blck)  / parseFloat(res.rows[i]._90s) )){
                    position+=1
                }
            }
            }
            if (res.rows[i].pos == 'DF'){
                datasize = datasizeDf;
            } else if (res.rows[i].pos == 'MF'){
                datasize = datasizeMfD + datasizeMfF + datasizeMf;
            } else if (res.rows[i].pos == 'FW'){
                datasize = datasizeFw;
            } else if (res.rows[i].pos == 'MF,FW'){
                datasize = datasizeMfF + datasizeMf;
            } else if (res.rows[i].pos == 'FW,MF'){
                datasize = datasizeFw;
            } else if(res.rows[i].pos == 'DF,MF' || res.rows[i].pos ==  'MF,DF'){
                datasize = datasizeMfD + datasizeMf;
            } else if(res.rows[i].pos == 'DF,FW'){
                datasize = datasizeDf;
            } else if(res.rows[i].pos == 'FW,DF'){
                datasize = datasizeFw;
            }
            let blck90PER = (position / datasize) * (100);
            if (blck90PER == Infinity){
                blck90PER = 0;
            }

            position = 0;
            

            
        for(let j = 0; j < res.rows.length;j++){
                if (res.rows[i].pos == res.rows[j].pos || res.rows[i].pos == 'MF' && res.rows[j].pos == 'MF,FW' ||res.rows[i].pos == 'DF' && res.rows[j].pos == 'DF,FW' || res.rows[i].pos  == 'DF,FW' && res.rows[j].pos == 'DF' || res.rows[i].pos == 'FW' && res.rows[j].pos == 'FW,DF' || res.rows[i].pos == 'FW,DF' && res.rows[j].pos == 'FW' ||res.rows[i].pos == 'FW,MF' && res.rows[j].pos == 'FW,DF' ||res.rows[i].pos == 'FW,DF' && res.rows[j].pos == 'FW,MF' || res.rows[i].pos == 'MF' && res.rows[j].pos == 'DF,MF' || res.rows[i].pos == 'MF' && res.rows[j].pos == 'MF,DF' || res.rows[i].pos == 'DF,MF' && res.rows[j].pos == 'MF' || res.rows[i].pos == 'DF,MF' && res.rows[j].pos == 'MF,DF' || res.rows[i].pos == 'MF,DF' && res.rows[j].pos == 'MF' || res.rows[i].pos == 'MF,DF' && res.rows[j].pos == 'DF,MF' || res.rows[i].pos == 'MF,FW' && res.rows[j].pos == 'MF'   || res.rows[i].pos == 'FW' && res.rows[j] == 'FW,MF' || res.rows[i].pos == 'FW,MF' && res.rows[j].pos == 'FW'){
                if ((parseFloat(res.rows[i].sh_blck)  / parseFloat(res.rows[i]._90s)   >= parseFloat(res.rows[j].sh_blck)  / parseFloat(res.rows[i]._90s) )){
                    position+=1
                }
            }
            }
            if (res.rows[i].pos == 'DF'){
                datasize = datasizeDf;
            } else if (res.rows[i].pos == 'MF'){
                datasize = datasizeMfD + datasizeMfF + datasizeMf;
            } else if (res.rows[i].pos == 'FW'){
                datasize = datasizeFw;
            } else if (res.rows[i].pos == 'MF,FW'){
                datasize = datasizeMfF + datasizeMf;
            } else if (res.rows[i].pos == 'FW,MF'){
                datasize = datasizeFw;
            } else if(res.rows[i].pos == 'DF,MF' || res.rows[i].pos ==  'MF,DF'){
                datasize = datasizeMfD + datasizeMf;
            } else if(res.rows[i].pos == 'DF,FW'){
                datasize = datasizeDf;
            } else if(res.rows[i].pos == 'FW,DF'){
                datasize = datasizeFw;
            }
            let sh_blck90PER = (position / datasize) * (100);
            if (sh_blck90PER == Infinity){
                sh_blck90PER = 0;
            }

            position = 0;
            

            
        for(let j = 0; j < res.rows.length;j++){
                if (res.rows[i].pos == res.rows[j].pos || res.rows[i].pos == 'MF' && res.rows[j].pos == 'MF,FW' ||res.rows[i].pos == 'DF' && res.rows[j].pos == 'DF,FW' || res.rows[i].pos  == 'DF,FW' && res.rows[j].pos == 'DF' || res.rows[i].pos == 'FW' && res.rows[j].pos == 'FW,DF' || res.rows[i].pos == 'FW,DF' && res.rows[j].pos == 'FW' ||res.rows[i].pos == 'FW,MF' && res.rows[j].pos == 'FW,DF' ||res.rows[i].pos == 'FW,DF' && res.rows[j].pos == 'FW,MF' || res.rows[i].pos == 'MF' && res.rows[j].pos == 'DF,MF' || res.rows[i].pos == 'MF' && res.rows[j].pos == 'MF,DF' || res.rows[i].pos == 'DF,MF' && res.rows[j].pos == 'MF' || res.rows[i].pos == 'DF,MF' && res.rows[j].pos == 'MF,DF' || res.rows[i].pos == 'MF,DF' && res.rows[j].pos == 'MF' || res.rows[i].pos == 'MF,DF' && res.rows[j].pos == 'DF,MF' || res.rows[i].pos == 'MF,FW' && res.rows[j].pos == 'MF'   || res.rows[i].pos == 'FW' && res.rows[j] == 'FW,MF' || res.rows[i].pos == 'FW,MF' && res.rows[j].pos == 'FW'){
                if ((parseFloat(res.rows[i].p_blck)  / parseFloat(res.rows[i]._90s)   >= parseFloat(res.rows[j].p_blck)  / parseFloat(res.rows[i]._90s) )){
                    position+=1
                }
            }
            }
            if (res.rows[i].pos == 'DF'){
                datasize = datasizeDf;
            } else if (res.rows[i].pos == 'MF'){
                datasize = datasizeMfD + datasizeMfF + datasizeMf;
            } else if (res.rows[i].pos == 'FW'){
                datasize = datasizeFw;
            } else if (res.rows[i].pos == 'MF,FW'){
                datasize = datasizeMfF + datasizeMf;
            } else if (res.rows[i].pos == 'FW,MF'){
                datasize = datasizeFw;
            } else if(res.rows[i].pos == 'DF,MF' || res.rows[i].pos ==  'MF,DF'){
                datasize = datasizeMfD + datasizeMf;
            } else if(res.rows[i].pos == 'DF,FW'){
                datasize = datasizeDf;
            } else if(res.rows[i].pos == 'FW,DF'){
                datasize = datasizeFw;
            }
            let p_blck90PER = (position / datasize) * (100);
            if (p_blck90PER == Infinity){
                p_blck90PER = 0;
            }

            position = 0;
            

            
        for(let j = 0; j < res.rows.length;j++){
                if (res.rows[i].pos == res.rows[j].pos || res.rows[i].pos == 'MF' && res.rows[j].pos == 'MF,FW' ||res.rows[i].pos == 'DF' && res.rows[j].pos == 'DF,FW' || res.rows[i].pos  == 'DF,FW' && res.rows[j].pos == 'DF' || res.rows[i].pos == 'FW' && res.rows[j].pos == 'FW,DF' || res.rows[i].pos == 'FW,DF' && res.rows[j].pos == 'FW' ||res.rows[i].pos == 'FW,MF' && res.rows[j].pos == 'FW,DF' ||res.rows[i].pos == 'FW,DF' && res.rows[j].pos == 'FW,MF' || res.rows[i].pos == 'MF' && res.rows[j].pos == 'DF,MF' || res.rows[i].pos == 'MF' && res.rows[j].pos == 'MF,DF' || res.rows[i].pos == 'DF,MF' && res.rows[j].pos == 'MF' || res.rows[i].pos == 'DF,MF' && res.rows[j].pos == 'MF,DF' || res.rows[i].pos == 'MF,DF' && res.rows[j].pos == 'MF' || res.rows[i].pos == 'MF,DF' && res.rows[j].pos == 'DF,MF' || res.rows[i].pos == 'MF,FW' && res.rows[j].pos == 'MF'   || res.rows[i].pos == 'FW' && res.rows[j] == 'FW,MF' || res.rows[i].pos == 'FW,MF' && res.rows[j].pos == 'FW'){
                if ((parseFloat(res.rows[i].intc)  / parseFloat(res.rows[i]._90s)   >= parseFloat(res.rows[j].intc)  / parseFloat(res.rows[i]._90s) )){
                    position+=1
                }
            }
            }
            if (res.rows[i].pos == 'DF'){
                datasize = datasizeDf;
            } else if (res.rows[i].pos == 'MF'){
                datasize = datasizeMfD + datasizeMfF + datasizeMf;
            } else if (res.rows[i].pos == 'FW'){
                datasize = datasizeFw;
            } else if (res.rows[i].pos == 'MF,FW'){
                datasize = datasizeMfF + datasizeMf;
            } else if (res.rows[i].pos == 'FW,MF'){
                datasize = datasizeFw;
            } else if(res.rows[i].pos == 'DF,MF' || res.rows[i].pos ==  'MF,DF'){
                datasize = datasizeMfD + datasizeMf;
            } else if(res.rows[i].pos == 'DF,FW'){
                datasize = datasizeDf;
            } else if(res.rows[i].pos == 'FW,DF'){
                datasize = datasizeFw;
            }
            let intc90PER = (position / datasize) * (100);
            if (intc90PER == Infinity){
                intc90PER = 0;
            }

            position = 0;
            

            
        for(let j = 0; j < res.rows.length;j++){
                if (res.rows[i].pos == res.rows[j].pos || res.rows[i].pos == 'MF' && res.rows[j].pos == 'MF,FW' ||res.rows[i].pos == 'DF' && res.rows[j].pos == 'DF,FW' || res.rows[i].pos  == 'DF,FW' && res.rows[j].pos == 'DF' || res.rows[i].pos == 'FW' && res.rows[j].pos == 'FW,DF' || res.rows[i].pos == 'FW,DF' && res.rows[j].pos == 'FW' ||res.rows[i].pos == 'FW,MF' && res.rows[j].pos == 'FW,DF' ||res.rows[i].pos == 'FW,DF' && res.rows[j].pos == 'FW,MF' || res.rows[i].pos == 'MF' && res.rows[j].pos == 'DF,MF' || res.rows[i].pos == 'MF' && res.rows[j].pos == 'MF,DF' || res.rows[i].pos == 'DF,MF' && res.rows[j].pos == 'MF' || res.rows[i].pos == 'DF,MF' && res.rows[j].pos == 'MF,DF' || res.rows[i].pos == 'MF,DF' && res.rows[j].pos == 'MF' || res.rows[i].pos == 'MF,DF' && res.rows[j].pos == 'DF,MF' || res.rows[i].pos == 'MF,FW' && res.rows[j].pos == 'MF'   || res.rows[i].pos == 'FW' && res.rows[j] == 'FW,MF' || res.rows[i].pos == 'FW,MF' && res.rows[j].pos == 'FW'){
                if ((parseFloat(res.rows[i].clr)  / parseFloat(res.rows[i]._90s)   >= parseFloat(res.rows[j].clr)  / parseFloat(res.rows[i]._90s) )){
                    position+=1
                }
            }
            }
            if (res.rows[i].pos == 'DF'){
                datasize = datasizeDf;
            } else if (res.rows[i].pos == 'MF'){
                datasize = datasizeMfD + datasizeMfF + datasizeMf;
            } else if (res.rows[i].pos == 'FW'){
                datasize = datasizeFw;
            } else if (res.rows[i].pos == 'MF,FW'){
                datasize = datasizeMfF + datasizeMf;
            } else if (res.rows[i].pos == 'FW,MF'){
                datasize = datasizeFw;
            } else if(res.rows[i].pos == 'DF,MF' || res.rows[i].pos ==  'MF,DF'){
                datasize = datasizeMfD + datasizeMf;
            } else if(res.rows[i].pos == 'DF,FW'){
                datasize = datasizeDf;
            } else if(res.rows[i].pos == 'FW,DF'){
                datasize = datasizeFw;
            }
            let clr90PER = (position / datasize) * (100);
            if (clr90PER == Infinity){
                clr90PER = 0;
            }

            position = 0;
            

            
        for(let j = 0; j < res.rows.length;j++){
                if (res.rows[i].pos == res.rows[j].pos || res.rows[i].pos == 'MF' && res.rows[j].pos == 'MF,FW' ||res.rows[i].pos == 'DF' && res.rows[j].pos == 'DF,FW' || res.rows[i].pos  == 'DF,FW' && res.rows[j].pos == 'DF' || res.rows[i].pos == 'FW' && res.rows[j].pos == 'FW,DF' || res.rows[i].pos == 'FW,DF' && res.rows[j].pos == 'FW' ||res.rows[i].pos == 'FW,MF' && res.rows[j].pos == 'FW,DF' ||res.rows[i].pos == 'FW,DF' && res.rows[j].pos == 'FW,MF' || res.rows[i].pos == 'MF' && res.rows[j].pos == 'DF,MF' || res.rows[i].pos == 'MF' && res.rows[j].pos == 'MF,DF' || res.rows[i].pos == 'DF,MF' && res.rows[j].pos == 'MF' || res.rows[i].pos == 'DF,MF' && res.rows[j].pos == 'MF,DF' || res.rows[i].pos == 'MF,DF' && res.rows[j].pos == 'MF' || res.rows[i].pos == 'MF,DF' && res.rows[j].pos == 'DF,MF' || res.rows[i].pos == 'MF,FW' && res.rows[j].pos == 'MF'   || res.rows[i].pos == 'FW' && res.rows[j] == 'FW,MF' || res.rows[i].pos == 'FW,MF' && res.rows[j].pos == 'FW'){
                if ((parseFloat(res.rows[i].sca_p90)  >= parseFloat(res.rows[j].sca_p90))){
                    position+=1
                }
            }
            }
            if (res.rows[i].pos == 'DF'){
                datasize = datasizeDf;
            } else if (res.rows[i].pos == 'MF'){
                datasize = datasizeMfD + datasizeMfF + datasizeMf;
            } else if (res.rows[i].pos == 'FW'){
                datasize = datasizeFw;
            } else if (res.rows[i].pos == 'MF,FW'){
                datasize = datasizeMfF + datasizeMf;
            } else if (res.rows[i].pos == 'FW,MF'){
                datasize = datasizeFw;
            } else if(res.rows[i].pos == 'DF,MF' || res.rows[i].pos ==  'MF,DF'){
                datasize = datasizeMfD + datasizeMf;
            } else if(res.rows[i].pos == 'DF,FW'){
                datasize = datasizeDf;
            } else if(res.rows[i].pos == 'FW,DF'){
                datasize = datasizeFw;
            }
            let sca_p90PER = (position / datasize) * (100);
            if (sca_p90PER == Infinity){
                sca_p90PER = 0;
            }

            position = 0;
            

            
        for(let j = 0; j < res.rows.length;j++){
                if (res.rows[i].pos == res.rows[j].pos || res.rows[i].pos == 'MF' && res.rows[j].pos == 'MF,FW' ||res.rows[i].pos == 'DF' && res.rows[j].pos == 'DF,FW' || res.rows[i].pos  == 'DF,FW' && res.rows[j].pos == 'DF' || res.rows[i].pos == 'FW' && res.rows[j].pos == 'FW,DF' || res.rows[i].pos == 'FW,DF' && res.rows[j].pos == 'FW' ||res.rows[i].pos == 'FW,MF' && res.rows[j].pos == 'FW,DF' ||res.rows[i].pos == 'FW,DF' && res.rows[j].pos == 'FW,MF' || res.rows[i].pos == 'MF' && res.rows[j].pos == 'DF,MF' || res.rows[i].pos == 'MF' && res.rows[j].pos == 'MF,DF' || res.rows[i].pos == 'DF,MF' && res.rows[j].pos == 'MF' || res.rows[i].pos == 'DF,MF' && res.rows[j].pos == 'MF,DF' || res.rows[i].pos == 'MF,DF' && res.rows[j].pos == 'MF' || res.rows[i].pos == 'MF,DF' && res.rows[j].pos == 'DF,MF' || res.rows[i].pos == 'MF,FW' && res.rows[j].pos == 'MF'   || res.rows[i].pos == 'FW' && res.rows[j] == 'FW,MF' || res.rows[i].pos == 'FW,MF' && res.rows[j].pos == 'FW'){
                if ((parseFloat(res.rows[i].sca_pl)  / parseFloat(res.rows[i]._90s)   >= parseFloat(res.rows[j].sca_pl)  / parseFloat(res.rows[i]._90s) )){
                    position+=1
                }
            }
            }
            if (res.rows[i].pos == 'DF'){
                datasize = datasizeDf;
            } else if (res.rows[i].pos == 'MF'){
                datasize = datasizeMfD + datasizeMfF + datasizeMf;
            } else if (res.rows[i].pos == 'FW'){
                datasize = datasizeFw;
            } else if (res.rows[i].pos == 'MF,FW'){
                datasize = datasizeMfF + datasizeMf;
            } else if (res.rows[i].pos == 'FW,MF'){
                datasize = datasizeFw;
            } else if(res.rows[i].pos == 'DF,MF' || res.rows[i].pos ==  'MF,DF'){
                datasize = datasizeMfD + datasizeMf;
            } else if(res.rows[i].pos == 'DF,FW'){
                datasize = datasizeDf;
            } else if(res.rows[i].pos == 'FW,DF'){
                datasize = datasizeFw;
            }
            let sca_pl90PER = (position / datasize) * (100);
            if (sca_pl90PER == Infinity){
                sca_pl90PER = 0;
            }

            position = 0;
            

            
        for(let j = 0; j < res.rows.length;j++){
                if (res.rows[i].pos == res.rows[j].pos || res.rows[i].pos == 'MF' && res.rows[j].pos == 'MF,FW' ||res.rows[i].pos == 'DF' && res.rows[j].pos == 'DF,FW' || res.rows[i].pos  == 'DF,FW' && res.rows[j].pos == 'DF' || res.rows[i].pos == 'FW' && res.rows[j].pos == 'FW,DF' || res.rows[i].pos == 'FW,DF' && res.rows[j].pos == 'FW' ||res.rows[i].pos == 'FW,MF' && res.rows[j].pos == 'FW,DF' ||res.rows[i].pos == 'FW,DF' && res.rows[j].pos == 'FW,MF' || res.rows[i].pos == 'MF' && res.rows[j].pos == 'DF,MF' || res.rows[i].pos == 'MF' && res.rows[j].pos == 'MF,DF' || res.rows[i].pos == 'DF,MF' && res.rows[j].pos == 'MF' || res.rows[i].pos == 'DF,MF' && res.rows[j].pos == 'MF,DF' || res.rows[i].pos == 'MF,DF' && res.rows[j].pos == 'MF' || res.rows[i].pos == 'MF,DF' && res.rows[j].pos == 'DF,MF' || res.rows[i].pos == 'MF,FW' && res.rows[j].pos == 'MF'   || res.rows[i].pos == 'FW' && res.rows[j] == 'FW,MF' || res.rows[i].pos == 'FW,MF' && res.rows[j].pos == 'FW'){
                if ((parseFloat(res.rows[i].sca_to)  / parseFloat(res.rows[i]._90s)   >= parseFloat(res.rows[j].sca_to)  / parseFloat(res.rows[i]._90s) )){
                    position+=1
                }
            }
            }
            if (res.rows[i].pos == 'DF'){
                datasize = datasizeDf;
            } else if (res.rows[i].pos == 'MF'){
                datasize = datasizeMfD + datasizeMfF + datasizeMf;
            } else if (res.rows[i].pos == 'FW'){
                datasize = datasizeFw;
            } else if (res.rows[i].pos == 'MF,FW'){
                datasize = datasizeMfF + datasizeMf;
            } else if (res.rows[i].pos == 'FW,MF'){
                datasize = datasizeFw;
            } else if(res.rows[i].pos == 'DF,MF' || res.rows[i].pos ==  'MF,DF'){
                datasize = datasizeMfD + datasizeMf;
            } else if(res.rows[i].pos == 'DF,FW'){
                datasize = datasizeDf;
            } else if(res.rows[i].pos == 'FW,DF'){
                datasize = datasizeFw;
            }
            let sca_to90PER = (position / datasize) * (100);
            if (sca_to90PER == Infinity){
                sca_to90PER = 0;
            }

            position = 0;
            

            
        for(let j = 0; j < res.rows.length;j++){
                if (res.rows[i].pos == res.rows[j].pos || res.rows[i].pos == 'MF' && res.rows[j].pos == 'MF,FW' ||res.rows[i].pos == 'DF' && res.rows[j].pos == 'DF,FW' || res.rows[i].pos  == 'DF,FW' && res.rows[j].pos == 'DF' || res.rows[i].pos == 'FW' && res.rows[j].pos == 'FW,DF' || res.rows[i].pos == 'FW,DF' && res.rows[j].pos == 'FW' ||res.rows[i].pos == 'FW,MF' && res.rows[j].pos == 'FW,DF' ||res.rows[i].pos == 'FW,DF' && res.rows[j].pos == 'FW,MF' || res.rows[i].pos == 'MF' && res.rows[j].pos == 'DF,MF' || res.rows[i].pos == 'MF' && res.rows[j].pos == 'MF,DF' || res.rows[i].pos == 'DF,MF' && res.rows[j].pos == 'MF' || res.rows[i].pos == 'DF,MF' && res.rows[j].pos == 'MF,DF' || res.rows[i].pos == 'MF,DF' && res.rows[j].pos == 'MF' || res.rows[i].pos == 'MF,DF' && res.rows[j].pos == 'DF,MF' || res.rows[i].pos == 'MF,FW' && res.rows[j].pos == 'MF'   || res.rows[i].pos == 'FW' && res.rows[j] == 'FW,MF' || res.rows[i].pos == 'FW,MF' && res.rows[j].pos == 'FW'){
                if ((parseFloat(res.rows[i].sca_sh)  / parseFloat(res.rows[i]._90s)   >= parseFloat(res.rows[j].sca_sh)  / parseFloat(res.rows[i]._90s) )){
                    position+=1
                }
            }
            }
            if (res.rows[i].pos == 'DF'){
                datasize = datasizeDf;
            } else if (res.rows[i].pos == 'MF'){
                datasize = datasizeMfD + datasizeMfF + datasizeMf;
            } else if (res.rows[i].pos == 'FW'){
                datasize = datasizeFw;
            } else if (res.rows[i].pos == 'MF,FW'){
                datasize = datasizeMfF + datasizeMf;
            } else if (res.rows[i].pos == 'FW,MF'){
                datasize = datasizeFw;
            } else if(res.rows[i].pos == 'DF,MF' || res.rows[i].pos ==  'MF,DF'){
                datasize = datasizeMfD + datasizeMf;
            } else if(res.rows[i].pos == 'DF,FW'){
                datasize = datasizeDf;
            } else if(res.rows[i].pos == 'FW,DF'){
                datasize = datasizeFw;
            }
            let sca_sh90PER = (position / datasize) * (100);
            if (sca_sh90PER == Infinity){
                sca_sh90PER = 0;
            }

            position = 0;
            

            
        for(let j = 0; j < res.rows.length;j++){
                if (res.rows[i].pos == res.rows[j].pos || res.rows[i].pos == 'MF' && res.rows[j].pos == 'MF,FW' ||res.rows[i].pos == 'DF' && res.rows[j].pos == 'DF,FW' || res.rows[i].pos  == 'DF,FW' && res.rows[j].pos == 'DF' || res.rows[i].pos == 'FW' && res.rows[j].pos == 'FW,DF' || res.rows[i].pos == 'FW,DF' && res.rows[j].pos == 'FW' ||res.rows[i].pos == 'FW,MF' && res.rows[j].pos == 'FW,DF' ||res.rows[i].pos == 'FW,DF' && res.rows[j].pos == 'FW,MF' || res.rows[i].pos == 'MF' && res.rows[j].pos == 'DF,MF' || res.rows[i].pos == 'MF' && res.rows[j].pos == 'MF,DF' || res.rows[i].pos == 'DF,MF' && res.rows[j].pos == 'MF' || res.rows[i].pos == 'DF,MF' && res.rows[j].pos == 'MF,DF' || res.rows[i].pos == 'MF,DF' && res.rows[j].pos == 'MF' || res.rows[i].pos == 'MF,DF' && res.rows[j].pos == 'DF,MF' || res.rows[i].pos == 'MF,FW' && res.rows[j].pos == 'MF'   || res.rows[i].pos == 'FW' && res.rows[j] == 'FW,MF' || res.rows[i].pos == 'FW,MF' && res.rows[j].pos == 'FW'){
                if ((parseFloat(res.rows[i].sca_fd)  / parseFloat(res.rows[i]._90s)   >= parseFloat(res.rows[j].sca_fd)  / parseFloat(res.rows[i]._90s) )){
                    position+=1
                }
            }
            }
            if (res.rows[i].pos == 'DF'){
                datasize = datasizeDf;
            } else if (res.rows[i].pos == 'MF'){
                datasize = datasizeMfD + datasizeMfF + datasizeMf;
            } else if (res.rows[i].pos == 'FW'){
                datasize = datasizeFw;
            } else if (res.rows[i].pos == 'MF,FW'){
                datasize = datasizeMfF + datasizeMf;
            } else if (res.rows[i].pos == 'FW,MF'){
                datasize = datasizeFw;
            } else if(res.rows[i].pos == 'DF,MF' || res.rows[i].pos ==  'MF,DF'){
                datasize = datasizeMfD + datasizeMf;
            } else if(res.rows[i].pos == 'DF,FW'){
                datasize = datasizeDf;
            } else if(res.rows[i].pos == 'FW,DF'){
                datasize = datasizeFw;
            }
            let sca_fd90PER = (position / datasize) * (100);
            if (sca_fd90PER == Infinity){
                sca_fd90PER = 0;
            }

            position = 0;
            

            
        for(let j = 0; j < res.rows.length;j++){
                if (res.rows[i].pos == res.rows[j].pos || res.rows[i].pos == 'MF' && res.rows[j].pos == 'MF,FW' ||res.rows[i].pos == 'DF' && res.rows[j].pos == 'DF,FW' || res.rows[i].pos  == 'DF,FW' && res.rows[j].pos == 'DF' || res.rows[i].pos == 'FW' && res.rows[j].pos == 'FW,DF' || res.rows[i].pos == 'FW,DF' && res.rows[j].pos == 'FW' ||res.rows[i].pos == 'FW,MF' && res.rows[j].pos == 'FW,DF' ||res.rows[i].pos == 'FW,DF' && res.rows[j].pos == 'FW,MF' || res.rows[i].pos == 'MF' && res.rows[j].pos == 'DF,MF' || res.rows[i].pos == 'MF' && res.rows[j].pos == 'MF,DF' || res.rows[i].pos == 'DF,MF' && res.rows[j].pos == 'MF' || res.rows[i].pos == 'DF,MF' && res.rows[j].pos == 'MF,DF' || res.rows[i].pos == 'MF,DF' && res.rows[j].pos == 'MF' || res.rows[i].pos == 'MF,DF' && res.rows[j].pos == 'DF,MF' || res.rows[i].pos == 'MF,FW' && res.rows[j].pos == 'MF'   || res.rows[i].pos == 'FW' && res.rows[j] == 'FW,MF' || res.rows[i].pos == 'FW,MF' && res.rows[j].pos == 'FW'){
                if ((parseFloat(res.rows[i].sca_def)  / parseFloat(res.rows[i]._90s)   >= parseFloat(res.rows[j].sca_def)  / parseFloat(res.rows[i]._90s) )){
                    position+=1
                }
            }
            }
            if (res.rows[i].pos == 'DF'){
                datasize = datasizeDf;
            } else if (res.rows[i].pos == 'MF'){
                datasize = datasizeMfD + datasizeMfF + datasizeMf;
            } else if (res.rows[i].pos == 'FW'){
                datasize = datasizeFw;
            } else if (res.rows[i].pos == 'MF,FW'){
                datasize = datasizeMfF + datasizeMf;
            } else if (res.rows[i].pos == 'FW,MF'){
                datasize = datasizeFw;
            } else if(res.rows[i].pos == 'DF,MF' || res.rows[i].pos ==  'MF,DF'){
                datasize = datasizeMfD + datasizeMf;
            } else if(res.rows[i].pos == 'DF,FW'){
                datasize = datasizeDf;
            } else if(res.rows[i].pos == 'FW,DF'){
                datasize = datasizeFw;
            }
            let sca_def90PER = (position / datasize) * (100);
            if (sca_def90PER == Infinity){
                sca_def90PER = 0;
            }

            position = 0;
            

            
        for(let j = 0; j < res.rows.length;j++){
                if (res.rows[i].pos == res.rows[j].pos || res.rows[i].pos == 'MF' && res.rows[j].pos == 'MF,FW' ||res.rows[i].pos == 'DF' && res.rows[j].pos == 'DF,FW' || res.rows[i].pos  == 'DF,FW' && res.rows[j].pos == 'DF' || res.rows[i].pos == 'FW' && res.rows[j].pos == 'FW,DF' || res.rows[i].pos == 'FW,DF' && res.rows[j].pos == 'FW' ||res.rows[i].pos == 'FW,MF' && res.rows[j].pos == 'FW,DF' ||res.rows[i].pos == 'FW,DF' && res.rows[j].pos == 'FW,MF' || res.rows[i].pos == 'MF' && res.rows[j].pos == 'DF,MF' || res.rows[i].pos == 'MF' && res.rows[j].pos == 'MF,DF' || res.rows[i].pos == 'DF,MF' && res.rows[j].pos == 'MF' || res.rows[i].pos == 'DF,MF' && res.rows[j].pos == 'MF,DF' || res.rows[i].pos == 'MF,DF' && res.rows[j].pos == 'MF' || res.rows[i].pos == 'MF,DF' && res.rows[j].pos == 'DF,MF' || res.rows[i].pos == 'MF,FW' && res.rows[j].pos == 'MF'   || res.rows[i].pos == 'FW' && res.rows[j] == 'FW,MF' || res.rows[i].pos == 'FW,MF' && res.rows[j].pos == 'FW'){
                if ((parseFloat(res.rows[i].gca_90)  >= parseFloat(res.rows[j].gca_90))){
                    position+=1
                }
            }
            }
            if (res.rows[i].pos == 'DF'){
                datasize = datasizeDf;
            } else if (res.rows[i].pos == 'MF'){
                datasize = datasizeMfD + datasizeMfF + datasizeMf;
            } else if (res.rows[i].pos == 'FW'){
                datasize = datasizeFw;
            } else if (res.rows[i].pos == 'MF,FW'){
                datasize = datasizeMfF + datasizeMf;
            } else if (res.rows[i].pos == 'FW,MF'){
                datasize = datasizeFw;
            } else if(res.rows[i].pos == 'DF,MF' || res.rows[i].pos ==  'MF,DF'){
                datasize = datasizeMfD + datasizeMf;
            } else if(res.rows[i].pos == 'DF,FW'){
                datasize = datasizeDf;
            } else if(res.rows[i].pos == 'FW,DF'){
                datasize = datasizeFw;
            }
            let gca_90PER = (position / datasize) * (100);
            if (gca_90PER == Infinity){
                gca_90PER = 0;
            }

            position = 0;
            

            
        for(let j = 0; j < res.rows.length;j++){
                if (res.rows[i].pos == res.rows[j].pos || res.rows[i].pos == 'MF' && res.rows[j].pos == 'MF,FW' ||res.rows[i].pos == 'DF' && res.rows[j].pos == 'DF,FW' || res.rows[i].pos  == 'DF,FW' && res.rows[j].pos == 'DF' || res.rows[i].pos == 'FW' && res.rows[j].pos == 'FW,DF' || res.rows[i].pos == 'FW,DF' && res.rows[j].pos == 'FW' ||res.rows[i].pos == 'FW,MF' && res.rows[j].pos == 'FW,DF' ||res.rows[i].pos == 'FW,DF' && res.rows[j].pos == 'FW,MF' || res.rows[i].pos == 'MF' && res.rows[j].pos == 'DF,MF' || res.rows[i].pos == 'MF' && res.rows[j].pos == 'MF,DF' || res.rows[i].pos == 'DF,MF' && res.rows[j].pos == 'MF' || res.rows[i].pos == 'DF,MF' && res.rows[j].pos == 'MF,DF' || res.rows[i].pos == 'MF,DF' && res.rows[j].pos == 'MF' || res.rows[i].pos == 'MF,DF' && res.rows[j].pos == 'DF,MF' || res.rows[i].pos == 'MF,FW' && res.rows[j].pos == 'MF'   || res.rows[i].pos == 'FW' && res.rows[j] == 'FW,MF' || res.rows[i].pos == 'FW,MF' && res.rows[j].pos == 'FW'){
                if ((parseFloat(res.rows[i].gca_to)  / parseFloat(res.rows[i]._90s)   >= parseFloat(res.rows[j].gca_to)  / parseFloat(res.rows[i]._90s) )){
                    position+=1
                }
            }
            }
            if (res.rows[i].pos == 'DF'){
                datasize = datasizeDf;
            } else if (res.rows[i].pos == 'MF'){
                datasize = datasizeMfD + datasizeMfF + datasizeMf;
            } else if (res.rows[i].pos == 'FW'){
                datasize = datasizeFw;
            } else if (res.rows[i].pos == 'MF,FW'){
                datasize = datasizeMfF + datasizeMf;
            } else if (res.rows[i].pos == 'FW,MF'){
                datasize = datasizeFw;
            } else if(res.rows[i].pos == 'DF,MF' || res.rows[i].pos ==  'MF,DF'){
                datasize = datasizeMfD + datasizeMf;
            } else if(res.rows[i].pos == 'DF,FW'){
                datasize = datasizeDf;
            } else if(res.rows[i].pos == 'FW,DF'){
                datasize = datasizeFw;
            }
            let gca_to90PER = (position / datasize) * (100);
            if (gca_to90PER == Infinity){
                gca_to90PER = 0;
            }

            position = 0;
            

            
        for(let j = 0; j < res.rows.length;j++){
                if (res.rows[i].pos == res.rows[j].pos || res.rows[i].pos == 'MF' && res.rows[j].pos == 'MF,FW' ||res.rows[i].pos == 'DF' && res.rows[j].pos == 'DF,FW' || res.rows[i].pos  == 'DF,FW' && res.rows[j].pos == 'DF' || res.rows[i].pos == 'FW' && res.rows[j].pos == 'FW,DF' || res.rows[i].pos == 'FW,DF' && res.rows[j].pos == 'FW' ||res.rows[i].pos == 'FW,MF' && res.rows[j].pos == 'FW,DF' ||res.rows[i].pos == 'FW,DF' && res.rows[j].pos == 'FW,MF' || res.rows[i].pos == 'MF' && res.rows[j].pos == 'DF,MF' || res.rows[i].pos == 'MF' && res.rows[j].pos == 'MF,DF' || res.rows[i].pos == 'DF,MF' && res.rows[j].pos == 'MF' || res.rows[i].pos == 'DF,MF' && res.rows[j].pos == 'MF,DF' || res.rows[i].pos == 'MF,DF' && res.rows[j].pos == 'MF' || res.rows[i].pos == 'MF,DF' && res.rows[j].pos == 'DF,MF' || res.rows[i].pos == 'MF,FW' && res.rows[j].pos == 'MF'   || res.rows[i].pos == 'FW' && res.rows[j] == 'FW,MF' || res.rows[i].pos == 'FW,MF' && res.rows[j].pos == 'FW'){
                if ((parseFloat(res.rows[i].tch)  / parseFloat(res.rows[i]._90s)   >= parseFloat(res.rows[j].tch)  / parseFloat(res.rows[i]._90s) )){
                    position+=1
                }
            }
            }
            if (res.rows[i].pos == 'DF'){
                datasize = datasizeDf;
            } else if (res.rows[i].pos == 'MF'){
                datasize = datasizeMfD + datasizeMfF + datasizeMf;
            } else if (res.rows[i].pos == 'FW'){
                datasize = datasizeFw;
            } else if (res.rows[i].pos == 'MF,FW'){
                datasize = datasizeMfF + datasizeMf;
            } else if (res.rows[i].pos == 'FW,MF'){
                datasize = datasizeFw;
            } else if(res.rows[i].pos == 'DF,MF' || res.rows[i].pos ==  'MF,DF'){
                datasize = datasizeMfD + datasizeMf;
            } else if(res.rows[i].pos == 'DF,FW'){
                datasize = datasizeDf;
            } else if(res.rows[i].pos == 'FW,DF'){
                datasize = datasizeFw;
            }
            let tch90PER = (position / datasize) * (100);
            if (tch90PER == Infinity){
                tch90PER = 0;
            }

            position = 0;
            

            
        for(let j = 0; j < res.rows.length;j++){
                if (res.rows[i].pos == res.rows[j].pos || res.rows[i].pos == 'MF' && res.rows[j].pos == 'MF,FW' ||res.rows[i].pos == 'DF' && res.rows[j].pos == 'DF,FW' || res.rows[i].pos  == 'DF,FW' && res.rows[j].pos == 'DF' || res.rows[i].pos == 'FW' && res.rows[j].pos == 'FW,DF' || res.rows[i].pos == 'FW,DF' && res.rows[j].pos == 'FW' ||res.rows[i].pos == 'FW,MF' && res.rows[j].pos == 'FW,DF' ||res.rows[i].pos == 'FW,DF' && res.rows[j].pos == 'FW,MF' || res.rows[i].pos == 'MF' && res.rows[j].pos == 'DF,MF' || res.rows[i].pos == 'MF' && res.rows[j].pos == 'MF,DF' || res.rows[i].pos == 'DF,MF' && res.rows[j].pos == 'MF' || res.rows[i].pos == 'DF,MF' && res.rows[j].pos == 'MF,DF' || res.rows[i].pos == 'MF,DF' && res.rows[j].pos == 'MF' || res.rows[i].pos == 'MF,DF' && res.rows[j].pos == 'DF,MF' || res.rows[i].pos == 'MF,FW' && res.rows[j].pos == 'MF'   || res.rows[i].pos == 'FW' && res.rows[j] == 'FW,MF' || res.rows[i].pos == 'FW,MF' && res.rows[j].pos == 'FW'){
                if ((parseFloat(res.rows[i].to_att)  / parseFloat(res.rows[i]._90s)   >= parseFloat(res.rows[j].to_att)  / parseFloat(res.rows[i]._90s) )){
                    position+=1
                }
            }
            }
            if (res.rows[i].pos == 'DF'){
                datasize = datasizeDf;
            } else if (res.rows[i].pos == 'MF'){
                datasize = datasizeMfD + datasizeMfF + datasizeMf;
            } else if (res.rows[i].pos == 'FW'){
                datasize = datasizeFw;
            } else if (res.rows[i].pos == 'MF,FW'){
                datasize = datasizeMfF + datasizeMf;
            } else if (res.rows[i].pos == 'FW,MF'){
                datasize = datasizeFw;
            } else if(res.rows[i].pos == 'DF,MF' || res.rows[i].pos ==  'MF,DF'){
                datasize = datasizeMfD + datasizeMf;
            } else if(res.rows[i].pos == 'DF,FW'){
                datasize = datasizeDf;
            } else if(res.rows[i].pos == 'FW,DF'){
                datasize = datasizeFw;
            }
            let to_att90PER = (position / datasize) * (100);
            if (to_att90PER == Infinity){
                to_att90PER = 0;
            }

            position = 0;
            

            
        for(let j = 0; j < res.rows.length;j++){
                if (res.rows[i].pos == res.rows[j].pos || res.rows[i].pos == 'MF' && res.rows[j].pos == 'MF,FW' ||res.rows[i].pos == 'DF' && res.rows[j].pos == 'DF,FW' || res.rows[i].pos  == 'DF,FW' && res.rows[j].pos == 'DF' || res.rows[i].pos == 'FW' && res.rows[j].pos == 'FW,DF' || res.rows[i].pos == 'FW,DF' && res.rows[j].pos == 'FW' ||res.rows[i].pos == 'FW,MF' && res.rows[j].pos == 'FW,DF' ||res.rows[i].pos == 'FW,DF' && res.rows[j].pos == 'FW,MF' || res.rows[i].pos == 'MF' && res.rows[j].pos == 'DF,MF' || res.rows[i].pos == 'MF' && res.rows[j].pos == 'MF,DF' || res.rows[i].pos == 'DF,MF' && res.rows[j].pos == 'MF' || res.rows[i].pos == 'DF,MF' && res.rows[j].pos == 'MF,DF' || res.rows[i].pos == 'MF,DF' && res.rows[j].pos == 'MF' || res.rows[i].pos == 'MF,DF' && res.rows[j].pos == 'DF,MF' || res.rows[i].pos == 'MF,FW' && res.rows[j].pos == 'MF'   || res.rows[i].pos == 'FW' && res.rows[j] == 'FW,MF' || res.rows[i].pos == 'FW,MF' && res.rows[j].pos == 'FW'){
                if ((parseFloat(res.rows[i].to_tklpct)   >= parseFloat(res.rows[j].to_tklpct) )){
                    position+=1
                }
            }
            }
            if (res.rows[i].pos == 'DF'){
                datasize = datasizeDf;
            } else if (res.rows[i].pos == 'MF'){
                datasize = datasizeMfD + datasizeMfF + datasizeMf;
            } else if (res.rows[i].pos == 'FW'){
                datasize = datasizeFw;
            } else if (res.rows[i].pos == 'MF,FW'){
                datasize = datasizeMfF + datasizeMf;
            } else if (res.rows[i].pos == 'FW,MF'){
                datasize = datasizeFw;
            } else if(res.rows[i].pos == 'DF,MF' || res.rows[i].pos ==  'MF,DF'){
                datasize = datasizeMfD + datasizeMf;
            } else if(res.rows[i].pos == 'DF,FW'){
                datasize = datasizeDf;
            } else if(res.rows[i].pos == 'FW,DF'){
                datasize = datasizeFw;
            }
            let to_tklpctPER = (position / datasize) * (100);
            if (to_tklpctPER == Infinity){
                to_tklpctPER = 0;
            } 

            position = 0;
            

            
        for(let j = 0; j < res.rows.length;j++){
                if (res.rows[i].pos == res.rows[j].pos || res.rows[i].pos == 'MF' && res.rows[j].pos == 'MF,FW' ||res.rows[i].pos == 'DF' && res.rows[j].pos == 'DF,FW' || res.rows[i].pos  == 'DF,FW' && res.rows[j].pos == 'DF' || res.rows[i].pos == 'FW' && res.rows[j].pos == 'FW,DF' || res.rows[i].pos == 'FW,DF' && res.rows[j].pos == 'FW' ||res.rows[i].pos == 'FW,MF' && res.rows[j].pos == 'FW,DF' ||res.rows[i].pos == 'FW,DF' && res.rows[j].pos == 'FW,MF' || res.rows[i].pos == 'MF' && res.rows[j].pos == 'DF,MF' || res.rows[i].pos == 'MF' && res.rows[j].pos == 'MF,DF' || res.rows[i].pos == 'DF,MF' && res.rows[j].pos == 'MF' || res.rows[i].pos == 'DF,MF' && res.rows[j].pos == 'MF,DF' || res.rows[i].pos == 'MF,DF' && res.rows[j].pos == 'MF' || res.rows[i].pos == 'MF,DF' && res.rows[j].pos == 'DF,MF' || res.rows[i].pos == 'MF,FW' && res.rows[j].pos == 'MF'   || res.rows[i].pos == 'FW' && res.rows[j] == 'FW,MF' || res.rows[i].pos == 'FW,MF' && res.rows[j].pos == 'FW'){
                if ((parseFloat(res.rows[i].crrs)  / parseFloat(res.rows[i]._90s)   >= parseFloat(res.rows[j].crrs)  / parseFloat(res.rows[i]._90s) )){
                    position+=1
                }
            }
            }
            if (res.rows[i].pos == 'DF'){
                datasize = datasizeDf;
            } else if (res.rows[i].pos == 'MF'){
                datasize = datasizeMfD + datasizeMfF + datasizeMf;
            } else if (res.rows[i].pos == 'FW'){
                datasize = datasizeFw;
            } else if (res.rows[i].pos == 'MF,FW'){
                datasize = datasizeMfF + datasizeMf;
            } else if (res.rows[i].pos == 'FW,MF'){
                datasize = datasizeFw;
            } else if(res.rows[i].pos == 'DF,MF' || res.rows[i].pos ==  'MF,DF'){
                datasize = datasizeMfD + datasizeMf;
            } else if(res.rows[i].pos == 'DF,FW'){
                datasize = datasizeDf;
            } else if(res.rows[i].pos == 'FW,DF'){
                datasize = datasizeFw;
            }
            let crrs90PER = (position / datasize) * (100);
            if (crrs90PER == Infinity){
                crrs90PER = 0;
            }

            position = 0;
            

            
        for(let j = 0; j < res.rows.length;j++){
                if (res.rows[i].pos == res.rows[j].pos || res.rows[i].pos == 'MF' && res.rows[j].pos == 'MF,FW' ||res.rows[i].pos == 'DF' && res.rows[j].pos == 'DF,FW' || res.rows[i].pos  == 'DF,FW' && res.rows[j].pos == 'DF' || res.rows[i].pos == 'FW' && res.rows[j].pos == 'FW,DF' || res.rows[i].pos == 'FW,DF' && res.rows[j].pos == 'FW' ||res.rows[i].pos == 'FW,MF' && res.rows[j].pos == 'FW,DF' ||res.rows[i].pos == 'FW,DF' && res.rows[j].pos == 'FW,MF' || res.rows[i].pos == 'MF' && res.rows[j].pos == 'DF,MF' || res.rows[i].pos == 'MF' && res.rows[j].pos == 'MF,DF' || res.rows[i].pos == 'DF,MF' && res.rows[j].pos == 'MF' || res.rows[i].pos == 'DF,MF' && res.rows[j].pos == 'MF,DF' || res.rows[i].pos == 'MF,DF' && res.rows[j].pos == 'MF' || res.rows[i].pos == 'MF,DF' && res.rows[j].pos == 'DF,MF' || res.rows[i].pos == 'MF,FW' && res.rows[j].pos == 'MF'   || res.rows[i].pos == 'FW' && res.rows[j] == 'FW,MF' || res.rows[i].pos == 'FW,MF' && res.rows[j].pos == 'FW'){
                if ((parseFloat(res.rows[i].crrs_dis)  / parseFloat(res.rows[i]._90s)   >= parseFloat(res.rows[j].crrs_dis)  / parseFloat(res.rows[i]._90s) )){
                    position+=1
                }
            }
            }
            if (res.rows[i].pos == 'DF'){
                datasize = datasizeDf;
            } else if (res.rows[i].pos == 'MF'){
                datasize = datasizeMfD + datasizeMfF + datasizeMf;
            } else if (res.rows[i].pos == 'FW'){
                datasize = datasizeFw;
            } else if (res.rows[i].pos == 'MF,FW'){
                datasize = datasizeMfF + datasizeMf;
            } else if (res.rows[i].pos == 'FW,MF'){
                datasize = datasizeFw;
            } else if(res.rows[i].pos == 'DF,MF' || res.rows[i].pos ==  'MF,DF'){
                datasize = datasizeMfD + datasizeMf;
            } else if(res.rows[i].pos == 'DF,FW'){
                datasize = datasizeDf;
            } else if(res.rows[i].pos == 'FW,DF'){
                datasize = datasizeFw;
            }
            let crrs_dis90PER = (position / datasize) * (100);
            if (crrs_dis90PER == Infinity){
                crrs_dis90PER = 0;
            }

            position = 0;
            

            
        for(let j = 0; j < res.rows.length;j++){
                if (res.rows[i].pos == res.rows[j].pos || res.rows[i].pos == 'MF' && res.rows[j].pos == 'MF,FW' ||res.rows[i].pos == 'DF' && res.rows[j].pos == 'DF,FW' || res.rows[i].pos  == 'DF,FW' && res.rows[j].pos == 'DF' || res.rows[i].pos == 'FW' && res.rows[j].pos == 'FW,DF' || res.rows[i].pos == 'FW,DF' && res.rows[j].pos == 'FW' ||res.rows[i].pos == 'FW,MF' && res.rows[j].pos == 'FW,DF' ||res.rows[i].pos == 'FW,DF' && res.rows[j].pos == 'FW,MF' || res.rows[i].pos == 'MF' && res.rows[j].pos == 'DF,MF' || res.rows[i].pos == 'MF' && res.rows[j].pos == 'MF,DF' || res.rows[i].pos == 'DF,MF' && res.rows[j].pos == 'MF' || res.rows[i].pos == 'DF,MF' && res.rows[j].pos == 'MF,DF' || res.rows[i].pos == 'MF,DF' && res.rows[j].pos == 'MF' || res.rows[i].pos == 'MF,DF' && res.rows[j].pos == 'DF,MF' || res.rows[i].pos == 'MF,FW' && res.rows[j].pos == 'MF'   || res.rows[i].pos == 'FW' && res.rows[j] == 'FW,MF' || res.rows[i].pos == 'FW,MF' && res.rows[j].pos == 'FW'){
                if ((parseFloat(res.rows[i].crss_prgdis)  / parseFloat(res.rows[i]._90s)   >= parseFloat(res.rows[j].crss_prgdis)  / parseFloat(res.rows[i]._90s) )){
                    position+=1
                }
            }
            }
            if (res.rows[i].pos == 'DF'){
                datasize = datasizeDf;
            } else if (res.rows[i].pos == 'MF'){
                datasize = datasizeMfD + datasizeMfF + datasizeMf;
            } else if (res.rows[i].pos == 'FW'){
                datasize = datasizeFw;
            } else if (res.rows[i].pos == 'MF,FW'){
                datasize = datasizeMfF + datasizeMf;
            } else if (res.rows[i].pos == 'FW,MF'){
                datasize = datasizeFw;
            } else if(res.rows[i].pos == 'DF,MF' || res.rows[i].pos ==  'MF,DF'){
                datasize = datasizeMfD + datasizeMf;
            } else if(res.rows[i].pos == 'DF,FW'){
                datasize = datasizeDf;
            } else if(res.rows[i].pos == 'FW,DF'){
                datasize = datasizeFw;
            }
            let crss_prgdis90PER = (position / datasize) * (100);
            if (crss_prgdis90PER == Infinity){
                crss_prgdis90PER = 0;
            }

            position = 0;
            

            
        for(let j = 0; j < res.rows.length;j++){
                if (res.rows[i].pos == res.rows[j].pos || res.rows[i].pos == 'MF' && res.rows[j].pos == 'MF,FW' ||res.rows[i].pos == 'DF' && res.rows[j].pos == 'DF,FW' || res.rows[i].pos  == 'DF,FW' && res.rows[j].pos == 'DF' || res.rows[i].pos == 'FW' && res.rows[j].pos == 'FW,DF' || res.rows[i].pos == 'FW,DF' && res.rows[j].pos == 'FW' ||res.rows[i].pos == 'FW,MF' && res.rows[j].pos == 'FW,DF' ||res.rows[i].pos == 'FW,DF' && res.rows[j].pos == 'FW,MF' || res.rows[i].pos == 'MF' && res.rows[j].pos == 'DF,MF' || res.rows[i].pos == 'MF' && res.rows[j].pos == 'MF,DF' || res.rows[i].pos == 'DF,MF' && res.rows[j].pos == 'MF' || res.rows[i].pos == 'DF,MF' && res.rows[j].pos == 'MF,DF' || res.rows[i].pos == 'MF,DF' && res.rows[j].pos == 'MF' || res.rows[i].pos == 'MF,DF' && res.rows[j].pos == 'DF,MF' || res.rows[i].pos == 'MF,FW' && res.rows[j].pos == 'MF'   || res.rows[i].pos == 'FW' && res.rows[j] == 'FW,MF' || res.rows[i].pos == 'FW,MF' && res.rows[j].pos == 'FW'){
                if ((parseFloat(res.rows[i].prg_crss)  / parseFloat(res.rows[i]._90s)   >= parseFloat(res.rows[j].prg_crss)  / parseFloat(res.rows[i]._90s) )){
                    position+=1
                }
            }
            }
            if (res.rows[i].pos == 'DF'){
                datasize = datasizeDf;
            } else if (res.rows[i].pos == 'MF'){
                datasize = datasizeMfD + datasizeMfF + datasizeMf;
            } else if (res.rows[i].pos == 'FW'){
                datasize = datasizeFw;
            } else if (res.rows[i].pos == 'MF,FW'){
                datasize = datasizeMfF + datasizeMf;
            } else if (res.rows[i].pos == 'FW,MF'){
                datasize = datasizeFw;
            } else if(res.rows[i].pos == 'DF,MF' || res.rows[i].pos ==  'MF,DF'){
                datasize = datasizeMfD + datasizeMf;
            } else if(res.rows[i].pos == 'DF,FW'){
                datasize = datasizeDf;
            } else if(res.rows[i].pos == 'FW,DF'){
                datasize = datasizeFw;
            }
            let prg_crss90PER = (position / datasize) * (100);
            if (prg_crss90PER == Infinity){
                prg_crss90PER = 0;
            }

            position = 0;
            

            
        for(let j = 0; j < res.rows.length;j++){
                if (res.rows[i].pos == res.rows[j].pos || res.rows[i].pos == 'MF' && res.rows[j].pos == 'MF,FW' ||res.rows[i].pos == 'DF' && res.rows[j].pos == 'DF,FW' || res.rows[i].pos  == 'DF,FW' && res.rows[j].pos == 'DF' || res.rows[i].pos == 'FW' && res.rows[j].pos == 'FW,DF' || res.rows[i].pos == 'FW,DF' && res.rows[j].pos == 'FW' ||res.rows[i].pos == 'FW,MF' && res.rows[j].pos == 'FW,DF' ||res.rows[i].pos == 'FW,DF' && res.rows[j].pos == 'FW,MF' || res.rows[i].pos == 'MF' && res.rows[j].pos == 'DF,MF' || res.rows[i].pos == 'MF' && res.rows[j].pos == 'MF,DF' || res.rows[i].pos == 'DF,MF' && res.rows[j].pos == 'MF' || res.rows[i].pos == 'DF,MF' && res.rows[j].pos == 'MF,DF' || res.rows[i].pos == 'MF,DF' && res.rows[j].pos == 'MF' || res.rows[i].pos == 'MF,DF' && res.rows[j].pos == 'DF,MF' || res.rows[i].pos == 'MF,FW' && res.rows[j].pos == 'MF'   || res.rows[i].pos == 'FW' && res.rows[j] == 'FW,MF' || res.rows[i].pos == 'FW,MF' && res.rows[j].pos == 'FW'){
                if ((parseFloat(res.rows[i].crrs_fin3rd)  / parseFloat(res.rows[i]._90s)   >= parseFloat(res.rows[j].crrs_fin3rd)  / parseFloat(res.rows[i]._90s) )){
                    position+=1
                }
            }
            }
            if (res.rows[i].pos == 'DF'){
                datasize = datasizeDf;
            } else if (res.rows[i].pos == 'MF'){
                datasize = datasizeMfD + datasizeMfF + datasizeMf;
            } else if (res.rows[i].pos == 'FW'){
                datasize = datasizeFw;
            } else if (res.rows[i].pos == 'MF,FW'){
                datasize = datasizeMfF + datasizeMf;
            } else if (res.rows[i].pos == 'FW,MF'){
                datasize = datasizeFw;
            } else if(res.rows[i].pos == 'DF,MF' || res.rows[i].pos ==  'MF,DF'){
                datasize = datasizeMfD + datasizeMf;
            } else if(res.rows[i].pos == 'DF,FW'){
                datasize = datasizeDf;
            } else if(res.rows[i].pos == 'FW,DF'){
                datasize = datasizeFw;
            }
            let crrs_fin3rd90PER = (position / datasize) * (100);
            if (crrs_fin3rd90PER == Infinity){
                crrs_fin3rd90PER = 0;
            }

            position = 0;
            

            
        for(let j = 0; j < res.rows.length;j++){
                if (res.rows[i].pos == res.rows[j].pos || res.rows[i].pos == 'MF' && res.rows[j].pos == 'MF,FW' ||res.rows[i].pos == 'DF' && res.rows[j].pos == 'DF,FW' || res.rows[i].pos  == 'DF,FW' && res.rows[j].pos == 'DF' || res.rows[i].pos == 'FW' && res.rows[j].pos == 'FW,DF' || res.rows[i].pos == 'FW,DF' && res.rows[j].pos == 'FW' ||res.rows[i].pos == 'FW,MF' && res.rows[j].pos == 'FW,DF' ||res.rows[i].pos == 'FW,DF' && res.rows[j].pos == 'FW,MF' || res.rows[i].pos == 'MF' && res.rows[j].pos == 'DF,MF' || res.rows[i].pos == 'MF' && res.rows[j].pos == 'MF,DF' || res.rows[i].pos == 'DF,MF' && res.rows[j].pos == 'MF' || res.rows[i].pos == 'DF,MF' && res.rows[j].pos == 'MF,DF' || res.rows[i].pos == 'MF,DF' && res.rows[j].pos == 'MF' || res.rows[i].pos == 'MF,DF' && res.rows[j].pos == 'DF,MF' || res.rows[i].pos == 'MF,FW' && res.rows[j].pos == 'MF'   || res.rows[i].pos == 'FW' && res.rows[j] == 'FW,MF' || res.rows[i].pos == 'FW,MF' && res.rows[j].pos == 'FW'){
                if ((parseFloat(res.rows[i].crrs_pen)  / parseFloat(res.rows[i]._90s)   >= parseFloat(res.rows[j].crrs_pen)  / parseFloat(res.rows[i]._90s) )){
                    position+=1
                }
            }
            }
            if (res.rows[i].pos == 'DF'){
                datasize = datasizeDf;
            } else if (res.rows[i].pos == 'MF'){
                datasize = datasizeMfD + datasizeMfF + datasizeMf;
            } else if (res.rows[i].pos == 'FW'){
                datasize = datasizeFw;
            } else if (res.rows[i].pos == 'MF,FW'){
                datasize = datasizeMfF + datasizeMf;
            } else if (res.rows[i].pos == 'FW,MF'){
                datasize = datasizeFw;
            } else if(res.rows[i].pos == 'DF,MF' || res.rows[i].pos ==  'MF,DF'){
                datasize = datasizeMfD + datasizeMf;
            } else if(res.rows[i].pos == 'DF,FW'){
                datasize = datasizeDf;
            } else if(res.rows[i].pos == 'FW,DF'){
                datasize = datasizeFw;
            }
            let crrs_pen90PER = (position / datasize) * (100);
            if (crrs_pen90PER == Infinity){
                crrs_pen90PER = 0;
            }

            position = 0;
            

            
        for(let j = 0; j < res.rows.length;j++){
                if (res.rows[i].pos == res.rows[j].pos || res.rows[i].pos == 'MF' && res.rows[j].pos == 'MF,FW' ||res.rows[i].pos == 'DF' && res.rows[j].pos == 'DF,FW' || res.rows[i].pos  == 'DF,FW' && res.rows[j].pos == 'DF' || res.rows[i].pos == 'FW' && res.rows[j].pos == 'FW,DF' || res.rows[i].pos == 'FW,DF' && res.rows[j].pos == 'FW' ||res.rows[i].pos == 'FW,MF' && res.rows[j].pos == 'FW,DF' ||res.rows[i].pos == 'FW,DF' && res.rows[j].pos == 'FW,MF' || res.rows[i].pos == 'MF' && res.rows[j].pos == 'DF,MF' || res.rows[i].pos == 'MF' && res.rows[j].pos == 'MF,DF' || res.rows[i].pos == 'DF,MF' && res.rows[j].pos == 'MF' || res.rows[i].pos == 'DF,MF' && res.rows[j].pos == 'MF,DF' || res.rows[i].pos == 'MF,DF' && res.rows[j].pos == 'MF' || res.rows[i].pos == 'MF,DF' && res.rows[j].pos == 'DF,MF' || res.rows[i].pos == 'MF,FW' && res.rows[j].pos == 'MF'   || res.rows[i].pos == 'FW' && res.rows[j] == 'FW,MF' || res.rows[i].pos == 'FW,MF' && res.rows[j].pos == 'FW'){
                if ((parseFloat(res.rows[i].mis)  / parseFloat(res.rows[i]._90s)   <= parseFloat(res.rows[j].mis)  / parseFloat(res.rows[i]._90s) )){
                    position+=1
                }
            }
            }
            if (res.rows[i].pos == 'DF'){
                datasize = datasizeDf;
            } else if (res.rows[i].pos == 'MF'){
                datasize = datasizeMfD + datasizeMfF + datasizeMf;
            } else if (res.rows[i].pos == 'FW'){
                datasize = datasizeFw;
            } else if (res.rows[i].pos == 'MF,FW'){
                datasize = datasizeMfF + datasizeMf;
            } else if (res.rows[i].pos == 'FW,MF'){
                datasize = datasizeFw;
            } else if(res.rows[i].pos == 'DF,MF' || res.rows[i].pos ==  'MF,DF'){
                datasize = datasizeMfD + datasizeMf;
            } else if(res.rows[i].pos == 'DF,FW'){
                datasize = datasizeDf;
            } else if(res.rows[i].pos == 'FW,DF'){
                datasize = datasizeFw;
            }
            let mis90PER = (position / datasize) * (100);
            if (mis90PER == Infinity){
                mis90PER = 0;
            }

            position = 0;
            

            
        for(let j = 0; j < res.rows.length;j++){
                if (res.rows[i].pos == res.rows[j].pos || res.rows[i].pos == 'MF' && res.rows[j].pos == 'MF,FW' ||res.rows[i].pos == 'DF' && res.rows[j].pos == 'DF,FW' || res.rows[i].pos  == 'DF,FW' && res.rows[j].pos == 'DF' || res.rows[i].pos == 'FW' && res.rows[j].pos == 'FW,DF' || res.rows[i].pos == 'FW,DF' && res.rows[j].pos == 'FW' ||res.rows[i].pos == 'FW,MF' && res.rows[j].pos == 'FW,DF' ||res.rows[i].pos == 'FW,DF' && res.rows[j].pos == 'FW,MF' || res.rows[i].pos == 'MF' && res.rows[j].pos == 'DF,MF' || res.rows[i].pos == 'MF' && res.rows[j].pos == 'MF,DF' || res.rows[i].pos == 'DF,MF' && res.rows[j].pos == 'MF' || res.rows[i].pos == 'DF,MF' && res.rows[j].pos == 'MF,DF' || res.rows[i].pos == 'MF,DF' && res.rows[j].pos == 'MF' || res.rows[i].pos == 'MF,DF' && res.rows[j].pos == 'DF,MF' || res.rows[i].pos == 'MF,FW' && res.rows[j].pos == 'MF'   || res.rows[i].pos == 'FW' && res.rows[j] == 'FW,MF' || res.rows[i].pos == 'FW,MF' && res.rows[j].pos == 'FW'){
                if ((parseFloat(res.rows[i].dis)  / parseFloat(res.rows[i]._90s)   <= parseFloat(res.rows[j].dis)  / parseFloat(res.rows[i]._90s) )){
                    position+=1
                }
            }
            }
            if (res.rows[i].pos == 'DF'){
                datasize = datasizeDf;
            } else if (res.rows[i].pos == 'MF'){
                datasize = datasizeMfD + datasizeMfF + datasizeMf;
            } else if (res.rows[i].pos == 'FW'){
                datasize = datasizeFw;
            } else if (res.rows[i].pos == 'MF,FW'){
                datasize = datasizeMfF + datasizeMf;
            } else if (res.rows[i].pos == 'FW,MF'){
                datasize = datasizeFw;
            } else if(res.rows[i].pos == 'DF,MF' || res.rows[i].pos ==  'MF,DF'){
                datasize = datasizeMfD + datasizeMf;
            } else if(res.rows[i].pos == 'DF,FW'){
                datasize = datasizeDf;
            } else if(res.rows[i].pos == 'FW,DF'){
                datasize = datasizeFw;
            }
            let dis90PER = (position / datasize) * (100);
            if (dis90PER == Infinity){
                dis90PER = 0;
            }
                        

            position = 0;
            

            
        for(let j = 0; j < res.rows.length;j++){
                if (res.rows[i].pos == res.rows[j].pos || res.rows[i].pos == 'MF' && res.rows[j].pos == 'MF,FW' ||res.rows[i].pos == 'DF' && res.rows[j].pos == 'DF,FW' || res.rows[i].pos  == 'DF,FW' && res.rows[j].pos == 'DF' || res.rows[i].pos == 'FW' && res.rows[j].pos == 'FW,DF' || res.rows[i].pos == 'FW,DF' && res.rows[j].pos == 'FW' ||res.rows[i].pos == 'FW,MF' && res.rows[j].pos == 'FW,DF' ||res.rows[i].pos == 'FW,DF' && res.rows[j].pos == 'FW,MF' || res.rows[i].pos == 'MF' && res.rows[j].pos == 'DF,MF' || res.rows[i].pos == 'MF' && res.rows[j].pos == 'MF,DF' || res.rows[i].pos == 'DF,MF' && res.rows[j].pos == 'MF' || res.rows[i].pos == 'DF,MF' && res.rows[j].pos == 'MF,DF' || res.rows[i].pos == 'MF,DF' && res.rows[j].pos == 'MF' || res.rows[i].pos == 'MF,DF' && res.rows[j].pos == 'DF,MF' || res.rows[i].pos == 'MF,FW' && res.rows[j].pos == 'MF'   || res.rows[i].pos == 'FW' && res.rows[j] == 'FW,MF' || res.rows[i].pos == 'FW,MF' && res.rows[j].pos == 'FW'){
                if ((parseFloat(res.rows[i].p_rec)  / parseFloat(res.rows[i]._90s)   >= parseFloat(res.rows[j].p_rec)  / parseFloat(res.rows[i]._90s) )){
                    position+=1
                }
            }
            }
            if (res.rows[i].pos == 'DF'){
                datasize = datasizeDf;
            } else if (res.rows[i].pos == 'MF'){
                datasize = datasizeMfD + datasizeMfF + datasizeMf;
            } else if (res.rows[i].pos == 'FW'){
                datasize = datasizeFw;
            } else if (res.rows[i].pos == 'MF,FW'){
                datasize = datasizeMfF + datasizeMf;
            } else if (res.rows[i].pos == 'FW,MF'){
                datasize = datasizeFw;
            } else if(res.rows[i].pos == 'DF,MF' || res.rows[i].pos ==  'MF,DF'){
                datasize = datasizeMfD + datasizeMf;
            } else if(res.rows[i].pos == 'DF,FW'){
                datasize = datasizeDf;
            } else if(res.rows[i].pos == 'FW,DF'){
                datasize = datasizeFw;
            }
            let p_rec90PER = (position / datasize) * (100);
            if (p_rec90PER == Infinity){
                p_rec90PER = 0;
            }
                        

            position = 0;
            

            
        for(let j = 0; j < res.rows.length;j++){
                if (res.rows[i].pos == res.rows[j].pos || res.rows[i].pos == 'MF' && res.rows[j].pos == 'MF,FW' ||res.rows[i].pos == 'DF' && res.rows[j].pos == 'DF,FW' || res.rows[i].pos  == 'DF,FW' && res.rows[j].pos == 'DF' || res.rows[i].pos == 'FW' && res.rows[j].pos == 'FW,DF' || res.rows[i].pos == 'FW,DF' && res.rows[j].pos == 'FW' ||res.rows[i].pos == 'FW,MF' && res.rows[j].pos == 'FW,DF' ||res.rows[i].pos == 'FW,DF' && res.rows[j].pos == 'FW,MF' || res.rows[i].pos == 'MF' && res.rows[j].pos == 'DF,MF' || res.rows[i].pos == 'MF' && res.rows[j].pos == 'MF,DF' || res.rows[i].pos == 'DF,MF' && res.rows[j].pos == 'MF' || res.rows[i].pos == 'DF,MF' && res.rows[j].pos == 'MF,DF' || res.rows[i].pos == 'MF,DF' && res.rows[j].pos == 'MF' || res.rows[i].pos == 'MF,DF' && res.rows[j].pos == 'DF,MF' || res.rows[i].pos == 'MF,FW' && res.rows[j].pos == 'MF'   || res.rows[i].pos == 'FW' && res.rows[j] == 'FW,MF' || res.rows[i].pos == 'FW,MF' && res.rows[j].pos == 'FW'){
                if ((parseFloat(res.rows[i].prg_prec)  / parseFloat(res.rows[i]._90s)   >= parseFloat(res.rows[j].prg_prec)  / parseFloat(res.rows[i]._90s) )){
                    position+=1
                }
            }
        }
            if (res.rows[i].pos == 'DF'){
                datasize = datasizeDf;
            } else if (res.rows[i].pos == 'MF'){
                datasize = datasizeMfD + datasizeMfF + datasizeMf;
            } else if (res.rows[i].pos == 'FW'){
                datasize = datasizeFw;
            } else if (res.rows[i].pos == 'MF,FW'){
                datasize = datasizeMfF + datasizeMf;
            } else if (res.rows[i].pos == 'FW,MF'){
                datasize = datasizeFw;
            } else if(res.rows[i].pos == 'DF,MF' || res.rows[i].pos ==  'MF,DF'){
                datasize = datasizeMfD + datasizeMf;
            } else if(res.rows[i].pos == 'DF,FW'){
                datasize = datasizeDf;
            } else if(res.rows[i].pos == 'FW,DF'){
                datasize = datasizeFw;
            }
        
            let prg_prec90PER = (position / datasize) * (100);
            if (prg_prec90PER == Infinity){
                prg_prec90PER = 0;
            }
            const arr = [`${i},${res.rows[i]._90s},${gls90PER.toFixed(3)}, ${sh90PER.toFixed(3)}, ${sotpctPER.toFixed(3)}, ${g_sh90PER.toFixed(3)}, ${g_sot90PER.toFixed(3)}, ${av_dis90PER.toFixed(3)}, ${xg90PER.toFixed(3)},${npxg90PER.toFixed(3)}, ${npxg_sh90PER.toFixed(3)}, ${gmin_xg90PER.toFixed(3)}, ${cmp90PER.toFixed(3)}, ${cpmpctPER.toFixed(3)}, ${sho_cmppctPER.toFixed(3)}, ${med_cmppctPER.toFixed(3)}, ${lon_cmppctPER.toFixed(3)}, ${ast90PER.toFixed(3)}, ${xag90PER.toFixed(3)}, ${xa90PER.toFixed(3)}, ${kp90PER.toFixed(3)}, ${fin3rd_p90PER.toFixed(3)}, ${p_inpen90PER.toFixed(3)}, ${crs_inpen90PER.toFixed(3)}, ${prog_p90PER.toFixed(3)}, ${tkl90PER.toFixed(3)}, ${tkl_w90PER.toFixed(3)}, ${tkl_att3rd90PER.toFixed(3)}, ${drb_tkl90PER.toFixed(3)}, ${drb_chl90PER.toFixed(3)}, ${drb_tklpctPER.toFixed(3)}, ${chl_lst90PER.toFixed(3)}, ${blck90PER.toFixed(3)}, ${sh_blck90PER.toFixed(3)}, ${p_blck90PER.toFixed(3)}, ${intc90PER.toFixed(3)}, ${clr90PER.toFixed(3)}, ${sca_p90PER.toFixed(3)}, ${sca_pl90PER.toFixed(3)}, ${sca_to90PER.toFixed(3)}, ${sca_sh90PER.toFixed(3)}, ${sca_fd90PER.toFixed(3)}, ${sca_def90PER.toFixed(3)}, ${gca_90PER.toFixed(3)},${gca_to90PER.toFixed(3)}, ${tch90PER.toFixed(3)}, ${to_att90PER.toFixed(3)}, ${to_tklpctPER.toFixed(3)}, ${crrs90PER.toFixed(3)}, ${crrs_dis90PER.toFixed(3)}, ${crss_prgdis90PER.toFixed(3)}, ${prg_crss90PER.toFixed(3)}, ${crrs_fin3rd90PER.toFixed(3)}, ${crrs_pen90PER.toFixed(3)}, ${mis90PER.toFixed(3)}, ${dis90PER.toFixed(3)}, ${p_rec90PER.toFixed(3)}, ${prg_prec90PER.toFixed(3)}`]
            for(let r in arr){
                if (r == 'Infinity'){
                    console.log(r)
                    console.log(`${res.rows[i].player}`)
                }
            }
            
            // if(res.rows[i].pos != 'DF' && res.rows[i].pos != 'DF,MF' && res.rows[i].pos != 'MF,DF' && res.rows[i].pos != 'MF' && res.rows[i].pos != 'MF,FW' && res.rows[i].pos != 'FW,MF' && res.rows[i].pos != 'FW'){
            //     invalidcount++;
            //     console.log(`Invalid Position is :-${res.rows[i].pos}-`);
            //     console.log(`Invalid player name is : ${res.rows[i].player}`);
            //     console.log(`Invalid Count:${invalidcount}`)
            // }
            //console.log(res.rows[i].player)
            console.log(res.rows[i].id)
            
            client.query(`UPDATE playerdata SET per_id = ${res.rows[i].id} WHERE id = ${res.rows[i].id}`)
            //client.query(`INSERT INTO playerdataPER(id, _90s, gls90PER, sh90PER, sotpctPER, g_sh90PER, g_sot90PER, av_dis90PER, xg90PER, npxg90PER, npxg_sh90PER, gmin_xg90PER, cmp90PER, cmppctPER, sho_cmppctPER, med_cmppctPER, lon_cmppctPER, ast90PER, xag90PER, xa90PER, kp90PER, fin3rd_p90PER, p_inpen90PER, crs_inpen90PER, prog_p90PER, tkl90PER, tkl_w90PER,tkl_att3rd90PER, drb_tkl90PER, drb_chl90PER, drb_tklpctPER, chl_lst90PER, blck90PER, sh_blck90PER, p_blck90PER, intc90PER, clr90PER,sca_p90PER, sca_pl90PER, sca_to90PER, sca_sh90PER, sca_fd90PER, sca_def90PER, gca_90PER, gca_to90PER,tch90PER, to_att90, to_tklpctPER, crrs90PER, crrs_dis90PER, crss_prgdis90PER, prg_crss90PER, crrs_fin3rd90PER, crrs_pen90PER, mis90PER, dis90PER, p_rec90PER, prg_prec90PER)VALUES ('${res.rows[i].id}','${res.rows[i]._90s}','${gls90PER.toFixed(3)}', '${sh90PER.toFixed(3)}', '${sotpctPER.toFixed(3)}', '${g_sh90PER.toFixed(3)}', '${g_sot90PER.toFixed(3)}', '${av_dis90PER.toFixed(3)}', '${xg90PER.toFixed(3)}','${npxg90PER.toFixed(3)}', '${npxg_sh90PER.toFixed(3)}', '${gmin_xg90PER.toFixed(3)}', '${cmp90PER.toFixed(3)}', '${cpmpctPER.toFixed(3)}', '${sho_cmppctPER.toFixed(3)}', '${med_cmppctPER.toFixed(3)}', '${lon_cmppctPER.toFixed(3)}', '${ast90PER.toFixed(3)}', '${xag90PER.toFixed(3)}', '${xa90PER.toFixed(3)}', '${kp90PER.toFixed(3)}', '${fin3rd_p90PER.toFixed(3)}', '${p_inpen90PER.toFixed(3)}', '${crs_inpen90PER.toFixed(3)}', '${prog_p90PER.toFixed(3)}', '${tkl90PER.toFixed(3)}', '${tkl_w90PER.toFixed(3)}', '${tkl_att3rd90PER.toFixed(3)}', '${drb_tkl90PER.toFixed(3)}', '${drb_chl90PER.toFixed(3)}', '${drb_tklpctPER.toFixed(3)}', '${chl_lst90PER.toFixed(3)}', '${blck90PER.toFixed(3)}', '${sh_blck90PER.toFixed(3)}', '${p_blck90PER.toFixed(3)}', '${intc90PER.toFixed(3)}', '${clr90PER.toFixed(3)}', '${sca_p90PER.toFixed(3)}', '${sca_pl90PER.toFixed(3)}', '${sca_to90PER.toFixed(3)}', '${sca_sh90PER.toFixed(3)}', '${sca_fd90PER.toFixed(3)}', '${sca_def90PER.toFixed(3)}', '${gca_90PER.toFixed(3)}','${gca_to90PER.toFixed(3)}', '${tch90PER.toFixed(3)}', '${to_att90PER.toFixed(3)}', '${to_tklpctPER.toFixed(3)}', '${crrs90PER.toFixed(3)}', '${crrs_dis90PER.toFixed(3)}', '${crss_prgdis90PER.toFixed(3)}', '${prg_crss90PER.toFixed(3)}', '${crrs_fin3rd90PER.toFixed(3)}', '${crrs_pen90PER.toFixed(3)}', '${mis90PER.toFixed(3)}', '${dis90PER.toFixed(3)}', '${p_rec90PER.toFixed(3)}', '${prg_prec90PER.toFixed(3)}')`)
            
        }
    console.log('Done')
    } if(err) {
    console.log(err.message)
    }
    
    client.end;
} 
)
