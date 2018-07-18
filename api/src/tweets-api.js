'use strict';

const TweetsController = require('../src/tweets-controller');
const express = require('express');
const Router = express.Router();
const colors = require('colors');
const GraphBuilder = require('./../../lib/src/friends-followers-graph-builder');
const Config = require('./../../config/config');

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
	let followMaps = await TweetsController.CursorFindUserFollowersMap(mongo.db).catch((err) => {
		console.error(colors.red(`Failed to get maps${ err }`));
		res.status(500).send(err);
	});

	let friendsMaps = await TweetsController.CursorFindUserFriendsMap(mongo.db).catch((err) => {
		console.error(colors.red(`Failed to get maps${ err }`));
		res.status(500).send(err);
	});

	let network = await GraphBuilder.BuildGraph(followMaps, friendsMaps)
			.catch(err => {
				console.log(err);
	});
	let importanceArray = await GraphBuilder.CalculateNodeImprotanceForGraph(network);
	console.log(`This network has ${network.vertexCount()} vertecies`);
	console.log(`This network has ${network.edgeCount()} edges`);
	network.stats = {
		"vertex-count": network.vertexCount(),
		"edge-count": network.edgeCount()
	};

	res.status(200).send(importanceArray);
	next();
});


module.exports = Router ;