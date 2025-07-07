const Order = require('../models/orderModel');
const menuItem = require('../models/menuItemModel');
const catchAsync = require('../utils/cacthAsync');
const AppError = require('../utils/AppError');
const User = require('../models/userModel');
const mongoose = require('mongoose');
const { findById } = require('../models/userModel');

exports.createOrder = catchAsync(async (req, res, next) => {
  const { items } = req.body;

  if (!items || !Array.isArray(items) || items.length === 0) {
    return next(new AppError('Order must have atleast 1 item', 400));
  }

  let totalPrice = 0;

  for (const item of items) {
    const menuItemDoc = await menuItem.findById(item.menuItem).select('-user');

    if (!menuItemDoc) {
      return next(new AppError(`Menu item not found: ${item.menuItem}`, 404));
    }

    totalPrice += menuItemDoc.price * item.quantity;
  }

  const order = await Order.create({
    user: req.user.id,
    items,
    totalPrice,
  });

  res.status(200).json({
    status: 'success',
    data: {
      order,
    },
  });
});

exports.getAllOrders = catchAsync(async (req, res, next) => {
  const orders = await Order.find();

  if (!orders) {
    return next(new AppError('No orders yet', 404));
  }

  res.status(200).json({
    status: 'success',
    result: orders.length,
    data: {
      orders,
    },
  });
});

exports.getMyOrders = catchAsync(async (req, res, next) => {
  const myOrders = await Order.find({ user: req.user.id });

  if (!myOrders) {
    return next(new AppError('No orders yet', 404));
  }

  res.status(200).json({
    status: 'success',
    results: myOrders.length,
    data: {
      myOrders,
    },
  });
});

exports.deleteOrder = catchAsync(async (req, res, next) => {
  const orderId = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(orderId)) {
    return next(new AppError('Invalid order ID format', 400));
  }

  const order = await Order.findById(orderId);

  if (!order) {
    return next(new AppError('No order with this id', 404));
  }

  if (req.user.role !== 'admin' && order.user.toString() !== req.user.id) {
    return next(new AppError('you dont have the permission to ddo this', 404));
  }

  await Order.findByIdAndDelete(orderId);

  res.status(200).json({
    status: 'success',
    data: null,
    message: 'order deleted successfully ',
  });
});

exports.updateOrderStatus = catchAsync(async (req, res, next) => {
  const orderId = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(orderId)) {
    return next(new AppError('Invalid order ID', 400));
  }

  const order = await Order.findById(orderId);

  if (!order) {
    return next(new AppError('No order found with this id', 404));
  }

  order.status = req.body.status;
  await order.save();

  res.status(200).json({
    status: 'success',
    data: {
      order,
    },
  });
});
