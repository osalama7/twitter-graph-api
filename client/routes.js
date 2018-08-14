import React, { Component } from "react";
import "./app.css";

export default class Routes extends Component {
	constructor(props) {
		super(props);
	}

	componentDidMount() {
		fetch("/tweets")
				.then(res => res.json())
	}

	render() {
		return (
		<div>

	</div>
	);
	}
}
