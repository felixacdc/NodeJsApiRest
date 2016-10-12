'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Promise = require('bluebird');
Promise.promisifyAll(mongoose);

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());

app.get('/api/product', (req, res) => {
    res.status(200).send({products: []});
});

app.get('/api/product/:productId', (req, res) => {
    
});

app.post('/api/product', (req, res) => {
    console.log(req.body);
    res.status(200).send({message: "El producto se ha recibido"});
});

app.put('/api/product/:productId', (req, res) => {
    
});

app.delete('/api/product/:productId', (req, res) => {
    
});

mongoose.connect('mongodb://localhost/shop', (err, res) => {
    if (err) 
        return console.log(`Error al conectar la base de datos: ${err}`);
    
    console.log('Conexion a la base de datos establecida...');
    app.listen(port, () => {
        console.log(`API REST corriendo en http://localhost:${port}`);
    });
});
