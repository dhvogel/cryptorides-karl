'use strict';

const request = require('request');
const jumpbikes = require('../../routes/jumpbikes');
const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

chai.should();
chai.use(sinonChai);

describe('Jumpbikes -- Unit Tests', function() {

	it('should pass 1 == 1 (canary test)', function() {
		const one = 1;
		one.should.equal(1);
	});

	describe('jumpbikes.getAllBikes', function() {

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

				SoBiStub.restore();

			});
		});
	});

});
