const express = require('express');
const router = express.Router();
const db = require('../db'); // Ajusta según cómo estés conectando a tu DB

// Ruta POST para registrar visita
router.post('/', async (req, res) => {
    const { nombre, email, fecha, motivo } = req.body;

    try {
        const result = await db.query(
            'INSERT INTO visitas (nombre, email, fecha, motivo) VALUES ($1, $2, $3, $4) RETURNING *',
            [nombre, email, fecha, motivo]
        );
        res.json({ success: true, visita: result.rows[0] });
    } catch (err) {
        console.error('Error al registrar visita:', err);
        res.status(500).json({ success: false, error: err.message });
    }
});

module.exports = router;