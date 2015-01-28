
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'DnD Gallery' });
});
/*router.get('/images', function(req,res){
  res.json('asd');
});*/


module.exports = router;
