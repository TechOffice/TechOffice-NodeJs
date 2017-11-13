var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
	var content = "This example show you how to use Template engine to render a web page.";
	res.render('hello', { title: 'Express Template Example', content: content });
});

module.exports = router;
