'use strict';

const request = require('request');
const config = require('config');
const AWS = require('aws-sdk');
const s3 = new AWS.S3();

module.exports.createCharge = function(api_key, api_version, charge_name, description, amt, currency, callback) {

	let options = {
		headers: {
			'Content-Type': 'application/json',
			'X-CC-Api-Key': api_key,
			'X-CC-Version': api_version
		},
		body: {
			'name': charge_name,
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
