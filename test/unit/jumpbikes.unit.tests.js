'use strict';

const request = require('request');
const jumpbikes = require('../../routes/jumpbikes');
const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

chai.should();
chai.use(sinonChai);

describe('Jumpbikes -- Unit Tests', function() {

	let SoBiStub;

	before(function() {
		SoBiStub = sinon.stub(request, 'get');
	});

	after(function() {
		request.get.restore();
	});

	it('should pass 1 == 1 (canary test)', function() {
		const one = 1;
		one.should.equal(1);
	});

	describe('jumpbikes.getAllBikes', function() {

		it('should call out to social bicycles', function() {

			jumpbikes.getAllBikes('some_token', function() {

				SoBiStub.should.have.been.calledOnce;
				SoBiStub.should.have.been.calledWith({
					headers: {
						'Application-Name': 'CryptoRides',
						'Authorization': 'Bearer some_token'
					},
					url: 'https://app.socialbicycles.com/api/bikes.json'
				});

			});



		});

	});

	describe('jumpbikes.getSpecificBike', function() {

		jumpbikes.getSpecificBike('some_token', function(bikeId) {

			SoBiStub.should.have.been.calledOnce;
			SoBiStub.should.have.been.calledWith({
				headers: {
					'Application-Name': 'CryptoRides',
					'Authorization': 'Bearer some_token'
				},
				url: `https://app.socialbicycles.com/api/bikes/${bikeId}.json`
			});

		});

	});

});
