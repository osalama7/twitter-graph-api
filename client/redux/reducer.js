import { combineReducers } from 'redux';
import tweets from './reducers/tweets';
import { routerReducer } from 'react-router-redux';

export default combineReducers({
	tweets,
	router: routerReducer
});
