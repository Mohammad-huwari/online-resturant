const menuItem = require('../models/menuItemModel');
const catchasync = require('../utils/cacthAsync');
const AppError = require('../utils/AppError');

exports.createMenuItem = catchasync(async (req, res) => {
  const newItem = await menuItem.create(req.body);

  res.status(200).json({
    status: 'success',
    data: {
      item: newItem,
    },
  });
});

exports.updateItem = catchasync(async (req, res, next) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return next(new AppError('Invalid ID format!', 400));
  }

  const item = await menuItem.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!item) {
    return next(new AppError('No item found with this id ⭕', 404));
  }

  res.status(200).json({
    status: 'success',
    data: {
      item,
    },
  });
});

exports.deleteMenuItem = catchasync(async (req, res, next) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return next(new AppError('Invalid ID format!', 400));
  }

  const item = await menuItem.findByIdAndDelete(req.params.id);

  if (!item) {
    return next(new AppError('No item found with this id !', 404));
  }

  res.status(200).json({
    status: 'success',
    data: null,
    message: 'item deleted successfully 👍',
  });
});

exports.getAllItems = catchasync(async (req, res, next) => {
  const items = await menuItem.find();

  res.status(200).json({
    status: 'success',
    result: items.length,
    data: {
      items,
    },
  });
});

exports.getItem = catchasync(async (req, res, next) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return next(new AppError('Invalid ID format!', 400));
  }

  const item = await menuItem.findById(req.params.id);

  if (!item) {
    return next(new AppError('no item found with this id ⭕', 404));
  }

  res.status(200).json({
    status: 'success',
    data: {
      item: item,
    },
  });
});
