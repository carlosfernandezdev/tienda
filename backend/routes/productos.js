const express = require('express');
const router = express.Router();
const db = require('../db');
const multer = require('multer');
const path = require('path');

//  Configuración de multer para guardar imágenes en la carpeta /uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '..', 'uploads')); // guarda en /uploads
  },
  filename: (req, file, cb) => {
    const uniqueName = Date.now() + '-' + file.originalname;
    cb(null, uniqueName);
  }
});

const upload = multer({ storage });

// GET todos los productos
router.get('/', async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM productos');
    res.json(result.rows);
  } catch (error) {
    console.error('Error al obtener productos', error);
    res.status(500).json({ error: 'Error al obtener productos' });
  }
});

// 🆕 POST producto con imagen 
router.post('/', upload.single('imagen'), async (req, res) => {
  const { nombre, categoria, precio, proveedor, stock, fecha } = req.body;
  const archivoImagen = req.file;

  if (!archivoImagen) {
    return res.status(400).json({ error: 'Debe subir una imagen del producto' });
  }

  const rutaImagen = `/uploads/${archivoImagen.filename}`;

  try {
    const result = await db.query(
      `INSERT INTO productos (nombre, categoria, precio, proveedor, stock, fecha, imagen)
       VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`,
      [nombre, categoria, precio, proveedor, stock, fecha, rutaImagen]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Error al registrar producto', error);
    res.status(500).json({ error: 'Error al registrar producto' });
  }
});

module.exports = router;
