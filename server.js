// server.js
var express = require('express');
var app = require('path');
app = express();
app.use(express.static('static'));
var port = process.env.PORT || 5000;
app.listen(port);
console.log('server started '+ port);