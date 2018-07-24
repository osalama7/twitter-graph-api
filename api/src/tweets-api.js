'use strict';

const TweetsController = require('../src/tweets-controller');
const express = require('express');
const Router = express.Router();
const colors = require('colors');
const Config = require('./../../config/config');
const TwitterGraph = require('./tweets-graph-class');
const mongo = require('./../../lib/mongodb-adapter').dbConnection;

Router.get('/tweets', async (req, res, next) => {
	let tweets = await TweetsController.CursorfindFilteredTweets(mongo.db).catch((err) => {
		console.error(colors.red(`Failed to get tweets${ err }`));
		res.status(500).send(err);
	});

	// tweets.on('tweet', (doc) => {
	// 	setImmediate(() => {
	// 		console.dir(`something happend async now${doc}  ${Date.now()}`);
	//
	// 		next();
	// 	})
	// });

	res.status(200).send({tweets});
	next();
});

Router.get('/followmaps', async (req, res, next) => {
	let followMaps = await TweetsController.CursorFindUserFollowersMap(mongo.db).catch((err) => {
		console.error(colors.red(`Failed to get maps${ err }`));
		res.status(500).send(err);
	});

	res.status(200).send(followMaps);
	next();
});


Router.get('/network', async (req, res, next) => {
	let followMaps = await TweetsController.CursorFindUserFollowersMap(mongo.db)
			.catch((err) => {
		console.error(colors.red(`Failed to get maps${ err }`));
		res.status(500).send(err);
	});

	let friendsMaps = await TweetsController.CursorFindUserFriendsMap(mongo.db)
			.catch((err) => {
		console.error(colors.red(`Failed to get maps${ err }`));
		res.status(500).send(err);
	});
	let TwitGraph = new TwitterGraph();

	let network = await TwitGraph.InitializeTwitterGraph(followMaps, friendsMaps)
			.then(analyticsToPersist => {
				TweetsController.InsertNetworkACOAnalytics(mongo.db, analyticsToPersist);
			})
			.catch( err => {
			console.error(err);
	});

	res.status(200).send(network);
	next();
});


module.exports = Router ;