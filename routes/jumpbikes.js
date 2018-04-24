'use strict';

const request = require('request');

module.exports.getAllBikes = function() {

	return request.get('https://app.socialbicycles.com/api/bikes.json')
		.on('response', function(response) {
			console.log(response);
		});
};
