var express = require('express');
var router = express.Router();
const userRoute = require('./users')
const User = require('../models/user')
const Like = require('../models/like')


/* GET home page. */
router.get('/', function(req, res, next) {
  res.send('Project Blog');
});

router.get('/youtube/like', )

router.use('/users', userRoute)

module.exports = router;
