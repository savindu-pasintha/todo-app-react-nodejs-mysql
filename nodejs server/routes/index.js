var express = require('express');
const puppeter = require('puppeteer');
var router = express.Router();

/* GET home page index.jade kiyn ek . */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Open with nodemon express app http://localhost:.env->PORT' });
});


router.get('/layout', function (req, res, next) {
  res.render('layout', { title: 'Open with nodemon express app' });
});


router.get('/error', function (req, res, next) {
  res.render('error', { title: 'Open with nodemon express app' });
});

module.exports = router;
