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
			request.post.restore();
		});

		it('should make POST call to coinbase commerce /charges endpoint', function() {

			coinbase.createCharge('some_api_key', 'api_version', 'some_charge_name', 'some_description', 'some_amt', 'some_currency', () => {});

			requestStub.should.have.been.calledOnce;
			requestStub.should.have.been.calledWith({
				headers: {
					'Content-Type': 'application/json',
					'X-CC-Api-Key': 'some_api_key',
					'X-CC-Version': 'api_version'
				},
				body: {
					'name': 'some_charge_name',
					'description': 'some_description',
					'local_price': {
						'amount': 'some_amt',
						'currency': 'some_currency'
					},
					'pricing_type': 'fixed_price',
				},
				json: true,
				url: 'https://api.commerce.coinbase.com/charges'
			});

		});

	});

});
