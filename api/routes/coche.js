const express = require('express');
const router = express.Router();
const db = require('../db');

    router.get('/', async (req, res) => {
        try {
        console.log("Solicitud recibida...");
        const resultado = await db.query(`
            SELECT 
            c.ID_COCHE,
            mo.MODELO_COCHE AS modelo,
            ma.MARCA_COCHE AS marca,
            tv.TIPO AS tipo_vehiculo,
            tc.COMBUSTIBLE AS tipo_combustible,
            ev.ESTADO AS estado_vehiculo,
            c.COLOR,
            c.KILOMETRAJE,
            c.NUMPUERTAS AS num_puertas,
            c.NUMASIENTOS AS num_asientos
            FROM 
            COCHE c
            JOIN MODELO mo ON c.ID_MODELO = mo.ID_MODELO
            JOIN MARCA ma ON c.ID_MARCA = ma.ID_MARCA
            JOIN TIPO_VEHICULO tv ON c.ID_TIPO_VEHICULO = tv.ID_TIPO_VEHICULO
            JOIN TIPO_COMBUSTIBLE tc ON c.ID_TIPO_COMBUSTIBLE = tc.ID_TIPO_COMBUSTIBLE
            JOIN ESTADO_VEHICULO ev ON c.ID_ESTADO_VEHICULO = ev.ID_ESTADO_VEHICULO
            ORDER BY c.ID_COCHE
        `);
        
        console.log("Resultado:", resultado.rows);
        res.json({ success: true, resultado: resultado.rows });

        } catch (err) {
        console.error("Error en la consulta:", err);
        res.status(500).json({ success: false, error: err.message });
        }
    });
    router.get('/:id', async (req, res) => {
        try {
            const id = req.params.id;
            const query = `
                SELECT 
                    c.ID_COCHE,
                    c.ID_MODELO,
                    c.ID_MARCA,
                    c.ID_TIPO_VEHICULO,
                    c.ID_TIPO_COMBUSTIBLE,
                    C.ID_ESTADO_VEHICULO,
                    mo.MODELO_COCHE AS modelo,
                    ma.MARCA_COCHE AS marca,
                    tv.TIPO AS tipo_vehiculo,
                    tc.COMBUSTIBLE AS tipo_combustible,
                    ev.ESTADO AS estado_vehiculo,
                    c.COLOR,
                    c.KILOMETRAJE,
                    c.NUMPUERTAS AS num_puertas,
                    c.NUMASIENTOS AS num_asientos
                FROM 
                    COCHE c
                JOIN MODELO mo ON c.ID_MODELO = mo.ID_MODELO
                JOIN MARCA ma ON c.ID_MARCA = ma.ID_MARCA
                JOIN TIPO_VEHICULO tv ON c.ID_TIPO_VEHICULO = tv.ID_TIPO_VEHICULO
                JOIN TIPO_COMBUSTIBLE tc ON c.ID_TIPO_COMBUSTIBLE = tc.ID_TIPO_COMBUSTIBLE
                JOIN ESTADO_VEHICULO ev ON c.ID_ESTADO_VEHICULO = ev.ID_ESTADO_VEHICULO
                WHERE c.ID_COCHE = $1
            `;
            const result = await db.query(query, [id]);
    
            if (result.rowCount === 0) {
                return res.status(404).json({ success: false, error: "Coche no encontrado." });
            }
    
            res.json({ success: true, resultado: result.rows[0] });
        } catch (error) {
            console.error("Error al obtener coche:", error);
            res.status(500).json({ success: false, error: error.message });
        }
    });
    
    router.post("/", async (req, res) => {
        try {
            const {
                id_modelo,
                id_marca,
                id_tipo_vehiculo,
                id_tipo_combustible,
                id_estado_vehiculo,
                color,
                kilometraje,
                num_puertas,
                num_asientos
            } = req.body;

            // Validación rápida
            if (
                !id_modelo || !id_marca || !id_tipo_vehiculo || !id_tipo_combustible ||
                !id_estado_vehiculo || !color || kilometraje == null ||
                num_puertas == null || num_asientos == null
            ) {
                return res.status(400).json({
                    success: false,
                    error: "Todos los campos son obligatorios.",
                });
            }

            const query = "SELECT * FROM insertar_coche($1,$2,$3,$4,$5,$6,$7,$8,$9)";
            const params = [
                id_modelo,
                id_marca,
                id_tipo_vehiculo,
                id_tipo_combustible,
                id_estado_vehiculo,
                color,
                kilometraje,
                num_puertas,
                num_asientos
            ];

            const result = await db.query(query, params);

            res.json({ success: true, coche: result.rows[0] });
        } catch (error) {
            console.error("Error al insertar coche:", error);
            res.json({ success: false, error: error.message });
        }
    });
    
    router.put("/:id", async (req, res) => {
        try {
            const id = req.params.id;
            const {
                id_modelo,
                id_marca,
                id_tipo_vehiculo,
                id_tipo_combustible,
                id_estado_vehiculo,
                color,
                kilometraje,
                num_puertas,
                num_asientos
            } = req.body;
    
            if (
                !id_modelo || !id_marca || !id_tipo_vehiculo || !id_tipo_combustible ||
                !id_estado_vehiculo || !color || kilometraje == null ||
                num_puertas == null || num_asientos == null
            ) {
                return res.status(400).json({
                    success: false,
                    error: "Todos los campos son obligatorios.",
                });
            }
    
            const query = `
                UPDATE COCHE SET
                    ID_MODELO = $1,
                    ID_MARCA = $2,
                    ID_TIPO_VEHICULO = $3,
                    ID_TIPO_COMBUSTIBLE = $4,
                    ID_ESTADO_VEHICULO = $5,
                    COLOR = $6,
                    KILOMETRAJE = $7,
                    NUMPUERTAS = $8,
                    NUMASIENTOS = $9
                WHERE ID_COCHE = $10
                RETURNING *;
            `;
    
            const values = [
                id_modelo,
                id_marca,
                id_tipo_vehiculo,
                id_tipo_combustible,
                id_estado_vehiculo,
                color,
                kilometraje,
                num_puertas,
                num_asientos,
                id
            ];
    
            const result = await db.query(query, values);
    
            if (result.rowCount === 0) {
                return res.status(404).json({ success: false, error: "Coche no encontrado." });
            }
    
            res.json({ success: true, coche: result.rows[0] });
        } catch (error) {
            console.error("Error al editar coche:", error);
            res.status(500).json({ success: false, error: error.message });
        }
    });
    router.delete("/:id", async (req, res) => {
        try {
            const id = req.params.id;
    
            // Primero eliminamos los precios asociados al coche
            await db.query("DELETE FROM PRECIO WHERE ID_COCHE = $1", [id]);
    
            // Luego eliminamos el coche
            const result = await db.query("DELETE FROM COCHE WHERE ID_COCHE = $1 RETURNING *", [id]);
    
            if (result.rowCount === 0) {
                return res.status(404).json({ success: false, error: "Coche no encontrado." });
            }
    
            res.json({ success: true, mensaje: "Coche eliminado correctamente", coche: result.rows[0] });
        } catch (error) {
            console.error("Error al eliminar coche:", error);
            res.status(500).json({ success: false, error: error.message });
        }
    });
    
    

module.exports = router;