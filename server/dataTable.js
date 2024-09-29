const client = require('./dataBaseInfo');

client.connect()
  .then(() => console.log('Connected to the database'))
  .catch(err => console.error('Connection error', err.stack));


const createTableQuery = `
  CREATE TABLE playerdata (
    id BIGSERIAL PRIMARY KEY,
    per_id BIGINT,
    player TEXT,
    nation TEXT,
    pos TEXT,
    team TEXT,
    comp TEXT,
    age TEXT,
    birthyear FLOAT,
    _90s FLOAT,
    gls FLOAT,
    sh FLOAT,
    sot FLOAT,
    sotpct FLOAT,
    sotper90 FLOAT,
    g_sh FLOAT,
    g_sot FLOAT,
    av_dis FLOAT,
    shots_from_free_kicks FLOAT,
    penalties_created FLOAT,
    penalties_attempted FLOAT,
    xg FLOAT,
    npxg FLOAT,
    npxg_sh FLOAT,
    gmin_xg FLOAT,
    npg_npxg FLOAT,
    cmp FLOAT,
    pass_attempted FLOAT,
    cmppct FLOAT,
    total_pass_distance FLOAT,
    progpass_distance FLOAT,
    short_pass_completed FLOAT,
    short_pass_attempted FLOAT,
    sho_cmppct FLOAT,
    medium_pass_completed FLOAT,
    medium_pass_attempted FLOAT,
    med_cpmpct FLOAT,
    long_pass_completed FLOAT,
    long_pass_attempted FLOAT,
    lon_cmppct FLOAT,
    ast FLOAT,
    xag FLOAT,
    xa FLOAT,
    a_xag FLOAT,
    kp FLOAT,
    fin3rd_p FLOAT,
    p_inpen FLOAT,
    crs_inpen FLOAT,
    prog_p FLOAT,
    tkl FLOAT,
    tkl_w FLOAT,
    tackle_def3rd FLOAT,
    tackle_mid3rd FLOAT,
    tkl_att3rd FLOAT,
    drb_tkl FLOAT,
    drb_chl FLOAT,
    drb_tklpct FLOAT,
    chl_lst FLOAT,
    blck FLOAT,
    sh_blck FLOAT,
    p_blck FLOAT,
    intc FLOAT,
    clr FLOAT,
    sca FLOAT,
    sca_p90 FLOAT,
    sca_pl FLOAT,
    sca_pd FLOAT,
    sca_to FLOAT,
    sca_sh FLOAT,
    sca_fd FLOAT,
    sca_def FLOAT,
    gca FLOAT,
    gca_90 FLOAT,
    gca_to FLOAT,
    tch FLOAT,
    tch_defpen FLOAT,
    tch_def FLOAT,
    tch_mid FLOAT,
    tch_att FLOAT,
    tch_attpen FLOAT,
    to_att FLOAT,
    to_suc FLOAT,
    to_supct FLOAT,
    to_tklpct FLOAT,
    crrs FLOAT,
    crrs_dis FLOAT,
    crss_prgdis FLOAT,
    prg_crss FLOAT,
    crrs_fin3rd FLOAT,
    crrs_pen FLOAT,
    mis FLOAT,
    dis FLOAT,
    p_rec FLOAT,
    prg_prec FLOAT
  );
`;

// Run the create table query
client.query(createTableQuery, (err, res) => {
  if (err) {
    console.error('Error executing query', err.stack);
  } else {
    console.log('Table created successfully');
  }
  
  // Close the connection
  client.end();
});
