const client = require('./dataBaseInfo');

client.connect()
  .then(() => console.log('Connected to the database'))
  .catch(err => console.error('Connection error', err.stack));

  

  client.query(`
    ALTER TABLE playerdata
    ADD COLUMN per_id BIGINT
    ADD CONSTRAINT per_link
    FOREIGN KEY (per_id) REFERENCES playerdataPER (id);
    `);

