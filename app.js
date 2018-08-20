'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const compression = require('compression');

const cors = require('cors');
const helmet = require('helmet');

const Routes = require('./api/src/tweets-api');
const app = new express();

let middlewares = [
	compression(),
	bodyParser.json(),
	cors(),
	helmet()
];

app.use(middlewares);
app.use(express.static('dist'));
app.use('/', Routes);

module.exports = app;