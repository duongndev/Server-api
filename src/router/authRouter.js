const router = require('express').Router();
const authController = require('../controller/authController');

router.post('/register', authController.register);

router.post('/login', authController.login);

router.post('/loginAdmin', authController.loginAdmin);

module.exports = router;