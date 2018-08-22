'use strict';

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { loadTweets } from './../redux/actions/actions'
import Interactions from './interactions';

const mapStateToProps = state => {
	return {
		tweets: state.tweets.tweets
	}
};


class Tweets extends React.Component {

	componentWillReceiveProps(nextProps) {

	}

	componentWillMount() {
		this.props.loadTweets();
	}

	render() {

		const tweets= this.props.tweets && this.props.tweets.tweets ? this.props.tweets.tweets.map((tweet)=>
			<div>
				<aside className="tweet-username">{tweet.name}</aside>
				<p className="tweet-title" >{tweet.text}</p>
			</div>

		): <div><p>Tweets not loaded</p></div>;
	return (
			<div>
				<div className="container">
					<Interactions />
				</div>
				<div className="tweet-panel">
					<p className="count-caption">Count: {tweets.length ? tweets.length : 0}</p>
					{tweets}
				</div>
			</div>
	);
	}

}

export default connect(mapStateToProps, { loadTweets })(Tweets);