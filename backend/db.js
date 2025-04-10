const pgp = require('pg-promise')();
const config = require('./database/config');

// Conexión a la base de datos
const db = pgp(config);

// Funciones para manejar productos
const getProducts = () => {
  return db.any('SELECT * FROM products');
};

const createProduct = (nombre, precio, proveedor, stock, fecha, imagePath) => {
  return db.one(
    'INSERT INTO products (nombre, precio, proveedor, stock, fecha, imagePath) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
    [nombre, precio, proveedor, stock, fecha, imagePath]
  );
};

// Funciones para manejar usuarios
const getUsers = () => {
  return db.any('SELECT * FROM users');
};

const createUser = (usuario, password, rol) => {
  return db.one(
    'INSERT INTO users (usuario, password, rol) VALUES ($1, $2, $3) RETURNING *',
    [usuario, password, rol]
  );
};

module.exports = { getProducts, createProduct, getUsers, createUser };
