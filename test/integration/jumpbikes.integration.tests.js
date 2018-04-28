const request = require('supertest');
const server = require('../../app');
const chai = require('chai');

chai.should();

describe('Jumpbikes -- Integration Tests', function() {

	it('responds to /health (canary test)', function(done) {

		request(server)
			.get('/health')
			.expect(200, done);

	});

	describe('GET /jumpbikes', function() {

		it('responds to /jumpbikes', function(done) {

			request(server)
				.get('/jumpbikes')
				.end(function(err, res) {
					(res.statusCode).should.equal(200);
					(res.body).should.be.an('array');

					(res.body[0]).should.have.property('id').that.is.a('number');
					(res.body[0]).should.have.property('name').that.is.a('string');
					(res.body[0]).should.have.property('network_id').that.is.a('number');
					(res.body[0]).should.have.property('id').that.is.a('number');
					(res.body[0]).should.have.property('sponsored').that.is.a('boolean');
					(res.body[0]).should.have.property('ebike_battery_level').that.is.a('number');
					(res.body[0]).should.have.property('ebike_battery_distance').that.is.a('number');
					(res.body[0]).should.have.property('hub_id');
					(res.body[0]).should.have.property('inside_area').that.is.a('boolean');
					(res.body[0]).should.have.property('address').that.is.a('string');
					(res.body[0]).should.have.property('current_position').that.is.an('object');

					done();
				});

		}).timeout(5000);

	});

});
