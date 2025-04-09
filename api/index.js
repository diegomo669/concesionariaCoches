const express = require('express')
const app = express()
const port = 3000
const cors = require('cors');
app.use(cors());

app.use(express.json());
const cochesRouter = require('./routes/coches');
app.use('/coches',cochesRouter);
app.get('/', (req, res) => res.send('Hello World!'))
const path = require('path');

// Servir archivos estáticos desde la carpeta 'public'
app.use(express.static(path.join(__dirname, 'public')));
app.listen(port, () => console.log(`Example app listening on port ${port}!`))