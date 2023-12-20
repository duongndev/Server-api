const Category = require('../models/categoryModel');
const createError = require('http-errors');

const addCategory = async (req, res, next) => {
  try {
    const newCategory = new Category({
      name: req.body.name,
    });
    const category = await newCategory.save();
    res.status(res.statusCode).json(category);
  } catch (error) {
    if (error instanceof createError) {
      next(createError(error.status, error.message));
      return;
    }
    next(error);
  }
};

const updateCategory = async (req, res, next) => {
  try {
    const category = await Category.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(res.statusCode).json(category);
  } catch (error) {
    if (error instanceof createError) {
      next(createError(error.status, error.message));
      return;
    }
    next(error);
  }
};

const deleteCategory = async (req, res, next) => {
  try {
    const category = await Category.findByIdAndDelete(req.params.id);
    res.status(res.statusCode).json(category);
  } catch (error) {
    if (error instanceof createError) {
      next(createError(error.status, error.message));
      return;
    }
    next(error);
  }
};

const getAllCategories = async (req, res, next) => {
  try {
    const categories = await Category.find();

    res.status(res.statusCode).json(categories);
  } catch (error) {
    if (error instanceof createError) {
      next(createError(error.status, error.message));
      return;
    }
    next(error);
  }
};

const getCategoryById = async (req, res, next) => {
  try {
    const category = await Category.findById(req.params.id);
    res.status(res.statusCode).json(category);
  } catch (error) {
    if (error instanceof createError) {
      next(createError(error.status, error.message));
      return;
    }
    next(error);
  }
};

module.exports = { addCategory, updateCategory, deleteCategory, getAllCategories, getCategoryById };
