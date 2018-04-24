'use strict';

const sinon = require('sinon');
const request = require('request');
const jumpbikes = require('../../routes/jumpbikes');

const chai = require('chai');
const sinonChai = require('sinon-chai');

chai.use(sinonChai);
chai.should();

describe('GET /jumpbikes', function() {

	it('should return a bunch of JSON data', function() {

		const SoBiStub = sinon.stub(request, 'get');

		jumpbikes.getAllBikes();

		console.log(SoBiStub);

		SoBiStub.should.have.been.calledOnce();
		SoBiStub.should.have.been.calledWith('https://app.socialbicycles.com/api/bikes.json');

	});

});
