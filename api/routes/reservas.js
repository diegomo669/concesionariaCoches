const express = require('express');
const router = express.Router();
const db = require('../db');

// Obtenemos todas las reservas
router.get('/', async (req, res) => {
    try {
        const result = await db.query(`
            SELECT 
                r.id_reserva,
                r.nombre_cliente,
                r.apellido_paterno,
                r.apellido_materno,
                r.nro_documento,
                r.telefono,
                r.gmail,
                r.monto_deposito,
                r.fecha_reserva,
                c.modelo AS modelo_coche,
                c.color AS color_coche
            FROM reservas r
            JOIN coche c ON r.id_coche = c.id_coche
            ORDER BY r.fecha_reserva DESC
        `);
        res.json({ success: true, reservas: result.rows });
    } catch (error) {
        console.error('Error al obtener reservas:', error);
        res.status(500).json({ success: false, error: error.message });
    }
});

// Crear una nueva reserva
router.post('/', async (req, res) => {
    try {
        const {
            nombre_cliente,
            apellido_paterno,
            apellido_materno,
            nro_documento,
            telefono,
            gmail,
            monto_deposito,
            id_coche
        } = req.body;

        // Una Validación rápida
        if (!nombre_cliente || !nro_documento || !gmail || !monto_deposito || !id_coche) {
            return res.status(400).json({
                success: false,
                error: 'Faltan campos obligatorios.',
            });
        }

        const query = `
            INSERT INTO reservas (
                nombre_cliente, apellido_paterno, apellido_materno,
                nro_documento, telefono, gmail, monto_deposito, id_coche
            ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *`;
        const params = [
            nombre_cliente,
            apellido_paterno,
            apellido_materno,
            nro_documento,
            telefono,
            gmail,
            monto_deposito,
            id_coche
        ];

        const result = await db.query(query, params);
        res.json({ success: true, reserva: result.rows[0] });
    } catch (error) {
        console.error('Error al crear reserva:', error);
        res.status(500).json({ success: false, error: error.message });
    }
});

module.exports = router;