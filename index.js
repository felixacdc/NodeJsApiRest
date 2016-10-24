'use strict';

const mongoose = require('mongoose'),
      Promise = require('bluebird'),
      app = require('./app'),
      config = require('./config');

Promise.promisifyAll(mongoose);

mongoose.connect(config.db, (err, res) => {
    if (err) 
        return console.log(`Error al conectar la base de datos: ${err}`);
    
    console.log('Conexion a la base de datos establecida...');
    app.listen(config.port, () => {
        console.log(`API REST corriendo en http://localhost:${config.port}`);
    });
});
