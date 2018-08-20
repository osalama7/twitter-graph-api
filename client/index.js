import React from 'react';
import ReactDOM from 'react-dom';

import { Provider } from 'react-redux';

import { Switch, Route } from 'react-router-dom';
import { ConnectedRouter } from 'react-router-redux';


import { store, history } from './redux/store';
import Tweets from './components/tweets-list';

ReactDOM.render((
		<Provider store={store}>
			<ConnectedRouter history={history}>
				<Switch>
					<Route exact path="/" component={Tweets} />
				</Switch>
			</ConnectedRouter>
		</Provider>
), document.getElementById('root'));