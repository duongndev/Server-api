const bcrypt = require('bcrypt');
const User = require('../models/userModel');
const createError = require('http-errors');

// Register a new user
const register = async (req, res, next) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    const newUser = new User({
      fullName: req.body.fullName,
      email: req.body.email,
      password: hashedPassword,
    });

    const user = await newUser.save();
    res.status(200).json(user);
  } catch (error) {
    if (error instanceof createError) {
      next(createError(error.status, error.message));
      return;
    }
    next(error);
  }
};

// Login user
const login = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });

    if (!user) throw createError(404, 'User not found');

    const vaildPassword = await bcrypt.hash(req.body.password, user.password);
    if(!vaildPassword) throw createError(400, 'Wrong password');

    res.status(200).json(user);

  } catch (error) {
    if (error instanceof createError) {
      next(createError(error.status, error.message));
      return;
    }
    next(error);
  }
};

const loginAdmin = async (req, res, next) => {
  try {

    const user = await User.findOne({ email: req.body.email });
    if (!user) throw createError(404, 'User not found');

    const vaildPassword = await bcrypt.hash(req.body.password, user.password);
    if(!vaildPassword) throw createError(400, 'Wrong password');

    if (!user.isAdmin) throw createError(400, 'You are not an admin');

    res.status(200).json(user);

  } catch (error) {
    if (error instanceof createError) {
      next(createError(error.status, error.message));
      return;
    }
    next(error);
  }
};

module.exports = { register, login, loginAdmin };
