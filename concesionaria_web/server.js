const express = require("express");
const cors = require("cors");
const { Pool } = require("pg");

const app = express();
const PORT = 3000;

// Configuración de CORS
app.use(cors());
app.use(express.json());

// Conexión con PostgreSQL en Render
const pool = new Pool({
    user: "db_concesionari_autos_12000_user",
    host: "dpg-cvnaf89r0fns738ksp5g-a.oregon-postgres.render.com",
    database: "db_concesionari_autos_12000",
    password: "CpVaSeMfZ8FUp4Egma5BzZAljRSkPrRI",
    port: 5432,
    ssl: { rejectUnauthorized: false } // Necesario para Render
});

// Ruta para agregar un coche
app.post("/agregar-coche", async (req, res) => {
    try {
        const { modelo, posicion, valor } = req.body;
        const query = "INSERT INTO coches (modelo, posicion, valor) VALUES ($1, $2, $3) RETURNING *";
        const result = await pool.query(query, [modelo, posicion, valor]);

        res.json({ success: true, coche: result.rows[0] });
    } catch (error) {
        console.error("Error al agregar coche:", error);
        res.json({ success: false, error: error.message });
    }
});

// Ruta para obtener la lista de coches ordenados por capacidad
app.get("/listar-coches", async (req, res) => {
    try {
        const query = "SELECT * FROM coches ORDER BY posicion ASC";
        const result = await pool.query(query);

        res.json({ success: true, coches: result.rows });
    } catch (error) {
        console.error("Error al obtener la lista de coches:", error);
        res.json({ success: false, error: error.message });
    }
});

// Iniciar el servidor

const path = require('path');

// Servir archivos estáticos desde la carpeta 'public'
app.use(express.static(path.join(__dirname, 'public')));

app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});
