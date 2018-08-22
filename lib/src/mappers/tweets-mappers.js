'use strict';

let _arrayFromObject = (obj) => {
	let result = [];
	for (let tag in obj) {
		result.push({ [tag] : obj[tag] })
	}
	return result;
};

let mapTopHashtags = (hashtagsArray) => {

	return _arrayFromObject(hashtagsArray
			// flatten result
		.reduce( (acc, next) => {
			return acc.concat(next);
			//extract hashtag string
		}).map( (hashTagString) => {
			return /('([^"]|"")*')/gm.exec(hashTagString)[0];
			//reduce to a single object with hashtag counts
		}).reduce( (a, b) =>  Object.assign(a, {[b]: (a[b] || 0) + 1}), {} ))
			//sort by top hashtag occurences
		.sort( (curr, next) => {
			if (curr[Object.keys(curr)] > next[Object.keys(next)]) return -1;
			if (curr[Object.keys(curr)] < next[Object.keys(next)]) return 1;
			return 0;

		});
};

module.exports = { mapTopHashtags };