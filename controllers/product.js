'use strict';

const Product = require('../models/product');

function getProduct (req, res) {
    let productId = req.params.productId;
    
    Product.findById(productId).then((product) => {
        
        if(!product) 
            res.status(404).send({message: `El producto no existe`});
        res.status(200).send({ product });
        
    }).catch((err) => {
        res.status(500).send({message: `Error al guardar los datos: ${err}`});
    });
}

function getProducts (req, res) {
     Product.find({}).then((products) => {
        if(!products) 
            res.status(404).send({message: `El producto no existe`});
        
        res.status(200).send({ products });
    }).catch((err) => {
        res.status(500).send({message: `Error al guardar los datos: ${err}`});
    });
}

function saveProduct(req, res) {
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
}

function updateProduct (req, res) {
    let productId = req.params.productId;
    let update = req.body;
    
    Product.findByIdAndUpdate(productId, update).then((product) => {
        res.status(200).send({ message: "Producto actualizado." });
    }).catch((err) => {
        res.status(500).send({message: `Error al guardar los datos: ${err}`});
    });
}

function deleteProduct (req, res) {
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
}

module.exports = {
    getProduct,
    getProducts,
    saveProduct,
    updateProduct,
    deleteProduct
}
