const express = require('express');
const mysql = require('mysql');
const app = express();

//Conexion a la base de datos
var con = mysql.createConnection({
    host     : '127.0.0.1',
    user     : 'evoion',
    password : 'Acceso2021*',
    database : 'evoion',
    port: '3306'
  });

//Conectandose a la base de datos
con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
  });

//Para aceptar textos tipo JSON
app.use(express.json());

//CREATE personas
app.post('/user/create', (req,res)=>{
    console.log(req.body);
    res.send(req.body);
})

// READ personas
app.get('/user/read', (req,res)=>{
    res.send('All users data');
})

// SiNGLE READ
app.get('/user/single_read/:id', (req,res)=>{
    res.send(`User ${req.params.id} data`)
})

//UPDATE personas
app.put('/user/update/:id', (req,res)=>{
    res.send(`User ${req.params.id} updated`)
})

//DELETE personas
app.put('/user/delete/:id', (req,res)=>{
    res.send(`User ${nombrec} deleted`)
})

app.listen(3000, () => {
    console.log('Server running at 3000');
})