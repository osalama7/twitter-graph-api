'use strict';

import axios from 'axios';

export function loadTweets () {
	return (dispatch) => {
		axios.get('http://localhost:8686/tweets')
				.then((res) => {
					let tweets= res.data;
					dispatch({type:'LOAD_TWEETS', tweets});
				}).catch((err) => {
			console.log(err)
		})
	}
}

export function loadTopHashtags () {
	return (dispatch) => {
		axios.get('http://localhost:8686/tweets/interactions')
				.then((res) => {
					let interactions = res.data;
					dispatch({type:'LOAD_INTERACTIONS', interactions});
				}).catch((err) => {
			console.log(err)
		})
	}
}