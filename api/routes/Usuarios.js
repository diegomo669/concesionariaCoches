// routes/usuarios.js
const express = require('express');
const router = express.Router();
const db = require('../db'); // Asegúrate de tener este archivo con conexión a PostgreSQL


router.post('/', async (req, res) => {
  const { nombre, email, telefono, preferencia } = req.body;


  if (!nombre || !email || !telefono || !preferencia) {
    return res.json({ success: false, message: 'Faltan datos' });
  }


  try {
    await db.query(
      'INSERT INTO usuario (nombre, email, telefono, preferencia) VALUES ($1, $2, $3, $4)',
      [nombre, email, telefono, preferencia]
    );
    res.json({ success: true });
  } catch (error) {
    console.error('Error al insertar usuario:', error);
    res.status(500).json({ success: false, message: 'Error en el servidor' });
  }
});


module.exports = router;
