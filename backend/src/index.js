import express from 'express'
import bodyParser from 'body-parser';
import cors from 'cors'
import jsonwebtoken from 'jsonwebtoken';

const app = express() ;
app.use(cors());
app.use(bodyParser.json());



app.post('/api/register', (req,res) => {
    res.sendStatus(200);
})


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

const libros = [
    {id:'100',titulo:'Don Segundo Sombra', autor:'Jose Hernandez'},
    {id:'101',titulo:'Martin Fierro', autor: 'Ricardo Guiraldes'},
    {id:'102',titulo:'Juan Moreira', autor: 'Eduardo Gutrierrez'}
];

app.get('/api/libros',(req,res) => {
    const token = req.headers['authorization'];
    jsonwebtoken.verify(token,'frase secreta',(err,payload) => {
        if(err) {
            res.sendStatus(401);
        } else {
            res.json(libros)
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
            libros.push(req.body);
            res.send('Alta ok');
        }
    })
})


const prestamos = [
    {id:'100',idlibro:1},
];

app.get('/api/prestamos',(req,res) => {
    const token = req.headers['authorization'];
    jsonwebtoken.verify(token,'frase secreta',(err,payload) => {
        if(err) {
            res.sendStatus(401);
        } else {
            res.json(prestamos)
        }
    })
})

// break hasta 21:30

app.post('/api/prestamos',(req,res) => {
    const token = req.headers['authorization'];
    jsonwebtoken.verify(token,'frase secreta',(err,payload) => {
        if(err) {
            res.sendStatus(401);
        } else {
            console.log(req.body);
            libros.push(req.body);
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