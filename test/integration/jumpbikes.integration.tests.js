const request = require('supertest');
const server = require('../../app');
const chai = require('chai');
const sinon = require('sinon');

chai.should();

describe('Jumpbikes -- Integration Tests', function() {

	it('responds to /health (canary test)', function(done) {

		request(server)
			.get('/health')
			.expect(200, done);

	});

});
