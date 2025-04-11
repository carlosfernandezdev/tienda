const express = require('express');
const router = express.Router();
const db = require('../db');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Configuración de multer para guardar imágenes
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '..', 'uploads'));
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

// POST nuevo producto
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

// ✅ PUT para editar un producto
router.put('/:id', upload.single('imagen'), async (req, res) => {
  const { id } = req.params;
  const { nombre, categoria, precio, proveedor, stock, fecha } = req.body;
  const archivoImagen = req.file;

  try {
    // Si se sube una nueva imagen, actualizamos también esa columna
    if (archivoImagen) {
      const rutaImagen = `/uploads/${archivoImagen.filename}`;

      // Buscar imagen anterior y eliminarla (opcional pero recomendado)
      const productoAnterior = await db.query('SELECT imagen FROM productos WHERE id = $1', [id]);
      const anterior = productoAnterior.rows[0]?.imagen;
      if (anterior) {
        const imagenPath = path.join(__dirname, '..', anterior);
        if (fs.existsSync(imagenPath)) fs.unlinkSync(imagenPath);
      }

      const result = await db.query(
        `UPDATE productos
         SET nombre=$1, categoria=$2, precio=$3, proveedor=$4, stock=$5, fecha=$6, imagen=$7
         WHERE id=$8 RETURNING *`,
        [nombre, categoria, precio, proveedor, stock, fecha, rutaImagen, id]
      );
      return res.json(result.rows[0]);
    }

    // Sin nueva imagen
    const result = await db.query(
      `UPDATE productos
       SET nombre=$1, categoria=$2, precio=$3, proveedor=$4, stock=$5, fecha=$6
       WHERE id=$7 RETURNING *`,
      [nombre, categoria, precio, proveedor, stock, fecha, id]
    );
    res.json(result.rows[0]);

  } catch (error) {
    console.error('Error al editar producto', error);
    res.status(500).json({ error: 'Error al editar producto' });
  }
});

// DELETE producto
router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    // Obtener imagen para eliminar del disco
    const producto = await db.query('SELECT imagen FROM productos WHERE id = $1', [id]);
    const imagen = producto.rows[0]?.imagen;

    if (imagen) {
      const imagenPath = path.join(__dirname, '..', imagen);
      if (fs.existsSync(imagenPath)) fs.unlinkSync(imagenPath);
    }

    await db.query('DELETE FROM productos WHERE id = $1', [id]);
    res.json({ mensaje: 'Producto eliminado' });

  } catch (error) {
    console.error('Error al eliminar producto', error);
    res.status(500).json({ error: 'Error al eliminar producto' });
  }
});

module.exports = router;
