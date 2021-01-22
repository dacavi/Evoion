
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
router.get('/read', (req,res)=>{
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
router.get('/single_read/:id', (req,res)=>{
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

//DELETE 
router.delete('/delete/:id', (req,res)=>{

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

module.exports = router