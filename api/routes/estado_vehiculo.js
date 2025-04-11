const express = require('express');
const router = express.Router();
const db = require('../db');

router.get('/', async (req, res) => {
    try {
      console.log("Solicitud recibida...");
      const resultado = await db.query('SELECT * FROM ESTADO_VEHICULO');
      console.log("Resultado:", resultado.rows);
      res.json({ success: true, resultado:resultado.rows });

    } catch (err) {
      console.error("Error en la consulta:", err);
      res.status(500).json({success: false,  error: err.message });
    }
  });
router.post("/", async (req, res) => {
    try {
        const { estado } = req.body;

        const query = "SELECT * FROM insertar_estado_vehiculo($1)";
        const result = await db.query(query, [estado]);

        res.json({ success: true, resultado: result.rows[0] });
    } catch (error) {
        console.error("Error al registrar estado del vehículo:", error);
        res.json({ success: false, error: error.message });
    }
});

module.exports = router;