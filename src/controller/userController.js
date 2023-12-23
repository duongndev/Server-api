const User = require('../models/userModel');
const createError = require('http-errors');

const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (err) {
    if (err instanceof createError) {
      next(createError(err.status, err.message));
      return;
    }
    next(err);
  }
};

const getUserById = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    res.status(200).json(user);
  } catch (err) {
    if (err instanceof createError) {
      next(createError(err.status, err.message));
      return;
    }
    next(err);
  }
};

const updateUser = async (req, res, next) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(user);
  } catch (err) {
    if (err instanceof createError) {
      next(createError(err.status, err.message));
      return;
    }
    next(err);
  }
};

const deleteUser = async (req, res, next) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    res.status(200).json(user);
  } catch (err) {
    if (err instanceof createError) {
      next(createError(err.status, err.message));
      return;
    }
    next(err);
  }
};

module.exports = {
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
};
