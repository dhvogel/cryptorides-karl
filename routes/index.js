'use strict';

const express = require('express');
const jumpbikes = require('./jumpbikes');
const async = require('async');
const router = express.Router();

/* GET home page. */
//eslint-disable-next-line
router.get('/', function(req, res) {
	res.render('index', { title: 'Express' });
});

router.get('/health', function(req, res) {
	res.send('OK');
});

/* GET /bikes */
//eslint-disable-next-line
router.get('/jumpbikes', function(req, res) {

	console.log('in /jumpbikes');

	async.waterfall([
		function(callback) {
			console.log('in function 1');
			jumpbikes.getSoBiClientToken(function(sobiClientToken) {
				console.log(`sobiClientToken ${sobiClientToken}`);
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

module.exports = router;
