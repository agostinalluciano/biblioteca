import express from 'express'
import bodyParser from 'body-parser';
import cors from 'cors'
import jsonwebtoken from 'jsonwebtoken';

const app = express() ;
app.use(cors());
app.use(bodyParser.json());

app.post('/api/login', (req,res) => {
    if(req.body && req.body.email == "usuario@sistema.com" && req.body.password == "123456") {
        const token = jsonwebtoken.sign(
            {usuario:"usuario@sistema.com",rol:'ADM'},'frase secreta')
        // faltaria agregar palabra Bearer (parte del protocolo)    
        res.json(token);
    } else {
        res.sendStatus(401);
    }
})

app.post('/api/register', (req,res) => {
    //if(req.body && req.body.email == "usuario@sistema.com" && req.body.password == "123456") {
    //    const token = jsonwebtoken.sign(
    //       {usuario:"usuario@sistema.com",rol:'ADM'},'frase secreta')
        // faltaria agregar palabra Bearer (parte del protocolo)    
    //    res.json(token);
    //} else {
    //    res.sendStatus(401);
    res.sendStatus("A resolver");
    //}
})

const productos = [{id:'100',nombre:'Tele'},{id:'101',nombre:'Silla'}];
app.get('/api/productos',(req,res) => {
    const token = req.headers['authorization'];
    jsonwebtoken.verify(token,'frase secreta',(err,payload) => {
        if(err) {
            res.sendStatus(401);
        } else {
            res.json(productos)
        }
    })
})

app.post('/api/productos',(req,res) => {
    const token = req.headers['authorization'];
    jsonwebtoken.verify(token,'frase secreta',(err,payload) => {
        if(err) {
            res.sendStatus(401);
        } else {
            console.log(req.body);
            productos.push(req.body);
            res.send('Alta ok');
        }
    })
})

// falta el delete de producto

app.get('/api/ping', (req,res) => {
    res.send('pong');
})

app.listen(3001, () => {
    console.log('Escuchando en puerto 3001');
})