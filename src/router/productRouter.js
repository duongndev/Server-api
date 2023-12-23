const router = require('express').Router();
const productController = require('../controller/productController');

const path = require('path');
const multer = require('multer');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/images'); // Tạo thư mục public/images nếu chưa tồn tại
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

router.get('/', productController.getAllProducts);

router.get('/id/:id', productController.getProductById);

router.get('/featured', productController.getAllProductsFeatured); 

router.get('/category/:category', productController.getProductByCategoryId);

router.post('/addProduct', productController.addProduct);

router.put('/:id', productController.updateProduct);

router.delete('/:id', productController.deleteProduct);

module.exports = router;
