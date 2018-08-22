'use strict';

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { loadTopHashtags } from './../redux/actions/actions'


const mapStateToProps = state => {
	return {
		interactions: state.interactions.interactions
	}
};


class Interactions extends React.Component {

	componentWillReceiveProps(nextProps) {

	}

	componentWillMount() {
		this.props.loadTopHashtags();
	}
	//todo improve styling of component
	render() {
		const interactions = this.props.interactions ? this.props.interactions.map((interaction) =>
				<li > {'#'+Object.keys(interaction) + ':' + Object.values(interaction)}</li>
		): <div>
				<p>Interactions not loaded</p>
			</div>;
		return (
			<ul className="interactions-list">
				Top hashtags
			{interactions}
			</ul>

		);
	}

}

export default connect(mapStateToProps, { loadTopHashtags })(Interactions);

