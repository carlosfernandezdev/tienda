const express = require('express');
const cors = require('cors');
const path = require('path'); 

const app = express();
const port = 4000;

app.use(cors());
app.use(express.json());

// Middleware para servir archivos estáticos
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Rutas API
app.use('/api/usuarios', require('./routes/usuarios'));
app.use('/api/productos', require('./routes/productos'));
app.use('/api/compras', require('./routes/compras'));


app.listen(port, () => {
  console.log(`Servidor backend corriendo en http://localhost:${port}`);
});
