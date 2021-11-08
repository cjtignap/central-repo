const express = require('express');
const router = express.Router();
const authController = require('../controller/authController');
router.post('/signup',authController.signup_post);
router.post('/login',authController.login_post);
router.get('/logout',authController.logout_get);
router.get('/isLoggedIn',authController.is_loggedin);
module.exports = router;