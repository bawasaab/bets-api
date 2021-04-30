var express = require('express');
var router = express.Router();
var AuthController = require('../controllers').AuthController;
const AuthControllerObj = new AuthController();
let usersPath = 'public/images/uploads/users';

router.post('/signUp', [
  AuthControllerObj.signUp
]);

router.post('/signIn', [
  AuthControllerObj.signIn
]);

router.post('/signOut', [
  AuthControllerObj.signOut
]);

module.exports = router;