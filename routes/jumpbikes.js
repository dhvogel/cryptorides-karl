'use strict';

const request = require('request');
const config = require('config');

module.exports.getAllBikes = function(sobiClientToken, callback) {

	let options = {
		url: 'https://app.socialbicycles.com/api/bikes.json',
		headers: {
			'Application-Name': 'CryptoRides',
			'Authorization': `Bearer ${sobiClientToken}`
		}
	};

	return request.get(options, callback);

};


//TODO: This needs to be revamped to onboard actual people
module.exports.getSoBiClientToken = function() {
	const sobiConfig = config.get('sobi');

	return sobiConfig.client_token;
};
