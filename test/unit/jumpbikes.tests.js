'use strict';
const request = require('request');
const jumpbikes = require('../../routes/jumpbikes');

let chai = require('chai');
let sinon = require('sinon');
let sinonChai = require('sinon-chai');
chai.should();
chai.use(sinonChai);

describe('GET /jumpbikes', function() {

	beforeEach(function() {
		sinon.stub(console, 'log');
	});

	afterEach(function() {
		console.log.restore();
	});

	it('should call out to social bicycles', function() {

		const SoBiStub = sinon.stub(request, 'get');

		jumpbikes.getAllBikes('some token', function() {
			SoBiStub.should.have.been.calledOnce;
			SoBiStub.should.have.been.calledWith({
				headers: {
					'Application-Name': 'CryptoRides',
					'Authorization': sinon.match.string
				},
				url: 'https://app.socialbicycles.com/api/bikes.json'
			});
		});

	});

});
