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

//______________________________________________________________________________________CREUD personas
app.post('/user/create', (req,res)=>{
    
    if(!req.body.identificacion || !req.body.nombre) 
    {
        mensaje= {
            estado:"errror",
            mensaje:'El campo nombre y apellido son requeridos'
        }
        res.send(mensaje);    
    } 
    else 
    {
        let id=req.body.identificacion;
        let nombre=req.body.nombre;
        let sqlinsert=`INSERT INTO personas(Identificacion, nombre) VALUES (${id},'${nombre}') `
        con.query(sqlinsert, function (err, result, fields) 
        {
            if (err) 
            {
                mensaje= {
                    estado:"errror",
                    mensaje: err.sqlMessage
                }
                 res.send(mensaje)      
            }
            else
            {
                mensaje= {
                    estado:"success",
                    mensaje: `Usuario ${id} creado`
                }
                res.send(mensaje)
            }
        });
    }
});

// READ personas
app.get('/user/read', (req,res)=>{
    let sqlread="SELECT Identificacion,Nombre FROM personas";
    con.query(sqlread, function (err, result, fields) 
    { 
        if (err) 
        {
            mensaje= {
                estado:"error",
                mensaje: err.sqlMessage
            }
             res.send(mensaje)      
        }
        else
        {
            mensaje= {
                estado:"success",
                contadorusuarios:result.length,
                usuarios: result
            }
            res.send(mensaje)
        }
    });
})

// SiNGLE READ
app.get('/user/single_read/:id', (req,res)=>{
    let id=req.params.id
    let sqlsingle=`SELECT Identificacion,Nombre FROM personas WHERE Identificacion=${id}`
    con.query(sqlsingle, function (err, result, fields) 
    { 
        if (err) 
        {
            mensaje= {
                estado:"error",
                mensaje: err.sqlMessage
            }
             res.send(mensaje)      
        }
        else
        {
            mensaje= {
                estado:"success",
                contadorusuarios:result.length,
                usuarios: result
            }
            res.send(mensaje)
        }
    });

    //res.send(`User ${req.params.id} data`)
})

//UPDATE personas
app.put('/user/update/:id', (req,res)=>{
   
    if(!req.body.nombre) 
    {
        mensaje= {
            estado:"errror",
            mensaje:'El campo nombre es requerids'
        }
        res.send(mensaje);    
    }
    else
    {
        let id=req.params.id
        let nombre=req.body.nombre;
        let sqlupdate=`UPDATE personas SET nombre='${nombre}' WHERE Identificacion=${id}`
        con.query(sqlupdate, function (err, result, fields) 
        { 
            if (err) 
            {
                mensaje= {
                    estado:"error",
                    mensaje: err.sqlMessage
                }
                 res.send(mensaje)      
            }
            else
            {
                if(result.affectedRows==0)
                {
                    mensaje= {
                        estado:"error",
                        resultado:'No se encontro usuarios'
                    }
                    res.send(mensaje)
                }
                else
                {
                    mensaje= {
                        estado:"success",
                        contadorusuarios:`Usuario ${id} actualizado`
                    }
                    res.send(mensaje)
                }
            }
        });
    } 
})

//DELETE personas
app.delete('/user/delete/:id', (req,res)=>{

    let id=req.params.id
    let sqlsingle=`DELETE FROM personas WHERE Identificacion=${id}`
    con.query(sqlsingle, function (err, result, fields) 
    { 
        if (err) 
        {
            mensaje= {
                estado:"error",
                mensaje: err.sqlMessage
            }
             res.send(mensaje)      
        }
        else
        {
            if(result.affectedRows==0)
                {
                    mensaje= {
                        estado:"error",
                        resultado:'No se encontro usuarios'
                    }
                    res.send(mensaje)
                }
                else
                {
                    mensaje= {
                        estado:"success",
                        contadorusuarios:`Usuario ${id} eliminado`
                    }
                    res.send(mensaje)
                }
        }
    }); 
  
})

