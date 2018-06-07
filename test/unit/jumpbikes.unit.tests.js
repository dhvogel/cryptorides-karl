'use strict';

const request = require('request');
const jumpbikes = require('../../routes/jumpbikes');
const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

chai.should();
chai.use(sinonChai);

describe('Jumpbikes -- Unit Tests', function() {

	let requestStub;

	it('should pass 1 == 1 (canary test)', function() {
		const one = 1;
		one.should.equal(1);
	});

	describe('jumpbikes.getAllBikes', function() {

		before(function() {
			requestStub = sinon.stub(request, 'get');
		});

		after(function() {
			request.get.restore();
		});

		it('should make GET call to social bicycles /bikes.json endpoint', function() {

			jumpbikes.getAllBikes('some_token', () => {});

			requestStub.should.have.been.calledOnce;
			requestStub.should.have.been.calledWith({
				headers: {
					'Application-Name': 'CryptoRides',
					'Authorization': 'Bearer some_token'
				},
				url: 'https://app.socialbicycles.com/api/bikes.json'
			});

		});

	});

	describe('jumpbikes.getSpecificBike', function() {

		before(function() {
			requestStub = sinon.stub(request, 'get');
		});

		after(function() {
			request.get.restore();
		});

		it('should make GET call to /bikes/${bikeId}.json endpoint', function() {
			jumpbikes.getSpecificBike('some_token', 'some_bike_id', () => {});

			requestStub.should.have.been.calledOnce;
			requestStub.should.have.been.calledWith({
				headers: {
					'Application-Name': 'CryptoRides',
					'Authorization': 'Bearer some_token'
				},
				url: 'https://app.socialbicycles.com/api/bikes/some_bike_id.json'
			});

		});

	});


	describe('jumpbikes.bookBike', function() {

		before(function() {
			requestStub = sinon.stub(request, 'post');
		});

		after(function() {
			request.post.restore();
		});

		it('should make POST call to bikes/${bike_id}/book_bike.json endpoint', function() {
			jumpbikes.bookBike('some_token', 'some_bike_id', () => {});

			requestStub.should.have.been.calledOnce;
			requestStub.should.have.been.calledWith({
				headers: {
					'Application-Name': 'CryptoRides',
					'Authorization': 'Bearer some_token'
				},
				url: 'https://app.socialbicycles.com/api/bikes/some_bike_id/book_bike.json'
			});

		});

	});

});
