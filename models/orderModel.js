const mongoose = require('mongoose');
const menuItem = require('./menuItemModel');

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: [true, 'Order must belong to a user'],
    },

    items: [
      {
        menuItem: {
          type: mongoose.Schema.ObjectId,
          ref: 'menuItem',
          required: [true, 'Order must contain at least one menu item'],
        },
        quantity: {
          type: Number,
          required: [true, 'Each item must have a quantity'],
          min: [1, 'Quantity must be at least 1'],
          default: 1,
        },
      },
    ],

    totalPrice: {
      type: Number,
      required: [true, 'Order must have a total price'],
    },

    status: {
      type: String,
      enum: ['pending', 'preparing', 'delivered', 'cancelled'],
      default: 'pending',
    },

    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

orderSchema.pre(/^find/, function (next) {
  this.populate('user').populate('items.menuItem');
  next();
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
