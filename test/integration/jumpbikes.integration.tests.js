'use strict';

const supertest = require('supertest');
const server = require('../../app');
const chai = require('chai');
const request = require('request');
const sinon = require('sinon');

chai.should();

describe('Jumpbikes -- Integration Tests', function() {

	it('responds to /health (canary test)', function(done) {

		supertest(server)
			.get('/health')
			.expect(200, done);

	});

	describe('GET /jumpbikes', function() {

		let requestStub;

		before(function() {
			requestStub = sinon.stub(request, 'get');
		});

		after(function() {
			request.get.restore();
		});

		it('responds to /jumpbikes', function(done) {

			const responseObject = {
				statusCode: 200,
			};
			const responseBody = {
				'current_page':1,
				'per_page':100,
				'total_entries':102,
				'items':[
					{
						'id':18627,
						'name':'0422',
						'network_id':155,
						'sponsored':false,
						'ebike_battery_level':47,
						'ebike_battery_distance':17.86,
						'hub_id':null,
						'inside_area':true,
						'address':'1439a Egbert Avenue, San Francisco, CA',
						'current_position': {
							'type':'Point',
							'coordinates':[-122.39331666666666,37.72296166666667]
						}
					}
				]
			};

			requestStub
				.withArgs({
					url: 'https://app.socialbicycles.com/api/bikes.json',
					headers: {
						'Application-Name': 'CryptoRides',
						'Authorization': sinon.match.string
					}
				}, sinon.match.func)
				.yields(null, responseObject, JSON.stringify(responseBody));


			supertest(server)
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
		});
	});


	describe('GET /jumpbikes/:jumpbikeId', function() {

		let requestStub;

		before(function() {
			requestStub = sinon.stub(request, 'get');
		});

		after(function() {
			request.get.restore();
		});

		it('responds to /jumpbikes/:jumpbikeId', function(done) {

			const bikeId = 'some_bike_id';

			const responseObject = {
				statusCode: 200,
			};
			const responseBody = {
				'id':18531,
				'name':'0612',
				'network_id':155,
				'sponsored':false,
				'ebike_battery_level':61,
				'ebike_battery_distance':23.18,
				'hub_id':null,
				'inside_area':true,
				'address':'643-699 Washington Street, San Francisco, CA',
				'current_position': {
					'type':'Point',
					'coordinates': [-122.404815,37.79532833333333]
				}
			};

			requestStub
				.withArgs({
					url: `https://app.socialbicycles.com/api/bikes/${bikeId}.json`,
					headers: {
						'Application-Name': 'CryptoRides',
						'Authorization': sinon.match.string
					}
				}, sinon.match.func)
				.yields(null, responseObject, JSON.stringify(responseBody));

			supertest(server)
				.get(`/jumpbikes/${bikeId}`)
				.end(function(err, res) {
					(res.statusCode).should.equal(200);
					(res.body).should.be.an('object');

					(res.body).should.have.property('id').that.is.a('number');
					(res.body).should.have.property('name').that.is.a('string');
					(res.body).should.have.property('network_id').that.is.a('number');
					(res.body).should.have.property('id').that.is.a('number');
					(res.body).should.have.property('sponsored').that.is.a('boolean');
					(res.body).should.have.property('ebike_battery_level').that.is.a('number');
					(res.body).should.have.property('ebike_battery_distance').that.is.a('number');
					(res.body).should.have.property('hub_id');
					(res.body).should.have.property('inside_area').that.is.a('boolean');
					(res.body).should.have.property('address').that.is.a('string');
					(res.body).should.have.property('current_position').that.is.an('object');

					done();
				});

		});

	});

});
