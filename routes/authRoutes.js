const express = require('express');
const authController = require('../controllers/authController');

const router = express.Router();

// console.log('Router loaded');

// router.get('/check', (req, res) => {
//   res.send('Auth route working!');
// });

router.post('/signup', authController.signup);

router.post('/login', authController.login);

router.patch(
  '/updatePassword',
  authController.protect,
  authController.updatePassword
);

router.get('/forgotPassword', authController.forgotPassword);

router.patch('/resetPassword/:token', authController.resetPassword);

module.exports = router;
