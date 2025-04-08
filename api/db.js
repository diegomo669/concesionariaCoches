const {Pool} = require('pg');
const pool = new Pool({
    user: "db_concesionari_autos_12000_user",
    host: "dpg-cvnaf89r0fns738ksp5g-a.oregon-postgres.render.com",
    database: "db_concesionari_autos_12000",
    password: "CpVaSeMfZ8FUp4Egma5BzZAljRSkPrRI",
    port: 5432,
    ssl: { rejectUnauthorized: false } // Necesario para Render
    
});

module.exports = pool;