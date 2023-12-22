const express = require('express');
const mongoose = require('mongoose');
const app = express();
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const createError = require('http-errors');
require('dotenv').config();

// View engine setup
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// Connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URI, {
    dbName: process.env.DB_NAME,
    user: process.env.DB_USER,
    pass: process.env.DB_PASS,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('Mongoose Connected....');
  })
  .catch((err) => {
    console.log(err.message);
  });

// Define Routes
const authRouter = require('./src/router/authRouter');
const categoryRouter = require('./src/router/categoryRouter');
const productRouter = require('./src/router/productRouter');
const userRouter = require('./src/router/userRouter');
const cartRouter = require('./src/router/cartRouter');

app.use('/auth', authRouter);
app.use('/category', categoryRouter);
app.use('/product', productRouter);
app.use('/user', userRouter);
app.use('/cart', cartRouter);


app.get('/', (req, res) => {
  res.sendFile('error.html', { root: path.join(__dirname, 'views') });
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404, 'Not Found'));
});

app.use((error, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = error.message;
  res.locals.error = req.app.get('env') === 'development' ? error : {};

  // render the error page
  res.status(error.status || 500);
  res.send({
    error: {
      status: error.status || 500,
      message: error.message,
    },
  });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
})
