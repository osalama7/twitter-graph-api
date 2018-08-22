import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import tweets from './reducers/tweets';
import interactions from './reducers/interactions';

export default combineReducers({
	tweets,
	interactions,
	router: routerReducer
});
