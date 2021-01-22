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

    if(!req.body.idproducto  || !req.body.idpersona || !req.body.cantidad)
    {
        mensaje= {
            estado:"errror",
            mensaje:'El campo idproducto,idpersona y cantidad es requerido'
        }
        res.send(mensaje);    
    } 
    else 
    {
        var cantidadproducto
        let idproducto=req.body.idproducto
        let idpersona=req.body.idpersona
        let cantidad=req.body.cantidad
        let cantidadsql=`SELECT cantidad FROM productos WHERE id_productos=${idproducto}`
        con.query(cantidadsql, function (err, result, fields) 
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
                if(result.length==0)
                {
                    mensaje= {
                        estado:"error",
                        mensaje:"El producto no fue encontrado"
                    }
                    res.send(mensaje)
                }
                else
                {
                    console.log(result[0].cantidad)
                    cantidadproducto=result[0].cantidad
                    let restante
                    restante=cantidadproducto - cantidad
                    console.log(cantidadproducto)
                    if(restante<=0)
                    {
                        mensaje= {
                            estado:"error",
                            mensaje:"El producto no tiene existencias"
                        }
                        res.send(mensaje)
                    }
                    else
                    {
                        let updatesql=`UPDATE productos SET cantidad=${restante} WHERE id_productos=${idproducto}`
                        con.query(updatesql, function (err, result, fields) 
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
                            }
                        });
                        ////__________________________________-


                        let nombresql=`SELECT nombre FROM personas WHERE identificacion=${idpersona}`
                        con.query(nombresql, function (err, result, fields) 
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
                                if(result.length==0)
                                {
                                    mensaje= {
                                        estado:"error",
                                        mensaje:"La persona no fue encontrada"
                                    }
                                    res.send(mensaje)
                                }
                            }
                        });
                        let insertfactura=`INSERT INTO facturas(id_personas,id_productos) VALUES (${idpersona},${idproducto})`
                        con.query(insertfactura, function (err, result, fields) 
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
                                        mensaje:"La factura fue generada"
                                    }
                                    res.send(mensaje)
                                
                            }
                        });

                    }
                }
            }
        });
        
    }

  })
module.exports = router