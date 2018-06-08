'use strict';

const request = require('request');
const config = require('config');
const AWS = require('aws-sdk');
const s3 = new AWS.S3();


module.exports.getUser = function(cbClientToken, cbApiVersion, callback) {

	let options = {
		url: 'https://api.coinbase.com/v2/user',
		headers: {
			'Authorization': `Bearer ${cbClientToken}`,
			'CB-VERSION': `${cbApiVersion}`
		}
	};

	return request.get(options, callback);

};

module.exports.createCharge = function(cbApiKey, cbApiVersion, chargeName, description, amt, currency, callback) {

	let options = {
		headers: {
			'Content-Type': 'application/json',
			'X-CC-Api-Key': cbApiKey,
			'X-CC-Version': cbApiVersion
		},
		body: {
			'name': chargeName,
			'description': description,
			'local_price': {
				'amount': amt,
				'currency': currency
			},
			'pricing_type': 'fixed_price',
		},
		json: true,
		url: 'https://api.commerce.coinbase.com/charges'
	};

	return request.post(options, callback);

};

module.exports.getCoinbaseApiKey = function(callback) {
	if (process.env.NODE_ENV === 'test' || process.env.NODE_ENV === 'dev') {
		let params = {
			Bucket: 'cb-secrets-bucket-042618',
			Key: 'default.json'
		};
		s3.getObject(params, function(err, data) {
			if (err) console.log(err, err.stack);
			else {
				const config = JSON.parse(data.Body.toString());
				callback(config.coinbase.apiKey);
			}
		});

	} else {
		const coinbaseConfig = config.get('coinbase');
		callback(coinbaseConfig.apiKey);
	}
};

module.exports.getCoinbaseClientToken = function(callback) {
	if (process.env.NODE_ENV === 'test' || process.env.NODE_ENV === 'dev') {
		let params = {
			Bucket: 'cb-secrets-bucket-042618',
			Key: 'default.json'
		};
		s3.getObject(params, function(err, data) {
			if (err) console.log(err, err.stack);
			else {
				const config = JSON.parse(data.Body.toString());
				callback(config.coinbase.clientToken);
			}
		});
	} else {
		const coinbaseConfig = config.get('coinbase');
		callback(coinbaseConfig.clientToken);
	}
};
