'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Promise = require('bluebird');
Promise.promisifyAll(mongoose);

const Product = require('./models/product');

const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());

app.get('/api/product', (req, res) => {
    Product.find({}).then((products) => {
        if(!products) 
            res.status(404).send({message: `El producto no existe`});
        
        res.status(200).send({ products });
    }).catch((err) => {
        res.status(500).send({message: `Error al guardar los datos: ${err}`});
    });
});

app.get('/api/product/:productId', (req, res) => {
    let productId = req.params.productId;
    
    Product.findById(productId).then((product) => {
        
        if(!product) 
            res.status(404).send({message: `El producto no existe`});
        res.status(200).send({ product });
        
    }).catch((err) => {
        res.status(500).send({message: `Error al guardar los datos: ${err}`});
    });
});

app.post('/api/product', (req, res) => {
    console.log('POST /api/product');
    console.log(req.body);
    
    let product = new Product();
    product.name = req.body.name;
    product.picture = req.body.picture;
    product.price = req.body.price;
    product.category = req.body.category;
    product.description = req.body.description;
    
    product.save().then((product) => {
        res.status(200).send({ product });
    }).catch((err) => {
        res.status(500).send({message: `Error al guardar los datos: ${err}`});
    });
});

app.put('/api/product/:productId', (req, res) => {
    let productId = req.params.productId;
    let update = req.body;
    
    Product.findByIdAndUpdate(productId, update).then((product) => {
        res.status(200).send({ message: "Producto actualizado." });
    }).catch((err) => {
        res.status(500).send({message: `Error al guardar los datos: ${err}`});
    });
});

app.delete('/api/product/:productId', (req, res) => {
    let productId = req.params.productId;
    
    Product.findById(productId).then((product) => {
        product.remove().then(() => {
            res.status(200).send({ message: "El producto ha sido eliminado." });
        }).catch((err) => {
            res.status(500).send({message: `Error al guardar los datos: ${err}`});
        });
    }).catch((err) => {
        res.status(500).send({message: `Error al guardar los datos: ${err}`});
    });
});

mongoose.connect('mongodb://localhost/shop', (err, res) => {
    if (err) 
        return console.log(`Error al conectar la base de datos: ${err}`);
    
    console.log('Conexion a la base de datos establecida...');
    app.listen(port, () => {
        console.log(`API REST corriendo en http://localhost:${port}`);
    });
});
