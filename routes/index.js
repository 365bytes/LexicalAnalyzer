/**
  OptSystem Lexical Analyzer
  @author Devpy & 365Bytes Team
  @version 0.0.1 [Beta]
**/
var express = require('express');
var router = express.Router();
var coreConfig = require('../config');
var G = require('../functions');


/* GET home page. */
router.get('/', G.isLogged, function(req, res, next) {

  res.render('index', { title: coreConfig.get('title') });
  
});

module.exports = router;
