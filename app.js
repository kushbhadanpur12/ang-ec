const express = require('express');
const jwt = require('jsonwebtoken');
const app = express();
 
var appRouter = require('./api/route');

app.use('/', appRouter);

module.exports = app;