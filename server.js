"use strict";

// load the things we need
const express = require('express');
const atpl = require('node-atpl');
const app = express();

// template engine
app.use(atpl.__layout({layout: 'layout/default'}));
app.engine('.atpl', atpl.__express);
app.set('view engine', 'atpl');

// static file 
app.use(express.static('public'));

require('./server/routes')(app);

app.listen(8080);
console.log('%d is the magic port', 8080);
