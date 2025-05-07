const express = require('express');
const router = express.Router();
const db = require('../db');

// GET productos
router.get('/', (req, res) => {
  db.query('SELECT * FROM products', (err, results) => {
    if (err) {
      return res.status(500).json({ error: 'Error al obtener productos' });
    }
    res.json(results);
  });
});

module.exports = router;
