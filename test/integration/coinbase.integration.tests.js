'use strict';

const supertest = require('supertest');
const server = require('../../app');
const chai = require('chai');
const sinon = require('sinon');
const request = require('request');

chai.should();

describe('Coinbase -- Integration Tests', function() {

	it('responds to /health (canary test)', function(done) {

		supertest(server)
			.get('/health')
			.expect(200, done);

	});

	describe('GET /coinbase/user', function() {

		let requestStub;

		before(function() {
			requestStub = sinon.stub(request, 'get');
		});

		after(function() {
			request.get.restore();
		});

		it('responds to /coinbase/user', function(done) {

			this.timeout(5000)

			const responseObject = {
				statusCode: 200,
			};
			const responseBody = require('../data/coinbase/coinbase.v2.user.json');

			requestStub
				.withArgs({
					url: 'https://api.coinbase.com/v2/user',
					headers: {
						'Authorization': sinon.match.string,
						'CB-VERSION': sinon.match.string
					}
				}, sinon.match.func)
				.yields(null, responseObject, JSON.stringify(responseBody));


			supertest(server)
				.get('/coinbase/user')
				.end(function(err, res) {
					(res.statusCode).should.equal(200);

					(res.body.id).should.equal('coinbase-id');
					(res.body.name).should.equal('Daniel Vogel');

					done();
				});
		});
	});
});
