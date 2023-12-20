const router = require('express').Router();
const categoryController = require('../controller/categoryController');


router.get('/', categoryController.getAllCategories);

router.get('/id=:id', categoryController.getCategoryById);

router.post('/addCategory', categoryController.addCategory);

router.put('/id=:id', categoryController.updateCategory);

router.delete('/id=:id', categoryController.deleteCategory);

module.exports = router;