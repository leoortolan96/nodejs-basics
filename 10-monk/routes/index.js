var express = require('express');
var router = express.Router();
var db = require('monk')('localhost:27017/test');
var userData = db.get('user-data');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

router.get('/get-data', function(req, res, next) {
  var resultArray = [];
  var data = userData.find({}).then(((docs) => {
    res.render('index', {items: docs});
  }));
  // data.on('success', function(docs) {
  //   res.render('/', {items: docs});
  // });
});

router.post('/insert', function(req, res, next) {
  var item = {
    title: req.body.title,
    content: req.body.content,
    author: req.body.author
  };
  userData.insert(item);
  res.redirect('/');
});

router.post('/update', function(req, res, next) {
  var item = {
    title: req.body.title,
    content: req.body.content,
    author: req.body.author
  };
  var id = req.body.id;
  userData.update({_id: id}, {$set: item}).then((response) => {
    console.log(response);
    res.redirect('/');
  });
});

router.post('/delete', function(req, res, next) {
  var id = req.body.id;
  userData.remove({_id: id}).then((response) => {
    console.log(response);
    res.redirect('/');
  });
});

module.exports = router;
