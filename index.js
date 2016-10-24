'use strict';

const mongoose = require('mongoose'),
      Promise = require('bluebird'),
      app = require('./app');

Promise.promisifyAll(mongoose);

const port = process.env.PORT || 5000;

mongoose.connect('mongodb://localhost/shop', (err, res) => {
    if (err) 
        return console.log(`Error al conectar la base de datos: ${err}`);
    
    console.log('Conexion a la base de datos establecida...');
    app.listen(port, () => {
        console.log(`API REST corriendo en http://localhost:${port}`);
    });
});
