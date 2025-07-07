const express = require('express');
const authController = require('../controllers/authController');
const userController = require('../controllers/userController');
const { route } = require('./authRoutes');

const router = express.Router();

router.get('/:id', authController.protect, userController.getUser);

router.get(
  '/',
  authController.protect,
  authController.restrictTo('admin'),
  userController.getAllUsers
);

router.delete(
  '/:id',
  authController.protect,
  authController.restrictTo('admin'),
  userController.deleteUser
);

module.exports = router;
