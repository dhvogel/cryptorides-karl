'use strict';

const express = require('express');
const jumpbikes = require('./jumpbikes');
const async = require('async');
const router = express.Router();

router.get('/', function(req, res) {
	res.render('index', { title: 'Express' });
});

router.get('/health', function(req, res) {
	res.send('OK');
});

router.get('/jumpbikes', function(req, res) {
	async.waterfall([
		function(callback) {
			jumpbikes.getSoBiClientToken(function(sobiClientToken) {
				callback(null, sobiClientToken);
			});
		}
	], function(err, sobiClientToken) {
		jumpbikes.getAllBikes(sobiClientToken, function(error, response, body) {
			if (error) {
				console.log(error);
				res.send(501);
			}
			res.send(JSON.parse(body).items);
		});
	});
});

router.get('/jumpbikes/:jumpbikeId', function(req, res) {
	async.waterfall([
		function(callback) {
			jumpbikes.getSoBiClientToken(function(sobiClientToken) {
				callback(null, sobiClientToken);
			});
		}
	], function(err, sobiClientToken) {
		jumpbikes.getSpecificBike(sobiClientToken, req.params.jumpbikeId,
			function(error, response, body) {
				if (error) {
					console.log(error);
					res.send(501);
				}
				res.send(JSON.parse(body));
			});
	});
});

module.exports = router;
