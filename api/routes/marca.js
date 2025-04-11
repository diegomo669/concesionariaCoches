const express = require('express');
const router = express.Router();
const db = require('../db');

router.get('/', async (req, res) => {
    try {
      console.log("Solicitud recibida...");
      const resultado = await db.query('SELECT * FROM MARCA');
      console.log("Resultado:", resultado.rows);
      res.json({ success: true, resultado:resultado.rows });

    } catch (err) {
      console.error("Error en la consulta:", err);
      res.status(500).json({success: false,  error: err.message });
    }
  });
router.post("/", async (req, res) => {
    try {
        const { marca } = req.body;
        console.log(marca);
        const query = "SELECT * FROM insertar_marca($1)";
        const result = await db.query(query, [marca]);
        console.log(result);
        res.json({ success: true, resultado: result.rows[0] });
    } catch (error) {
        console.error("Error al registrar marca del vehículo:", error);
        res.json({ success: false, error: error.message });
    }
});

module.exports = router;