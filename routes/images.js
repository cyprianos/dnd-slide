var db = require('../database');
var express = require('express');
var router = express.Router();

router.get('/', function(req,res){
  db.images.find(function(err, images) {
    if (err) return;
    res.json(images);
  });
});

router.get('/:id', function(req,res) {
  var id = db.ObjectId(req.params.id);
  console.log("siema" + id);
  db.images.findOne({ "_id": id }, function(err,image){
    if(err) return;
    res.json(image);
  });
    
});

router.post('/', function(req,res){
  res.json(req.body);
  db.images.save(req.body);
});

module.exports = router;
