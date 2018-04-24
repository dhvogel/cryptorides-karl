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

		const expected = [{personId: 1234}, {personId: 1235}];

		const SoBiStub = sinon.stub(request, 'get').returns({
			on:sinon.stub().yields([expected])
		});

		jumpbikes.getAllBikes();

		SoBiStub.should.have.been.calledOnce;
		SoBiStub.should.have.been.calledWith('https://app.socialbicycles.com/api/bikes.json');

	});

});
