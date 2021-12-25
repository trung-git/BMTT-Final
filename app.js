const express = require('express');
const cookieSession = require('cookie-session');
const cookieParser = require('cookie-parser');
const passport = require('passport');
const mongoSanitize = require('express-mongo-sanitize');
const path = require('path');
const rateLimit = require('express-rate-limit');
const app = express();

//Controller
const errorController = require('./controllers/errorController');
//Router
const userRouter = require('./routes/userRoutes');
const noteRouter = require('./routes/noteRoutes');
const viewRouter = require('./routes/viewRoutes');
//Set up
const limiter = rateLimit({
  max: 20,
  windowMs: 2 * 60 * 1000,
  message: 'Too many request from this IP, please try again in an hour !',
});
// set the view engine to ejs
app.set('view engine', 'ejs');
app.use(cookieParser());
app.use(
  cookieSession({
    name: 'session',
    keys: ['/* secret keys */'],

    // Cookie Options
    maxAge: 24 * 60 * 60 * 1000, // 24 hours
  })
);
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));
app.use(express.json({ limit: '10kb' }));
app.use(passport.initialize());
app.use(passport.session());
app.use(limiter);
app.use(mongoSanitize());

//Route
app.use('/api/v1/users', userRouter);
app.use('/api/v1/notes', noteRouter);
app.use('/', viewRouter);
//Handle Err
app.all('*', (req, res, next) => {
  // next(new AppError(`Not found ${req.originalUrl}`, 404));
  res.send('404-Not Found');
});
app.use(errorController);

module.exports = app;
