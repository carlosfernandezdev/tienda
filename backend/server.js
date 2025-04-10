// backend/server.js
const express = require('express');
const path = require('path');
const cors = require('cors');
const app = express();
const { Pool } = require('pg');
const multer = require('multer');
const fs = require('fs');

// Configuración de la base de datos PostgreSQL
const pool = new Pool({
  user: 'postgres', 
  host: 'localhost',
  database: 'tienda',
  password: 'password',
  port: 5432,
});

// Configurar CORS
app.use(cors());

// Configuración de Multer para subir imágenes
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadDir = path.join(__dirname, 'uploads');
    // Si no existe la carpeta 'uploads', créala
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir);
    }
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); // Usar timestamp para evitar colisiones
  },
});

const upload = multer({ storage: storage });

// Endpoint para agregar un producto
app.post('/products', upload.single('image'), async (req, res) => {
  const { nombre, precio, proveedor, stock, fecha } = req.body;
  const imagePath = `/uploads/${req.file.filename}`; // Guardar la ruta de la imagen

  try {
    await pool.query(
      'INSERT INTO products (nombre, precio, proveedor, stock, fecha, imagePath) VALUES ($1, $2, $3, $4, $5, $6)',
      [nombre, precio, proveedor, stock, fecha, imagePath]
    );
    res.status(201).json({ message: 'Producto agregado exitosamente' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al agregar producto' });
  }
});

// Endpoint para obtener todos los productos
app.get('/products', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM products');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al obtener productos' });
  }
});

// Servir imágenes desde la carpeta 'uploads'
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.listen(3001, () => {
  console.log('Servidor backend corriendo en http://localhost:3001');
});
