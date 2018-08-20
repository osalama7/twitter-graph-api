'use strict';

import axios from 'axios';

export function loadTweets () {
	return (dispatch) => {
		axios.get('http://localhost:8686/tweets')
				.then((res) => {
					let tweets= res.data;
					dispatch({type:'LOAD_TWEETS', tweets})
				}).catch((err) => {
			console.log(err)
		})
	}
}