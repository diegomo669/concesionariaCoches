const express = require('express');
const router = express.Router();
const pool = require('../db'); // Asegúrate de tener la conexión a la base de datos

// Ruta para obtener las imágenes de los coches
router.get('/', async (req, res) => {
    try {
        const result = await pool.query("SELECT id_img, id_coche, links FROM cocheimg");
        res.json(result.rows);
    } catch (error) {
        console.error("Error al obtener imágenes:", error);
        res.status(500).json({ error: "Error al obtener imágenes" });
    }
});

module.exports = router;
