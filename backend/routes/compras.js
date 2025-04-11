const express = require('express');
const router = express.Router();
const pool = require('../db');

// Crear una nueva compra
router.post('/', async (req, res) => {
  const { usuario_id, carrito } = req.body;

  if (!carrito || carrito.length === 0) {
    return res.status(400).json({ error: 'El carrito está vacío' });
  }

  const client = await pool.connect();

  try {
    await client.query('BEGIN');

    const total = carrito.reduce((sum, p) => sum + p.precio * p.cantidad, 0);

    const compra = await client.query(
      'INSERT INTO compras (usuario_id, total) VALUES ($1, $2) RETURNING id',
      [usuario_id || null, total]
    );

    const compraId = compra.rows[0].id;

    for (const producto of carrito) {
      await client.query(
        `INSERT INTO detalle_compra (compra_id, producto_id, cantidad, precio_unitario)
         VALUES ($1, $2, $3, $4)`,
        [compraId, producto.id, producto.cantidad, producto.precio]
      );
    }

    await client.query('COMMIT');
    res.status(201).json({ mensaje: 'Compra registrada', compraId });
  } catch (err) {
    await client.query('ROLLBACK');
    console.error('Error al registrar compra', err);
    res.status(500).json({ error: 'Error al registrar la compra' });
  } finally {
    client.release();
  }
});

// Obtener la última compra de un usuario con sus detalles
router.get('/ultima/:usuarioId', async (req, res) => {
  const { usuarioId } = req.params;

  try {
    const compra = await pool.query(
      `SELECT id FROM compras WHERE usuario_id = $1 ORDER BY fecha DESC LIMIT 1`,
      [usuarioId]
    );

    if (compra.rows.length === 0) {
      return res.json({ detalles: [] });
    }

    const compraId = compra.rows[0].id;

    const detalles = await pool.query(
      `SELECT dc.cantidad, dc.precio_unitario AS precio, p.nombre 
       FROM detalle_compra dc 
       JOIN productos p ON dc.producto_id = p.id 
       WHERE dc.compra_id = $1`,
      [compraId]
    );

    res.json({ detalles: detalles.rows });
  } catch (error) {
    console.error('Error al obtener última compra', error);
    res.status(500).json({ error: 'Error al obtener última compra' });
  }
});

module.exports = router;
