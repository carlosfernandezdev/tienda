const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',  
  host: 'localhost',
  database: 'tienda', 
  password: '0209',       
  port: 5432
});

module.exports = pool;