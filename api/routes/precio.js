const express = require('express');
const router = express.Router();
const db = require('../db');

router.get('/', async (req, res) => {
    try {
      console.log("Solicitud recibida...");
      const resultado = await db.query('SELECT * FROM PRECIO');
      console.log("Resultado:", resultado.rows);
      res.json({ success: true, resultado:resultado.rows });

    } catch (err) {
      console.error("Error en la consulta:", err);
      res.status(500).json({success: false,  error: err.message });
    }
  });
  router.post("/", async (req, res) => {
    try {
        const {
            id_coche,
            fecha_apertura,
            precio,
            fecha_cierre
        } = req.body;

        // Validación rápida
        if (
            !id_coche || !fecha_apertura || precio == null || !fecha_cierre
        ) {
            return res.status(400).json({
                success: false,
                error: "Todos los campos son obligatorios.",
            });
        }

        const query = "SELECT * FROM insertar_precio($1, $2, $3, $4)";
        const params = [id_coche, fecha_apertura, precio, fecha_cierre];

        const result = await db.query(query, params);

        res.json({ success: true, precio: result.rows[0] });
    } catch (error) {
        console.error("Error al insertar precio:", error);
        res.json({ success: false, error: error.message });
    }
});


module.exports = router;