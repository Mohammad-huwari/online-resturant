const mongoose = require('mongoose');

const menuItemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'dish must have a name'],
    unique: true,
    trim: true,
  },
  description: {
    type: String,
    trim: true,
  },
  price: {
    type: Number,
    required: [true, 'dish must have a price'],
  },
  category: {
    type: String,
    enum: ['starter', 'main', 'dessert', 'drink'],
    default: 'main',
  },
  available: {
    type: Boolean,
    default: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

const menuItem = mongoose.model('menuItem', menuItemSchema);

module.exports = menuItem;
