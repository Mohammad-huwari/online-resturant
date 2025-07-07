const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');

app.use(cookieParser());

app.use(express.json());

const authRouter = require('./routes/authRoutes');
const userRouter = require('./routes/userRoutes');
const menuItemRouter = require('./routes/menuItemRoutes');
const orderRouter = require('./routes/orderRoutes');

// console.log('app loaded');

app.get('/', (req, res) => {
  res.send('API is working!');
});

app.use('/api/v1/auth', authRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/menu', menuItemRouter);
app.use('/api/v1/order', orderRouter);

// console.log(authRouter);

module.exports = app;
