var db = require('../database');
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  db.images.find(function(err,images){
    var data = JSON.stringify(images);
    res.render('index', {
      appData: data
    });
  });
});
/*router.get('/images', function(req,res){
  res.json('asd');
});*/


module.exports = router;
