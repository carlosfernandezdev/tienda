const express = require('express');
const cors = require('cors');
const app = express();
const puerto = 4000;

app.use(cors());
app.use(express.json());

app.use('/api/usuarios', require('./routes/usuarios'));
app.use('/api/productos', require('./routes/productos'));

app.listen(puerto, () => {
  console.log(`Servidor escuchando en http://localhost:${puerto}`);
});