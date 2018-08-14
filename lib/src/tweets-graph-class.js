'use strict';

const Graph = require('graph.js/dist/graph.full.js');
const EventEmitter = require('events');

class TwttierGraph extends Graph{

	constructor () {
		super();
		return this;
	}

	async InitializeTwitterGraph (followersMap, friendsMap) {
	let twitterNetwork = await this.BuildGraph(followersMap, friendsMap);
	let analytics = this.CalculateNodeImportanceForGraph(twitterNetwork);
	return {twitterNetwork , analytics};
	}

	async BuildGraph (followersMap, friendsMap) {

		let network = new Graph();

		followersMap.map((vertex) => {
			if (!network.hasVertex(vertex.user_id)) {
				network.addNewVertex(vertex.user_id, vertex._id);
			}
		});

		followersMap.map((vertex) => {
			vertex.followers_list.map((follower_id) => {
				if (network.hasVertex(follower_id)) {
					if (!network.hasEdge(vertex.user_id, follower_id, 'follower')){
						network.addNewEdge(vertex.user_id, follower_id, 'follower')
					}

				}
			})
		});

		friendsMap.map((vertex) => {
			if (!network.hasVertex(vertex.user_id)) {
				network.addNewVertex(vertex.user_id, vertex._id);
			}
		});

		friendsMap.map((vertex) => {
			vertex.friends_list.map((friend_id) => {
				if (network.hasVertex(friend_id)) {
					if (!network.hasEdge(vertex.user_id, friend_id, 'friend')) {
						network.addNewEdge(vertex.user_id, friend_id, 'friend')
					}

				}
			})
		});
		return network;
	};

	async CalculateNodeDegreeForGraph ( populatedNetwork ) {

		let degreeArray = [];
		let max = 0;
		let maxUserId;

		for (let vertex of populatedNetwork.vertices()) {
			degreeArray.push(
					{ userId: vertex[0], degree: populatedNetwork.degree(vertex[0]) })
		}

		degreeArray.map((nodeDegree) => {

			if (max < nodeDegree.degree) {
				max = nodeDegree.degree;
				maxUserId = nodeDegree.userId;
			}

		});
		let maxInDegree = populatedNetwork.inDegree(maxUserId);
		let maxOutDegree = populatedNetwork.outDegree(maxUserId);
		return { degreeArray, max, maxInDegree, maxOutDegree, maxUserId, populatedNetwork }
	};

	async _getArrayMax (importance, degree, graphPropertyArray) {
		if (importance) return await this._getMax10ImportanceArray(graphPropertyArray);
	};

	async CalculateNodeImportanceForGraph (network) {
		let result = await this.CalculateNodeDegreeForGraph(network);
		let importanceArray = [];

		for (let vertex of result.populatedNetwork.vertices()) {

			importanceArray.push(
				{
					userId: vertex[0],
					nodeImportance: {
						inDegree: network.inDegree(vertex[0]),
						outDegree: network.outDegree(vertex[0]),
						nodeDegree: network.degree(vertex[0]),
						importance: network.outDegree(vertex[0]) / (result.maxInDegree + result.maxOutDegree)
					}
				});
		}

		// let topTen = await this._getMax10ImportanceArray(importanceArray);
		// console.log({topTen});
		return importanceArray;
	};


	async _getMax10ImportanceArray ( graphImportanceArray ) {
		let topTen =[];

		for (let i = 0; i < 10; i++) {
			topTen.push(graphImportanceArray[i]);
		}


		graphImportanceArray.map((nodeDegree) => {
			topTen.forEach(element => {
				if (element.importance < nodeDegree.nodeImportance.importance) {
					element.degree = nodeDegree.nodeImportance.nodeDegree;
					element.userId = nodeDegree.userId;
					element.importance = nodeDegree.nodeImportance.importance
				}
			});
		});

		return topTen;
	};

}

module.exports = TwttierGraph;