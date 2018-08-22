'use strict';

const initialState = {
	interactions: []
};

export default (state=initialState, action) => {
	if (action.type === 'LOAD_INTERACTIONS') {

		return {
			state: state,
			interactions: action.interactions
		}
	} else return state;

}