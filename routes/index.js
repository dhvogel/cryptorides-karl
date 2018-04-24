'use strict';

const express = require('express');
const jumpbikes = require('./jumpbikes');
const router = express.Router();

/* GET home page. */
//eslint-disable-next-line
router.get('/', function(req, res, next) {
	res.render('index', { title: 'Express' });
});

/* GET /bikes */
//eslint-disable-next-line
router.get('/jumpbikes', function(req, res, next) {
	jumpbikes.getAllBikes(function(error, response, body) {
		res.render('jumpbikes', {
			returnedBikes: JSON.parse(body).items
		});
	});
});

module.exports = router;
