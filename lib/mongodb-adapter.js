'use strict';

const MongoClient = require('mongodb').MongoClient;
const Config = require('./../config/config');
const dbConnection = {};

//mutating connection constant to hold connect function as well as connected db object to be used globally
dbConnection.connect = async () => {
	//connect to client
	await MongoClient
			.connect(Config.mongodb.url, {
				poolSize: 10,
				useNewUrlParser: true
			}).then( connection => {
				return connection.db(Config.mongodb.dbName)
			}).then( connected => {
				dbConnection.db = connected;
			});
			// .then(() => {
			// 	return Promise.all(Config.mongodb.collections.map((collection => {
			// 		return dbConnection.db.collection(collection);
			// 	})));
			// }).then((collections) => {
			// 	Object.assign(dbConnection.collections, collections);
			// });
};

module.exports.dbConnection = dbConnection;

