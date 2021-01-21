const express = require('express');
const app = express();

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