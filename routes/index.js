'use strict';

const express = require('express');
const jumpbikes = require('./jumpbikes');
const coinbase = require('./coinbase');
const async = require('async');
const router = express.Router();

const CB_API_VERSION = '2018-03-22';

router.get('/', function(req, res) {
	res.render('index', { title: 'Express' });
});

router.get('/health', function(req, res) {
	res.status(200).send('OK');
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

router.get('/coinbase/user', function(req, res) {
	async.waterfall([
		function(callback) {
			coinbase.getCoinbaseClientToken(function(coinbaseClientToken) {
				callback(null, coinbaseClientToken);
			});
		}
	], function(err, coinbaseClientToken) {
		coinbase.getUser(coinbaseClientToken, CB_API_VERSION,
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
