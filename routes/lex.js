/**
  OptSystem Lexical Analyzer
  @author Devpy & 365Bytes Team
  @version 0.0.1 [Beta]
**/
var express = require('express');
var router = express.Router();
var coreConfig = require('../config');
var G = require('../functions');

// --> Show the login form
router.get('/', G.isLogOut, function(req, res, next) {

	//console.log(req.db);

  	res.render('logged/lex', { title: coreConfig.title, author: coreConfig.meta_author });
  
});

// --> Do POST request
router.post('/', G.isLogOut, function(req, res, next){

	// --> Upload File and Analyze


});

module.exports = router;