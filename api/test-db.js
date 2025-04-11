// test-db.js
const { Pool } = require('pg');

const pool = new Pool({
    user: "db_concesionari_autos_12000_user",
    host: "dpg-cvnaf89r0fns738ksp5g-a.oregon-postgres.render.com",
    database: "db_concesionari_autos_12000",
    password: "CpVaSeMfZ8FUp4Egma5BzZAljRSkPrRI",
    port: 5432,
    ssl: { rejectUnauthorized: false } // Necesario para Render
});

(async () => {
  try {
    const res = await pool.query('SELECT NOW()');
    console.log('Conectado a PostgreSQL:', res.rows[0]);
  } catch (err) {
    console.error('Error al conectar:', err);
  } finally {
    pool.end();
  }
})();
