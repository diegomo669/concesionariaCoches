const express = require('express')
const app = express()
const port = 3000
const cors = require('cors');
app.use(cors());

app.use(express.json());
const cochesRouter = require('./routes/coches');
const usuariosRouter = require('./routes/Usuarios')
const estadoCocheRouter = require('./routes/estado_vehiculo')
const marcaCocheRouter = require('./routes/marca')
const tipoConbustibleCocheRouter = require('./routes/tipo_conbustible')
const modeloCocheRouter = require('./routes/modelo')
const tipoCocheRouter = require('./routes/tipo_vehiculo')
const RegistroCocheRouter = require('./routes/coche')
const precioCocheRouter = require('./routes/precio')
const reservasRouter = require('./routes/reservas')
const busquedaRouter = require('./routes/busqueda');
app.use('/reservas', reservasRouter);
app.use('/coches',cochesRouter);
app.use('/estadocoche',estadoCocheRouter);
app.use('/marca',marcaCocheRouter);
app.use('/tipocombustible',tipoConbustibleCocheRouter);
app.use('/modelo',modeloCocheRouter);
app.use('/tipo',tipoCocheRouter);
app.use('/coche',RegistroCocheRouter);
app.use('/precio',precioCocheRouter);
app.use('/buscar',busquedaRouter)
app.use('/usuarios', usuariosRouter);
app.get('/', (req, res) => res.send('Hello World!'))
const path = require('path');

// Servir archivos estáticos desde la carpeta 'public'
app.use(express.static(path.join(__dirname, 'public')));
app.listen(port, () => console.log(`Example app listening on port ${port}!`))

app.listen(3000, () => {
    console.log('🚀 Servidor corriendo en http://localhost:3000');
  });
