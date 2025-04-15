const express = require('express');
const router = express.Router();
const db = require('../db');

// Obtener todos los clientes
router.get('/', async (req, res) => {
    try {
        console.log("Solicitud recibida...");
        const resultado = await db.query(`
            SELECT 
                id,
                nombre,
                documento_tipo,
                documento_numero,
                telefono,
                direccion,
                fecha_registro
            FROM clientes
            ORDER BY id
        `);

        console.log("Resultado:", resultado.rows);
        res.json({ success: true, resultado: resultado.rows });
    } catch (err) {
        console.error("Error en la consulta:", err);
        res.status(500).json({ success: false, error: err.message });
    }
});

// Obtener un cliente por ID
router.get('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const query = `
            SELECT 
                id,
                nombre,
                documento_tipo,
                documento_numero,
                telefono,
                direccion,
                fecha_registro
            FROM clientes
            WHERE id = $1
        `;
        const result = await db.query(query, [id]);

        if (result.rowCount === 0) {
            return res.status(404).json({ success: false, error: "Cliente no encontrado." });
        }

        res.json({ success: true, resultado: result.rows[0] });
    } catch (error) {
        console.error("Error al obtener cliente:", error);
        res.status(500).json({ success: false, error: error.message });
    }
});

// Crear un nuevo cliente
router.post("/", async (req, res) => {
    try {
        const {
            nombre,
            documento_tipo,
            documento_numero,
            telefono,
            direccion
        } = req.body;

        // Validación rápida
        if (
            !nombre || !documento_tipo || !documento_numero || !telefono || !direccion
        ) {
            return res.status(400).json({
                success: false,
                error: "Todos los campos son obligatorios.",
            });
        }

        const query = `
            INSERT INTO clientes (nombre, documento_tipo, documento_numero, telefono,  direccion)
            VALUES ($1, $2, $3, $4, $5)
            RETURNING *;
        `;
        const params = [nombre, documento_tipo, documento_numero, telefono, direccion];

        const result = await db.query(query, params);

        res.json({ success: true, cliente: result.rows[0] });
    } catch (error) {
        console.error("Error al insertar cliente:", error);
        res.json({ success: false, error: error.message });
    }
});

// Actualizar un cliente existente
router.put("/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const {
            nombre,
            documento_tipo,
            documento_numero,
            telefono,
            direccion
        } = req.body;

        if (
            !nombre || !documento_tipo || !documento_numero || !telefono ||
            !direccion
        ) {
            return res.status(400).json({
                success: false,
                error: "Todos los campos son obligatorios.",
            });
        }

        const query = `
            UPDATE clientes
            SET 
                nombre = $1,
                documento_tipo = $2,
                documento_numero = $3,
                telefono = $4,
                direccion = $5
            WHERE id = $6
            RETURNING *;
        `;

        const values = [nombre, documento_tipo, documento_numero, telefono, direccion, id];

        const result = await db.query(query, values);

        if (result.rowCount === 0) {
            return res.status(404).json({ success: false, error: "Cliente no encontrado." });
        }

        res.json({ success: true, cliente: result.rows[0] });
    } catch (error) {
        console.error("Error al editar cliente:", error);
        res.status(500).json({ success: false, error: error.message });
    }
});

// Eliminar un cliente
router.delete("/:id", async (req, res) => {
    try {
        const id = req.params.id;

        const result = await db.query("DELETE FROM clientes WHERE id = $1 RETURNING *", [id]);

        if (result.rowCount === 0) {
            return res.status(404).json({ success: false, error: "Cliente no encontrado." });
        }

        res.json({ success: true, mensaje: "Cliente eliminado correctamente", cliente: result.rows[0] });
    } catch (error) {
        console.error("Error al eliminar cliente:", error);
        res.status(500).json({ success: false, error: error.message });
    }
});

module.exports = router;
