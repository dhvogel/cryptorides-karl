'use strict';

const supertest = require('supertest');
const server = require('../../app');
const chai = require('chai');

chai.should();

describe('Coinbase -- Integration Tests', function() {

	it('responds to /health (canary test)', function(done) {

		supertest(server)
			.get('/health')
			.expect(200, done);

	});

});
