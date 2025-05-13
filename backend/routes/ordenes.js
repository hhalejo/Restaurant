// routes/ordenes.js
const express = require('express');
const fs = require('fs');
const path = require('path');

const router = express.Router();

router.post('/guardar', (req, res) => {
  const { mesa, orden, total } = req.body;

  if (!mesa || !orden || !Array.isArray(orden)) {
    return res.status(400).json({ message: 'Datos inválidos' });
  }

  const dir = path.join(__dirname, '..', 'ordenes');
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir); // Crea la carpeta si no existe
  }

  const nombreArchivo = `mesa-${mesa}.json`;
  const rutaArchivo = path.join(dir, nombreArchivo);

  let datosExistentes = {
    mesa,
    orden: [],
    total: 0,
    fecha: new Date().toISOString()
  };

  // Si ya existe, leemos y sumamos
  if (fs.existsSync(rutaArchivo)) {
    try {
      const contenido = fs.readFileSync(rutaArchivo, 'utf-8');
      datosExistentes = JSON.parse(contenido);

      // Agregar productos nuevos o sumar cantidades si ya existen
      orden.forEach(nuevoItem => {
        const existente = datosExistentes.orden.find(item => item.product === nuevoItem.product);
        if (existente) {
          existente.quantity += nuevoItem.quantity;
          existente.total += nuevoItem.total;
        } else {
          datosExistentes.orden.push(nuevoItem);
        }
      });

      // Actualiza total
      datosExistentes.total = datosExistentes.orden.reduce((sum, item) => sum + item.total, 0);
      datosExistentes.fecha = new Date().toISOString();
    } catch (err) {
      console.error('Error leyendo el archivo existente:', err);
      return res.status(500).json({ message: 'Error leyendo orden existente' });
    }
  } else {
    // Si no existe, usamos los datos recibidos directamente
    datosExistentes = {
      mesa,
      orden,
      total,
      fecha: new Date().toISOString()
    };
  }

  // Guardamos el archivo actualizado
  fs.writeFile(rutaArchivo, JSON.stringify(datosExistentes, null, 2), (err) => {
    if (err) {
      console.error('Error al guardar el archivo:', err);
      return res.status(500).json({ message: 'Error al guardar la orden' });
    }

    res.json({ message: `Orden guardada para la mesa ${mesa}` });
  });
});

module.exports = router;
