const express = require('express');
const router = express.Router();
const db = require('../db');

   
    router.get('/:tipo', async (req, res) => {
        try {
            const tipo = req.params.tipo;
            const query = `
                select * from coche c inner join tipo_vehiculo tv on c.id_tipo_vehiculo = tv.id_tipo_vehiculo where tv.tipo = $1;
            `;
            const result = await db.query(query, [tipo]);
    
            if (result.rowCount === 0) {
                return res.status(404).json({ success: false, error: "Coche no encontrado." });
            }
    
            res.json({ success: true, resultado: result.rows });
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