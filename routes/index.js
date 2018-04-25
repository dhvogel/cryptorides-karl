'use strict';

const express = require('express');
const jumpbikes = require('./jumpbikes');
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
	const sobiClientToken = jumpbikes.getSoBiClientToken();

	jumpbikes.getAllBikes(sobiClientToken, function(error, response, body) {
		res.send(JSON.parse(body).items);
	});
});

module.exports = router;
