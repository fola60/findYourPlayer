const client = require('./dataBaseInfo');

client.connect()
  .then(() => console.log('Connected to the database'))
  .catch(err => console.error('Connection error', err.stack));

  
  /*
  client.query(`
    ALTER TABLE playerdata
    ADD COLUMN per_id BIGINT
    ADD CONSTRAINT per_link
    FOREIGN KEY (per_id) REFERENCES playerdataPER (id);
    `);
  
  client.query(`
      ALTER TABLE playerdataPER
      ADD COLUMN plcl_id BIGINT
      ADD CONSTRAINT plcl_link
      FOREIGN KEY (plcl_id) REFERENCES playerclasses (id)
    `,(err,res) => {
      if (err) {
        console.log(err);
      }
    })
    */
    async function doQuery() {
      try {
          
          const res = await client.query('SELECT * FROM playerdataPER;');
  
          
          for (let i = 0; i < res.rows.length; i++) {
              
              await client.query('UPDATE playerdataPER SET plcl_id = $1 WHERE id = $1', [i + 1]);
          }
  
          console.log('Insertions completed.');
      } catch (err) {
          console.error('Error during database operation:', err);
      } finally {
          
          await client.end();
      }
  }
    doQuery();
