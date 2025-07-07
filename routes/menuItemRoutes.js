const express = require('express');
const menuItemController = require('../controllers/menuItemController');
const authController = require('../controllers/authController');
const { route } = require('./authRoutes');

const router = express.Router();

// public Routes
router.get('/', menuItemController.getAllItems);

router.get('/:id', menuItemController.getItem);

// Admin Routes
router.post(
  '/',
  authController.protect,
  authController.restrictTo('admin'),
  menuItemController.createMenuItem
);

router.delete(
  '/:id',
  authController.protect,
  authController.restrictTo('admin'),
  menuItemController.deleteMenuItem
);

router.patch(
  '/:id',
  authController.protect,
  authController.restrictTo('admin'),
  menuItemController.updateItem
);

module.exports = router;
