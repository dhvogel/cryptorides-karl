'use strict';

const request = require('request');
const config = require('config');
const AWS = require('aws-sdk');
const s3 = new AWS.S3();


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


module.exports.getSpecificBike = function(sobiClientToken, bikeId, callback) {

	let options = {
		url: `https://app.socialbicycles.com/api/bikes/${bikeId}.json`,
		headers: {
			'Application-Name': 'CryptoRides',
			'Authorization': `Bearer ${sobiClientToken}`
		}
	};

	return request.get(options, callback);

};

module.exports.bookBike = function(sobiClientToken, bikeId, callback) {

	let options = {
		url: `https://app.socialbicycles.com/api/bikes/${bikeId}/book_bike.json`,
		headers: {
			'Application-Name': 'CryptoRides',
			'Authorization': `Bearer ${sobiClientToken}`
		}
	};

	return request.post(options, callback);

};

module.exports.getSoBiClientToken = function(callback) {
	if (process.env.NODE_ENV === 'test') {
		let params = {
			Bucket: 'cb-secrets-bucket-042618',
			Key: 'default.json'
		};
		s3.getObject(params, function(err, data) {
			if (err) console.log(err, err.stack);
			else {
				const sobiConfig = JSON.parse(data.Body.toString());
				const sobiClientToken = sobiConfig.sobi.client_token;
				callback(sobiClientToken);
			}
		});

	} else {
		const sobiConfig = config.get('sobi');
		callback(sobiConfig.client_token);
	}

};
