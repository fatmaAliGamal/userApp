var express = require('express');
var router = express.Router();
var db = require('../public/db');

/* GET users listing. */
router.get('/', function(req, res, next) {
  db.find({}, (err, docs) => {
    if (err) {
      res.send(`Error: ${err}`);
    } else {
      res.send(docs);
    }
  });
});

router.get('/list', function(req, res, next) {

  db.find({}, (err, docs) => {
    if (err) {
      res.send(`Error: ${err}`);
    } else {
      res.render('list', {users: docs});
    }
  });
});

router.get('/new', function(req, res, next) {
  
      res.render('add');
});



router.delete('/:id', function(req, res, next) {
  
  db.deleteOne({id: req.params.id}, (err) => {
    if (err) {
      res.send(`Error: ${err}`);
    } else {
      res.send('Deleted!');
    }
  });
});

router.get('/:id/delete', function(req, res, next) {
  
  db.deleteOne({id: req.params.id}, (err) => {
    if (err) {
      res.send(`Error: ${err}`);
    } else {
     // res.send('Deleted!');
     db.find({}, (err, docs) => {
      if (err) {
        res.send(`Error: ${err}`);
      } else {
        res.render('list', {users: docs});
      }
    });
    }
  });
});

router.post('/', function(req, res, next) {
  
  new db(req.body).save((err, docs) => {
    if (err) {
      res.send(`Error: ${err}`);
    } else {
     // res.send(`saved: ${docs}`);
     db.find({}, (err, docs) => {
      if (err) {
        res.send(`Error: ${err}`);
      } else {
        res.render('list', {users: docs});
      }
    });
    }
  });
});

router.post('/:id/edit', function(req, res, next) {
  db.findOneAndUpdate({id: req.params.id}, req.body, (err, docs) => {
    if (err) {
      res.send(`Error: ${err}`);
    } else {
     // res.send(`updated: ${docs}`);
     db.find({}, (err, docs) => {
      if (err) {
        res.send(`Error: ${err}`);
      } else {
        res.render('list', {users: docs});
      }
    });
    }
  });
});

router.get('/:id/edit', function(req, res, next) {
  
  db.find({id: req.params.id}, (err, docs) => {
    if (err) {
      res.send(`Error: ${err}`);
    } else {
      res.render('update', {user: docs[0]});
    }
  });
});

module.exports = router;

