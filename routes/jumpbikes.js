'use strict';

const request = require('request');
const config = require('config');

module.exports.getAllBikes = function(callback) {

	const sobiConfig = config.get('sobi');

	let options = {
		url: 'https://app.socialbicycles.com/api/bikes.json',
		headers: {
			'Application-Name': 'CryptoRides',
			// TODO: fix this
			'Authorization': `Bearer ${sobiConfig.client_token}`
		}
	};

	return request.get(options, callback);

};
