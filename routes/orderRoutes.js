const express = require('express');
const order = require('../models/orderModel');
const authController = require('../controllers/authController');
const orderController = require('../controllers/orderController');

const router = express.Router();

// public Routes
router.post('/', authController.protect, orderController.createOrder);

router.get('/my-orders', authController.protect, orderController.getMyOrders);

router.delete('/:id', authController.protect, orderController.deleteOrder);

// Admin routs
router.get(
  '/',
  authController.protect,
  authController.restrictTo('admin'),
  orderController.getAllOrders
);

router.patch(
  '/:id/status',
  authController.protect,
  authController.restrictTo('admin'),
  orderController.updateOrderStatus
);

module.exports = router;
