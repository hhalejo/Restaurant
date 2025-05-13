const express = require('express');
const router = express.Router();
const db = require('../db');

// GET productos (con JOIN a categorías y filtro opcional)
router.get('/', (req, res) => {
  const categoriaId = req.query.categoria_id;

  let sql = `
    SELECT productos.*, categorias.nombre AS categoria_nombre
    FROM productos
    LEFT JOIN categorias ON productos.categoria_id = categorias.id
  `;

  if (categoriaId) {
    sql += ` WHERE productos.categoria_id = ?`;
  }

  db.query(sql, categoriaId ? [categoriaId] : [], (err, results) => {
    if (err) {
      console.error('Error al obtener productos:', err);
      return res.status(500).json({ error: 'Error al obtener productos' });
    }
    res.json(results);
  });
});

// GET categorías
router.get('/categorias', (req, res) => {
  db.query('SELECT * FROM categorias', (err, results) => {
    if (err) {
      console.error('Error al obtener categorías:', err);
      return res.status(500).json({ error: 'Error al obtener categorías' });
    }
    res.json(results);
  });
});

module.exports = router;
