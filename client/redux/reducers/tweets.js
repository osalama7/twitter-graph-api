'use strict';

const initialState = {
	tweets: []
};

export default (state=initialState, action) => {
	if (action.type === 'LOAD_TWEETS') {

		return {
			state: state,
			tweets: action.tweets
		}
	} else return state;


}