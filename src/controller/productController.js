const Product = require('../models/productsModel');
const Category = require('../models/categoryModel');
const createError = require('http-errors');
const path = require('path');
const multer = require('multer');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/images'); // Tạo thư mục public/images
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

const addProduct = async (req, res, next) => {
  try {
    const status = 'moi';
    // them san pham moi vao database
    const newProduct = new Product({
      name: req.body.name,
      price: req.body.price,
      description: req.body.description,
      categoryId: req.body.categoryId,
      status: status,
    });
    const product = await newProduct.save();
    res.status(res.statusCode).json(product);
  } catch (error) {
    if (error instanceof createError) {
      next(createError(error.status, error.message));
      return;
    }
    next(error);
  }
};

const updateProduct = async (req, res, next) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(product);
  } catch (error) {
    if (error instanceof createError) {
      next(createError(error.status, error.message));
      return;
    }
    next(error);
  }
};

const deleteProduct = async (req, res, next) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    res.status(res.statusCode).json(product);
  } catch (error) {
    if (error instanceof createError) {
      next(createError(error.status, error.message));
      return;
    }
    next(error);
  }
};

const getAllProducts = async (req, res, next) => {
  try {
    const products = await Product.find();
    res.status(res.statusCode).json(products);
  } catch (error) {
    if (error instanceof createError) {
      next(createError(error.status, error.message));
      return;
    }
    next(error);
  }
};

const getProductById = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);
    res.status(res.statusCode).json(product);
  } catch (error) {
    if (error instanceof createError) {
      next(createError(error.status, error.message));
      return;
    }
    next(error);
  }
};

const getAllProductsFeatured = async (req, res, next) => {
  try {
    const productFeatured = await Product.findOne({ isFeatured: true });
    res.status(res.statusCode).json(productFeatured);
  } catch (error) {
    if (error instanceof createError) {
      next(createError(error.status, error.message));
      return;
    }
    next(error);
  }
};

const getProductByStatus = async (req, res, next) => {
  try {
    const products = await Product.find({ status: req.params.status });
    res.status(res.statusCode).json(products);
  } catch (error) {
    if (error instanceof createError) {
      next(createError(error.status, error.message));
      return;
    }
    next(error);
  }
};

const getProductByCategoryId = async (req, res, next) => {
  try {
    const products = await Product.find({ categoryId: req.params.category });
    res.json(products);
  } catch (error) {
    if (error instanceof createError) {
      next(createError(error.status, error.message));
      return;
    }
    next(error);
  }
};

module.exports = {
  addProduct,
  updateProduct,
  deleteProduct,
  getAllProducts,
  getProductById,
  getAllProductsFeatured,
  getProductByCategoryId,
};
