const express = require('express');
const router = express.Router();
const db = require('../db');

router.get('/', async (req, res) => {
    try {
      console.log("Solicitud recibida...");
      const resultado = await db.query('SELECT * FROM TIPO_VEHICULO ');
      console.log("Resultado:", resultado.rows);
      res.json({ success: true, resultado:resultado.rows });

    } catch (err) {
      console.error("Error en la consulta:", err);
      res.status(500).json({success: false,  error: err.message });
    }
  });
router.post("/", async (req, res) => {
    try {
        const { tipo } = req.body;
        console.log(tipo);
        const query = "SELECT * FROM insertar_tipo_vehiculo($1)";
        const result = await db.query(query, [tipo]);
        console.log(result);
        res.json({ success: true, resultado: result.rows[0] });
    } catch (error) {
        console.error("Error al registrar tipo del vehículo:", error);
        res.json({ success: false, error: error.message });
    }
});

module.exports = router;