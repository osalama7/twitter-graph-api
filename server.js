'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const compression = require('compression');
const colors = require('colors');
const Config = require('./config/config');
const MongoAdapter = require('./lib/mongodb-adapter');
const Routes = require('./api/src/tweets-api');

let middlewares = [
	compression(),
	bodyParser.json(),
];

const app = new express();
app.use(middlewares);

app.get('/', async (req, res, next) => {
	res.status(200).send('Api up and running welcome to homepage')
});


app.listen(Config.port, async () => {
	app.use('/', Routes);
	await MongoAdapter.dbConnection.connect();

	console.log(colors.green(`Twitter network api running: ${Config.port}`));
});

module.exports = app;