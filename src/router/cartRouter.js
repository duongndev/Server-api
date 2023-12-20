const router = require('express').Router();
const cartController = require('../controller/cartController');

router.get('/', cartController.getAllCarts);

router.get('/:id', cartController.getCartByUserId);

router.post('/addCart', cartController.addCart);

router.put('/:id', cartController.updateCart);

router.delete('/:id', cartController.deleteCart);

module.exports = router;