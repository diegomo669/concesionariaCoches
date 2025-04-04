const { Client } = require('pg');

const client = new Client({
  user: 'db_concesionari_autos_12000_user',
  host: 'dpg-cvnaf89r0fns738ksp5g-a.oregon-postgres.render.com', // ¡Hostname completo!
  database: 'db_concesionari_autos_12000', // Verifica si es "autos" o "autos"
  password: 'CpVaSeMfZ8FUp4Egma5BzZAljRSkPrRI',
  port: 5432,
  ssl: {
    rejectUnauthorized: false // Obligatorio para Render.com
  }
});

client.connect()
  .then(() => {
    console.log('Conexión exitosa a PostgreSQL');
    return client.end();
  })
  .catch((err) => {
    console.error('Error al conectar:', err.message);
  });