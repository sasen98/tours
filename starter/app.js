const path = require('path');
const express = require('express');
const rateLimit = require('express-rate-limit');
const AppErr = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');
const app = express();
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');
const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');
const reviewRouter = require('./routes/reviewRoutes');

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

/// set security HTTP headers
app.use(helmet());

/// limit request from same api
const limiter = rateLimit({
  /// 100 request from same id in 1 hr
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: 'Too many request from this Ip,please try again in an hour',
});

app.use('/api', limiter);
///body parser, reading data from body into req.body
app.use(express.json({ limit: '10kb' }));

/// data sanitization against nosql query injection
app.use(mongoSanitize());

/// data sanitization against xxs
app.use(xss());

/// prevent parameter pollution
app.use(
  hpp({
    whitelist: [
      'duration',
      'ratingsQuantity',
      'ratingsAverage',
      'maxGroupSize',
      'difficulty',
      'price',
    ],
  })
);

/// mounting a router to a route

app.get('/', (req, res) => {
  res.status(200).render('base', {
    tour: 'The Forest Hiker',
    user: 'Jonas',
  });
});

app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/reviews', reviewRouter); ///reviewRouter is midddleware

app.all('*', (req, res, next) => {
  next(new AppErr(`Can't find ${req.originalUrl} on this server!`, 404));
});
app.use(globalErrorHandler);
module.exports = app;
