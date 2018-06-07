'use strict';

const request = require('request');
const coinbase = require('../../routes/coinbase');
const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

chai.should();
chai.use(sinonChai);

describe('Coinbase -- Unit Tests', function() {

	let requestStub;

	it('should pass 1 == 1 (canary test)', function() {
		const one = 1;
		one.should.equal(1);
	});

	describe('coinbase.createCharge', function() {

		before(function() {
			requestStub = sinon.stub(request, 'post');
		});

		after(function() {
			request.get.restore();
		});

		// it('should make POST call to coinbase commerce /charges endpoint', function() {
    //
		// 	coinbase.createCharge('some_api_key', () => {});
    //
		// 	requestStub.should.have.been.calledOnce;
		// 	requestStub.should.have.been.calledWith({
		// 		headers: {
		// 			'Application-Name': 'CryptoRides',
		// 			'Authorization': 'Bearer some_token'
		// 		},
		// 		url: 'https://app.socialbicycles.com/api/bikes.json'
		// 	});
    //
		// });

	});

});
