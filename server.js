'use strict';

const colors = require('colors');
const Config = require('./config/config');
const app = require('./app');
const MongoAdapter = require('./lib/mongodb-adapter');

app.get('/', async (req, res, next) => {
	res.status(200).send('Api up and running welcome to homepage')
});


app.listen(Config.port, async () => {
	try {
		await MongoAdapter.dbConnection.connect();
	} catch (err) {
		console.log(`failed to connect to mongodb ${err}`);
	}
	console.log(colors.green(`Twitter network api running: ${Config.port}`));
});

module.exports = app;