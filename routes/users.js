var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  let a = {
    name:'adarsh',
    lastName : 'tiwari'
  }
  res.json(a);
  // res.render('index', { title: 'Users' });

});


router.get('/details/:id', function(req, res, next) {
  let a = {
    id: req.params.id,
    name:'askhay',
    lastName : 'yadav'
  }
  res.send(a);
});

router.post('/create', function(req, res, next) {
  console.log(req.body);
  let name = req.body.name
  
  res.send(name);
});



module.exports = router;
