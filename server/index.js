'use strict';
const express = require('express');
const app = express();
const path = require('path');

let PORT = process.env.PORT || 1337;

app.use(express.static('public'));

app.get('/', function (req, res, next) {
  res.sendFile(path.join(__dirname, '../index.html'));
});

app.listen(PORT, function () {
  console.log('Listening on port: 1337');
});