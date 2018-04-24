'use strict';

const express = require('express');
const router = express.Router();
const jumpbikes = require('jumpbikes');

/* GET home page. */
router.get('/', function(req, res, next) {
	res.render('index', { title: 'Express' });
});

/* GET /bikes */
router.get('/bikes', function(req, res, next) {
	
});

module.exports = router;
