const express = require('express');
const router = express.Router();
const db = require('../db');

router.get('/', async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM productos');
    res.json(result.rows);
  } catch (error) {
    console.error('Error al obtener productos', error);
    res.status(500).json({ error: 'Error al obtener productos' });
  }
});

router.post('/', async (req, res) => {
  const { nombre, categoria, precio, proveedor, stock, fecha, imagen } = req.body;
  try {
    const result = await db.query(
      'INSERT INTO productos (nombre, categoria, precio, proveedor, stock, fecha, imagen) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *',
      [nombre, categoria, precio, proveedor, stock, fecha, imagen]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Error al registrar producto', error);
    res.status(500).json({ error: 'Error al registrar producto' });
  }
});

module.exports = router;