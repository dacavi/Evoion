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
    
    if(!req.body.nombre  || !req.body.cantidad || !req.body.idcategoria)
    {
        mensaje= {
            estado:"errror",
            mensaje:'El campo nombre,cantidad y idcategoria es requerido'
        }
        res.send(mensaje);    
    } 
    else 
    {
        let nombre=req.body.nombre;
        let cantidad=req.body.cantidad;
        let idcategoria=req.body.idcategoria;
        let sqlinsert=`INSERT INTO productos(nombre,cantidad,id_categoria) VALUES ('${nombre}',${cantidad},${idcategoria}) `
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
                    mensaje: `producto ${nombre} creado`
                }
                res.send(mensaje)
            }
        });
    }
});

// READ personas
router.get('/read', (req,res)=>{
    let sqlread="SELECT id_productos,nombre,cantidad,id_categoria FROM productos";
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
router.get('/single_read/:id', (req,res)=>{
    let id=req.params.id
    let sqlsingle=`SELECT id_productos,nombre,cantidad,id_categoria  FROM productos WHERE id_productos=${id}`
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
                productos: result
            }
            res.send(mensaje)
        }
    });

    //res.send(`productos ${req.params.id} data`)
})

//UPDATE
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
        let sqlupdate=`UPDATE productos SET nombre='${nombre}' WHERE id_productos=${id}`
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
                        resultado:'No se encontro productoss'
                    }
                    res.send(mensaje)
                }
                else
                {
                    mensaje= {
                        estado:"success",
                        contador:`productos ${id} actualizado`
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
    let sqlsingle=`DELETE FROM productos WHERE id_productos=${id}`
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
                        resultado:'No se encontro productos'
                    }
                    res.send(mensaje)
                }
                else
                {
                    mensaje= {
                        estado:"success",
                        contador:`productos ${id} eliminado`
                    }
                    res.send(mensaje)
                }
        }
    }); 
})
module.exports = router