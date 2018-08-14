module.exports = {
	"port": 8686,
	"mongodb": {
		"url": "mongodb://localhost:27017/rest-boilerplate-dc",
		"dbName": "twitterdb03",
		"collections" : ["FilteredTweetsFriends01", "LevelAFollowers", "LevelAFriends", "analytics"],
		"collectionsObject": {
			FilteredTweetsFriends01:"FilteredTweetsFriends01",
			LevelAFollowers: "LevelAFollowers",
			LevelAFriends: "LevelAFriends",
			analytics: "analytics"
		}
	}
};