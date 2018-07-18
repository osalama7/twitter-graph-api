'use strict';

const Graph = require('graph.js/dist/graph.full.js');

let BuildGraph = async (followersMap, friendsMap) => {

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
				if (!network.hasEdge(vertex.user_id, friend_id, 'friend')){
					network.addNewEdge(vertex.user_id, friend_id, 'friend')
				}

			}
		})
	});
		return network;
};


let CalculateNodeDegreeForGraph = async (network) => {
	let degreeArray = [];
	let max = 0;
	let maxUserId;

	for (let vertex of network.vertices()) {
	degreeArray.push(
			{ userId: vertex[0], degree:network.degree(vertex[0]) })
	}

	degreeArray.map((nodeDegree) => {

		if (max < nodeDegree.degree) {
			max = nodeDegree.degree;
			maxUserId = nodeDegree.userId;
		}
	});
	let maxInDegree = network.inDegree(maxUserId);
	let maxOutDegree = network.outDegree(maxUserId);

	return { degreeArray, max, maxInDegree, maxOutDegree, maxUserId }
};

let _getArrayMax = async(importance, degree, graphPropertyArray) => {
	if (importance) return await _getMax10ImportanceArray(graphPropertyArray);
	else if (degree) return await _getMax10DegreeArray(graphPropertyArray);
};
//todo get 10
let _getMax10ImportanceArray = async( graphImportanceArray ) => {
	let max = {
		degree: 0,
		userId: 0,
		importance: 0
	};

	graphImportanceArray.map((nodeDegree) => {
		if (max.importance < nodeDegree.nodeImportance.importance) {
			max.degree = nodeDegree.nodeImportance.nodeDegree;
			max.userId = nodeDegree.userId;
			max.importance = nodeDegree.nodeImportance.importance
		}
	});


	return max;
};


let CalculateNodeImprotanceForGraph = async (network) => {
	let result = await CalculateNodeDegreeForGraph(network);
	console.log(result.maxUserId);
	let importanceArray = [];
	for (let vertex of network.vertices()) {

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
	console.log(await _getMax10ImportanceArray(importanceArray));
	return importanceArray;
};

module.exports = {BuildGraph, CalculateNodeDegreeForGraph, CalculateNodeImprotanceForGraph};