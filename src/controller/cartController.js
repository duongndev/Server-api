const Cart = require('../models/cartModel');
const createError = require('http-errors');

const addCart = async (req, res, next) => {
    try {
        const cart = await Cart.create(req.body);
        res.status(res.statusCode).json(cart);
    } catch (error) {
        if (error instanceof createError) {
            next(createError(error.status, error.message));
            return;
        }
        next(error);
    }
};

const updateCart = async (req, res, next) => {
    try {
        const cart = await Cart.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json(cart);
    } catch (error) {
        if (error instanceof createError) {
            next(createError(error.status, error.message));
            return;
        }
        next(error);
    }
};

const deleteCart = async (req, res, next) => {
    try {
        const cart = await Cart.findByIdAndDelete(req.params.id);
        res.status(res.statusCode).json(cart);
    } catch (error) {
        if (error instanceof createError) {
            next(createError(error.status, error.message));
            return;
        }
        next(error);
    }
};

const getAllCarts = async (req, res, next) => {
    try {
        const carts = await Cart.find();
        res.status(res.statusCode).json(carts);
    } catch (error) {
        if (error instanceof createError) {
            next(createError(error.status, error.message));
            return;
        }
        next(error);
    }
};

const getCartByUserId = async (req, res, next) => {
    try {
        const carts = await Cart.find({ userId: req.params.userId });
        res.send({
            status: res.statusCode,
            message: 'Get all carts successfully',
            data: carts
        });
    } catch (error) {
        if (error instanceof createError) {
            next(createError(error.status, error.message));
            return;
        }
        next(error);
    }
};

module.exports = {
    addCart,
    updateCart,
    deleteCart,
    getAllCarts,
    getCartByUserId,
}
