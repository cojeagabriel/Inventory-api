'use strict';
const port = 8000;

const express = require('express');
const serverless = require('serverless-http');
const app = express();
const bodyParser = require('body-parser'); // middleware, req.body
const cors = require('cors'); // cross origin resource sharing
const morgan = require('morgan');
const mongoose = require('mongoose');

var config = require('./config');

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cors());

mongoose.connect(config.database);
app.set('superSecret', config.secret);
app.use(morgan('dev'));


const contacts = require('./routes/contacts');
app.use('/.netlify/functions/server/api/contacts', contacts);

const items = require('./routes/items');
app.use('/.netlify/functions/server/api/items', items);

module.exports.handler = serverless(app);