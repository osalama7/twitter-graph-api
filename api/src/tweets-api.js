'use strict';

const TweetsController = require('../src/tweets-controller');
const express = require('express');
const Router = express.Router();
const colors = require('colors');
const Config = require('./../../config/config');
const TwitterGraph = require('../../lib/src/tweets-graph-class');
const mongo = require('./../../lib/mongodb-adapter').dbConnection;

const TweetsDataController = require('../src/tweets-controller');
let tweetsDataController = new TweetsDataController();

Router.get('/tweets', async (req, res, next) => {
	await tweetsDataController
			.CursorfindFilteredTweets(tweetsDataController)
			.then((tweets) => {
				res.status(200).send({tweets});
	}).catch((err) => {
		console.error(colors.red(`Failed to get tweets${ err }`));
		res.status(500).send(err);
	});
	next();
});

Router.get('/followmaps', async (req, res, next) => {

	 await tweetsDataController.CursorFindUserFollowersMap()
			 .then( followMaps => {
				res.status(200).send(followMaps);
			 	next();
	 			}).catch((err) => {
				 console.error(colors.red(`Failed to get maps${ err }`));
				 res.status(500).send(err);
			 });
});

Router.get('/tweets/interactions', async (req, res, next) => {

	await tweetsDataController.GetTopTrendingHashTags()
			.then( trends => {
				res.status(200).send(trends);
				next();
			}).catch((err) => {
				console.error(colors.red(`Failed to get maps${ err }`));
				res.status(500).send(err);
			});
});


Router.get('/network', async (req, res, next) => {
	let followMaps = await tweetsDataController.CursorFindUserFollowersMap()
			.catch((err) => {
				console.error(colors.red(`Failed to get maps${ err }`));
				res.status(500).send(err);
	});

	let friendsMaps = await tweetsDataController.CursorFindUserFriendsMap()
			.catch((err) => {
				console.error(colors.red(`Failed to get maps${ err }`));
				res.status(500).send(err);
	});

	let TwitGraph = new TwitterGraph();

	let result = await TwitGraph.InitializeTwitterGraph(followMaps, friendsMaps);

	tweetsDataController.InsertNetworkACOAnalytics(result.analytics);

	res.status(200).json( result.twitterNetwork );

	next();
});


module.exports = Router ;