//_________________________________________________________________________________________CRUD CAATEGORIA______________________________-






app.post('/categoria/create', (req,res)=>{
    
    if(!req.body.nombre) 
    {
        mensaje= {
            estado:"errror",
            mensaje:'El campo nombre es requerido'
        }
        res.send(mensaje);    
    } 
    else 
    {
        let nombre=req.body.nombre;
        let sqlinsert=`INSERT INTO cetegoria(nombre) VALUES ('${nombre}') `
        con.query(sqlinsert, function (err, result, fields) 
        {
            if (err) 
            {
                mensaje= {
                    estado:"errror",
                    mensaje: err.sqlMessage
                }
                 res.send(mensaje)      
            }
            else
            {
                mensaje= {
                    estado:"success",
                    mensaje: `Categoria ${nombre} creado`
                }
                res.send(mensaje)
            }
        });
    }
});

// READ personas
app.get('/categoria/read', (req,res)=>{
    let sqlread="SELECT Nombre FROM categoria";
    con.query(sqlread, function (err, result, fields) 
    { 
        if (err) 
        {
            mensaje= {
                estado:"error",
                mensaje: err.sqlMessage
            }
             res.send(mensaje)      
        }
        else
        {
            mensaje= {
                estado:"success",
                contador:result.length,
                usuarios: result
            }
            res.send(mensaje)
        }
    });
})

// SiNGLE READ
app.get('/categoria/single_read/:id', (req,res)=>{
    let id=req.params.id
    let sqlsingle=`SELECT Nombre FROM categoria WHERE id_categoria=${id}`
    con.query(sqlsingle, function (err, result, fields) 
    { 
        if (err) 
        {
            mensaje= {
                estado:"error",
                mensaje: err.sqlMessage
            }
             res.send(mensaje)      
        }
        else
        {
            mensaje= {
                estado:"success",
                contador:result.length,
                usuarios: result
            }
            res.send(mensaje)
        }
    });

    //res.send(`categoria ${req.params.id} data`)
})

//UPDATE personas
app.put('/categoria/update/:id', (req,res)=>{
   
    if(!req.body.nombre) 
    {
        mensaje= {
            estado:"errror",
            mensaje:'El campo nombre es requerids'
        }
        res.send(mensaje);    
    }
    else
    {
        let id=req.params.id
        let nombre=req.body.nombre;
        let sqlupdate=`UPDATE categoria SET nombre='${nombre}' WHERE id_categoria=${id}`
        con.query(sqlupdate, function (err, result, fields) 
        { 
            if (err) 
            {
                mensaje= {
                    estado:"error",
                    mensaje: err.sqlMessage
                }
                 res.send(mensaje)      
            }
            else
            {
                if(result.affectedRows==0)
                {
                    mensaje= {
                        estado:"error",
                        resultado:'No se encontro categorias'
                    }
                    res.send(mensaje)
                }
                else
                {
                    mensaje= {
                        estado:"success",
                        contador:`Categoria ${id} actualizado`
                    }
                    res.send(mensaje)
                }
            }
        });
    } 
})

//DELETE personas
app.delete('/categoria/delete/:id', (req,res)=>{

    let id=req.params.id
    let sqlsingle=`DELETE FROM categoria WHERE id_categoria=${id}`
    con.query(sqlsingle, function (err, result, fields) 
    { 
        if (err) 
        {
            mensaje= {
                estado:"error",
                mensaje: err.sqlMessage
            }
             res.send(mensaje)      
        }
        else
        {
            if(result.affectedRows==0)
                {
                    mensaje= {
                        estado:"error",
                        resultado:'No se encontro categoria'
                    }
                    res.send(mensaje)
                }
                else
                {
                    mensaje= {
                        estado:"success",
                        contador:`Categoria ${id} eliminado`
                    }
                    res.send(mensaje)
                }
        }
    }); 
  
})

app.listen(3000, () => {
    console.log('Server running at 3000');
})