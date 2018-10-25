var express = require('express');
var router = express.Router();
const userController = require('../controllers/userController')
const midleware = require('../midleware/auth')

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('User Route');
});

router.get('/show', userController.showAllUser)
router.get('/show/profile',midleware.isLogin, userController.showProfile)
router.post('/register', userController.register)
router.post('/register/admin', userController.registerAdmin)
router.post('/login', userController.login)
router.delete('/delete/user/:id',midleware.isLogin, midleware.isAdmin, userController.deleteProfile)


module.exports = router;
