const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const { PerformanceObserverEntryList } = require('perf_hooks');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'please enter your name'],
  },
  email: {
    type: String,
    required: [true, 'please enter your email'],
    unique: [true, 'email already exists'],
    lowercase: true,
    validate: [validator.isEmail, 'please provide a valid email !'],
  },
  password: {
    type: String,
    required: [true, 'please enter your password'],
    minlength: [8, 'the password must be atleast 8 digits '],
    select: false,
  },
  passwordConfirm: {
    type: String,
    required: [true, 'please enter your password confirm'],
    validate: {
      validator: function (val) {
        return val === this.password;
      },
      message: 'Password does not match !',
    },
    select: false,
  },
  role: {
    type: String,
    enum: ['customer', 'admin'],
    default: 'customer',
  },

  passwordResetToken: String,
  passwordResetExpires: Date,
});

userSchema.pre('save', async function (next) {
  // console.log('Is password modified?', this.isModified('password'));
  if (!this.isModified('password')) return next();

  this.password = await bcrypt.hash(this.password, 12);

  this.passwordConfirm = undefined;
  next();
});

userSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword
) {
  console.log('hook is done !!!!');
  return await bcrypt.compare(candidatePassword, userPassword);
};

userSchema.methods.generatePasswordResetToken = function () {
  const resetToken = crypto.randomBytes(32).toString('hex');

  this.passwordResetToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex');

  this.passwordResetExpires = Date.now() + 10 * 60 * 1000;

  return resetToken;
};

const User = mongoose.model('User', userSchema);
module.exports = User;
