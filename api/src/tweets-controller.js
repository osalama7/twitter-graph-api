'use strict';
const mongo = require('./../../lib/mongodb-adapter').dbConnection;
const Config = require('./../../config/config');

class TweetsDataController {

	constructor() {
	return this;
	}

	async CursorfindFilteredTweets () {

		let FilteredTweetsFriends01Collection = await mongo.db.collection(Config.mongodb.collectionsObject.FilteredTweetsFriends01);


		let tweets = [];
		try {
			let cursor = FilteredTweetsFriends01Collection.find();
			let i = 0;

			while(await cursor.hasNext()) {
				const doc = await cursor.next();
				tweets.push(doc);
			}

		} catch (err) {
			console.error(err.stack);
		}
		console.log(tweets.length);
		let uniqueIds = [];
		tweets.map((tweet) => {
			if (uniqueIds.indexOf(tweet.user_id) === -1 ) uniqueIds.push(tweet.user_id);
		});
		console.log(uniqueIds.length);
		return tweets;

	};

	async CursorFindUserFollowersMap () {

		let LevelAFollowersCollection = await mongo.db.collection(Config.mongodb.collectionsObject.LevelAFollowers);
		let followersMap = [];

		const cursor = LevelAFollowersCollection.find();
		try {
			while(await cursor.hasNext()) {
				const followMap = await cursor.next();

				followersMap.push(followMap);
			}
		} catch (err) {
			console.error(err.stack);
		}
		console.log(followersMap.length);
		return followersMap;
	};

	async CursorFindUserFriendsMap () {
		let LevelAFriendsCollection = await mongo.db.collection(Config.mongodb.collectionsObject.LevelAFriends);
		let friendsMap = [];
		const cursor = LevelAFriendsCollection.find();
		try {
			while(await cursor.hasNext()) {
				const followMap = await cursor.next();

				friendsMap.push(followMap);
			}
		} catch (err) {
			console.error(err.stack);
		}
		console.log(friendsMap.length);
		return friendsMap;
	};
	async InsertNetworkACOAnalytics (analytics) {
		let AnalyticsCollection = await mongo.db.collection(Config.mongodb.collectionsObject.analytics);
		let res = AnalyticsCollection.insertMany([{analytics}]).catch(err => {
			console.error(`failed to insert analytics`);
		});
		return res;
	};
}


module.exports = TweetsDataController;