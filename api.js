const express = require('express');

const app = express();
var personas = require('./personas.js');
var productos = require('./productos.js');
var categoria = require('./categoria.js');
var factura = require('./factura.js');

//Para aceptar textos tipo JSON
app.use(express.json());

//______________________________________________________________________________________CREUD personas___________________________________
app.use('/user', personas);

//_________________________________________________________________________________________CRUD CAATEGORIA______________________________-
app.use('/categoria', categoria);

//_________________________________________________________________CRUD PRODUCTOS______________________________________________________
app.use('/productos', productos);

//________________________________________________________________FACTURAS_____________________________________________________________
app.use('/factura', factura);

app.listen(3000, () => {
    console.log('Server running at 3000');
})