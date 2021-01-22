var express = require('express');
var router = express.Router();
const mysql = require('mysql');
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

router.post('/create', (req,res)=>{
    
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
router.get('/read', (req,res)=>{
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
router.get('/single_read/:id', (req,res)=>{
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
router.put('/update/:id', (req,res)=>{
   
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
router.delete('/delete/:id', (req,res)=>{

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
module.exports = router