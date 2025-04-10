const express = require('express');
const router = express.Router();
const db = require('../db');

router.post('/register', async (req, res) => {
  const { usuario, password, rol } = req.body;
  try {
    const result = await db.query(
      'INSERT INTO usuarios (usuario, password, rol) VALUES ($1, $2, $3) RETURNING *',
      [usuario, password, rol]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Error al registrar usuario', error);
    res.status(500).json({ error: 'Error al registrar usuario' });
  }
});

router.post('/login', async (req, res) => {
  const { usuario, password } = req.body;
  try {
    const result = await db.query(
      'SELECT * FROM usuarios WHERE usuario = $1 AND password = $2',
      [usuario, password]
    );

    if (result.rows.length === 0) {
      return res.status(401).json({ error: 'Usuario o contraseña incorrecta' });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error al iniciar sesión', error);
    res.status(500).json({ error: 'Error al iniciar sesión' });
  }
});

module.exports = router;