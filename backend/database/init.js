// database/init.js

const { Client } = require('pg');
const config = require('./config');

// Conexión a la base de datos
const client = new Client(config);

async function initDb() {
  try {
    await client.connect();

    // Crear tablas si no existen
    await client.query(`
      CREATE TABLE IF NOT EXISTS products (
        id SERIAL PRIMARY KEY,
        nombre TEXT,
        precio REAL,
        proveedor TEXT,
        stock INT,
        fecha DATE,
        imagePath TEXT
      )
    `);

    await client.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        usuario TEXT,
        password TEXT,
        rol TEXT
      )
    `);

    console.log('Base de datos inicializada y tablas creadas');
  } catch (err) {
    console.error('Error al inicializar la base de datos', err);
  } finally {
    await client.end();
  }
}

initDb();
