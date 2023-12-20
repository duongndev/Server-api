const router = require('express').Router();
const cartController = require('../controller/cartController');

router.post('/addCart', cartController.addCart);

router.put('/id=:id', cartController.updateCart);

router.delete('/id=:id', cartController.deleteCart);

router.get('/', cartController.getAllCarts);

router.get('/getCartByUserId/:userId', cartController.getCartByUserId);

module.exports = router;