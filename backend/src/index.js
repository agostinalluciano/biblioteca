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
    if(req.body && req.body.email == "admin@sistema.com" && req.body.password == "123456") {
        const token = jsonwebtoken.sign(
            {usuario:"admin@sistema.com",rol:'ADM'},'frase secreta')
        // faltaria agregar palabra Bearer (parte del protocolo)    
        res.json(token);
    } else if(req.body && req.body.email == "usuario@sistema.com" && req.body.password == "123456") {
        const token = jsonwebtoken.sign(
            {usuario:"usuario@sistema.com",rol:'USR'},'frase secreta')
        // faltaria agregar palabra Bearer (parte del protocolo)    
        res.json(token);
    } else if(req.body && req.body.email == "usuario@sistema.com" && req.body.password == "123456") {
        const token = jsonwebtoken.sign(
            {usuario:"usuario@sistema.com",rol:'BIB'},'frase secreta')
        // faltaria agregar palabra Bearer (parte del protocolo)    
        res.json(token);
    } else {
        res.sendStatus(401);
    }

})

let libros = [
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

// break hasta 21:30

app.post('/api/libros',(req,res) => {
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

app.delete('/api/libros/:id',(req,res) => {
    const token = req.headers['authorization'];
    jsonwebtoken.verify(token,'frase secreta',(err,payload) => {
        if(err) {
            res.sendStatus(401);
        } else {
            console.log(req.params.id);
            //libros = libros.filter((libro) => {libro.id !== req.params.id})
            let aux = []
            for(let i = 0; i < libros.length; i++) {
                if(libros[i].id != req.params.id) {
                    aux.push(libros[i])
                }
            }
            libros = aux
            res.send('Borrado ok');
        }
    })
})


const prestamos = [
    {id:'101',idlibro:3, nombreLibro:"Batman", idUser:6, nombreUsuario:"David", returned:0},
    {id:'102',idlibro:4, nombreLibro:"DonQuijote", idUser:6, nombreUsuario:"Agostina", returned:1},
    {id:'103',idlibro:1, nombreLibro:"La Celestina", idUser:4, nombreUsuario:"Carolina", returned:0},
    {id:'104',idlibro:3, nombreLibro:"Lazarillo", idUser:2, nombreUsuario:"Agostina", returned:1},
    {id:'105',idlibro:4, nombreLibro:"Hamlet", idUser:1, nombreUsuario:"Nicolas Lavarello", returned:0},
    {id:'106',idlibro:5, nombreLibro:"Romeo y Julieta", idUser:9, nombreUsuario:"David", returned:0},
    {id:'107',idlibro:3, nombreLibro:"Buen Viaje Sr Presidente", idUser:3, nombreUsuario:"Carolina", returned:0}

    /* {id:'102',idlibro:3, idUser:6, returned:0},
    {id:'103',idlibro:4, idUser:6, returned:1},
    {id:'104',idlibro:1, idUser:4, returned:0},
    {id:'105',idlibro:3, idUser:4, returned:1},
    {id:'106',idlibro:4, idUser:2, returned:0},
    {id:'107',idlibro:5, idUser:1, returned:0},
    {id:'108',idlibro:3, idUser:9, returned:0}, */

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