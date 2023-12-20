const router = require('express').Router();
const userController = require('../controller/userController');

router.get('/', userController.getAllUsers);

router.get('/id=:id', userController.getUserById);

router.put('/id=:id', userController.updateUser);

router.delete('/id=:id', userController.deleteUser);

module.exports = router;