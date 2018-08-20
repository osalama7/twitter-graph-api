'use strict';

const initialState = {
	tweets: []
}
export default (state=initialState, action) => {
	if (action.type === 'LOAD_TWEETS') {
		console.log('action');
		return {
			state: state,
			tweets: action.tweets
		}
	} else return state;


}