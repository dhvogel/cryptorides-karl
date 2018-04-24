'use strict';

const should = require('should');
const chai = require('chai');
const sinonChai = require('sinon-chai');
const require = require('request');
const jumpbikes = require('../../routes/jumpbikes');

chai.use(sinonChai);

describe('GET /jumpbikes', function() {

	it('should return a bunch of JSON data', function(done) {

		const SoBiStub = sinon.stub(request);

		jumpbikes.getAllBikes()

		SoBiStub.should.be.calledWith('https://app.socialbicycles.com/api/bikes.json')

	});

});
