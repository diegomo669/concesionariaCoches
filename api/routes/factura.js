const express = require('express');
const router = express.Router();
const db = require('../db'); // conexión a PostgreSQL

router.post('/', async (req, res) => {
  const { marca, modelo, chasis, precio, fecha } = req.body;

  if (!marca || !modelo || !chasis || !precio || !fecha) {
    return res.json({ success: false, message: 'Faltan datos' });
  }

  try {
    await db.query(
      'INSERT INTO factura (marca, modelo, chasis, precio, fecha) VALUES ($1, $2, $3, $4, $5)',
      [marca, modelo, chasis, precio, fecha]
    );
    res.json({ success: true });
  } catch (error) {
    console.error('Error al guardar factura:', error);
    res.status(500).json({ success: false, message: 'Error en el servidor' });
  }
});

module.exports = router;
