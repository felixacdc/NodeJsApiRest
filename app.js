'use strict';

const express = require('express'),
      bodyParser = require('body-parser'),
      app = express(),
      api = require("./routes/index.js");

app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());

app.use('/api', api);

module.exports = app;