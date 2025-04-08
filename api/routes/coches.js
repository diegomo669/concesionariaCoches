const express = require('express');
const router = express.Router();
const db = require('../db');

router.get('/', async (req, res) => {
    try {
      console.log("Solicitud recibida...");
      const resultado = await db.query('SELECT * FROM coches');
      console.log("Resultado:", resultado.rows);
      res.json(resultado.rows);
    } catch (err) {
      console.error("Error en la consulta:", err);
      res.status(500).json({ error: err.message });
    }
  });
router.post("/", async (req, res) => {
    try {
        const { modelo, posicion, valor } = req.body;
        const query = "INSERT INTO coches (modelo, posicion, valor) VALUES ($1, $2, $3) RETURNING *";
        const result = await db.query(query, [modelo, posicion, valor]);

        res.json({ success: true, coche: result.rows[0] });
    } catch (error) {
        console.error("Error al agregar coche:", error);
        res.json({ success: false, error: error.message });
    }
});
module.exports = router;