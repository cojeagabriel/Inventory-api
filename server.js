'use strict';
const port = 8000;
const express = require('express');
const app = express();
const bodyParser = require('body-parser'); // middleware, req.body
const cors = require('cors'); // cross origin resource sharing
const morgan = require('morgan');
const mongoose = require('mongoose');

var config = require('./src/config');

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
app.use(cors());

mongoose.connect(config.database);
app.set('superSecret', config.secret);
app.use(morgan('dev'));

const items = require('./src/routes/items');
app.use('/api/items', items);

app.listen(port);
console.log('Magic happens at http://localhost:' + port);