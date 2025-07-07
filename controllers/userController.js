const User = require('../models/userModel');
const authController = require('../controllers/authController');
const AppError = require('../utils/AppError');
const cacthAsync = require('../utils/cacthAsync');
const { createSendToken } = require('./authController');

exports.getAllUsers = cacthAsync(async (req, res) => {
  const users = await User.find();

  res.status(200).json({
    status: 'success',
    result: users.length,
    data: {
      users,
    },
  });
});

exports.getUser = cacthAsync(async (req, res, next) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return next(new AppError('Invalid ID format!', 400));
  }

  const user = await User.findById(req.params.id);

  if (!user) {
    return next(new AppError('No user found with this id !', 404));
  }

  res.status(200).json({
    status: 'success',
    data: {
      user: user,
    },
  });
});

exports.deleteUser = cacthAsync(async (req, res, next) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return next(new AppError('Invalid ID format!', 400));
  }

  const user = await User.findByIdAndDelete(req.params.id);

  if (!user) {
    next(new AppError('No user found with this id ! ', 404));
  }

  res.status(200).json({
    status: 'success',
    data: null,
    message: 'user deleted successfully',
  });
});
