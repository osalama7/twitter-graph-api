'use strict';

import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
	loadTweets
} from './../redux/actions/actions'

const mapStateToProps = state => {

	return {
		tweets: state.tweets.tweets
	}
};

class Tweets extends React.Component {

	componentWillReceiveProps(nextProps) {

	}

	componentWillMount() {
		this.props.loadTweets()
	}
	render() {
		const tweets= this.props.tweets && this.props.tweets.tweets ? this.props.tweets.tweets.map((tweet)=>
			<div >
				<p className="" dangerouslySetInnerHTML={{__html: tweet.text}}></p>
			</div>

		): <div><p>Tweets not loaded</p></div>;
	return (
			<div>
				{tweets}
				</div>
	);
	}

}

export default connect(mapStateToProps, { loadTweets })(Tweets);