require('dotenv').config();
const express = require('express');
const cors = require('cors');
const productosRoutes = require('./routes/products');
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware para parsear JSON
app.use(cors());
app.use(express.json());

app.use('/api/productos', productosRoutes);

// Ruta de prueba
app.listen(PORT, () => {
  console.log(`Servidor backend corriendo en http://localhost:${PORT}`);
}
);

