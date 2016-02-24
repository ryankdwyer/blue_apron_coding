'use strict';
const express = require('express');
const app = express();
const path = require('path');

app.use(express.static('public'));

app.get('/', function (req, res, next) {
  res.sendFile(path.join(__dirname, '../index.html'));
});

app.listen(1337, function () {
  console.log('Listening on port: 1337');
});