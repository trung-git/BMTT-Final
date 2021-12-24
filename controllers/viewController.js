const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');
const { promisify } = require('util');
const jwt = require('jsonwebtoken');
const Note = require('./../models/noteModel');
const User = require('./../models/userModel');
const sanitize = require('mongo-sanitize');
exports.isLogin1 = async (req, res, next) => {
  try {
    if (req.isAuthenticated()) {
      res.locals.user = req.user;
      return next();
    }
    // let isLogin = true;
    // 1) Getting token and check of it's there
    let token;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer')
    ) {
      token = req.headers.authorization.split(' ')[1];
    } else if (req.cookies.jwt) {
      token = req.cookies.jwt;
    }
    if (!token) {
      // isLogin = false;
      return res.redirect('/login');
    }
    // 2) Verification token
    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
    // 3) Check if user still exists
    const currentUser = await User.findById(decoded.id);
    if (!currentUser) {
      // isLogin = false;
      return res.redirect('/login');
    }

    // 4) Check if user changed password after the token was issued
    if (currentUser.changedPasswordAfter(decoded.iat)) {
      // isLogin = false;
      return res.redirect('/login');
    }
    // if (isLogin) {
    // GRANT ACCESS TO PROTECTED ROUTE
    req.user = currentUser;
    // This is logined user
    res.locals.user = currentUser;
    return next();
    // } else {
    //   return res.redirect('/');
    // }
  } catch (error) {
    res.redirect('/login');
  }
};
exports.isLogin2 = async (req, res, next) => {
  try {
    // 1) Getting token and check of it's there
    let token;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer')
    ) {
      token = req.headers.authorization.split(' ')[1];
    } else if (req.cookies.jwt) {
      token = req.cookies.jwt;
    }

    if (!token) {
      return next();
    }

    // 2) Verification token
    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

    // 3) Check if user still exists
    const currentUser = await User.findById(decoded.id);
    if (!currentUser) {
      return next();
    }

    // 4) Check if user changed password after the token was issued
    if (currentUser.changedPasswordAfter(decoded.iat)) {
      return next();
    }

    // GRANT ACCESS TO PROTECTED ROUTE
    req.user = currentUser;
    // This is logined user
    res.locals.user = currentUser;
    next();
  } catch (error) {
    next();
  }
};
exports.login = catchAsync(async (req, res, next) => {
  if (req.user) {
    res.locals.user = req.user;
    res.redirect('/home');
  } else {
    return res.render('login');
  }
});
exports.index = catchAsync(async (req, res, next) => {
  if (req.user) {
    res.locals.user = req.user;
    res.redirect('/home');
  } else {
    return res.render('');
  }
});
exports.register = catchAsync(async (req, res, next) => {
  if (req.user) {
    res.locals.user = req.user;
    res.redirect('/home');
  } else {
    return res.render('register');
  }
});
exports.home = catchAsync(async (req, res, next) => {
  const notes = await Note.find({ user: req.user._id });
  if (req.user.role === 'admin') {
    const users = await User.find();
    return res.render('admin', { users });
  }
  res.render('user_home', { notes });
});

exports.edit = catchAsync(async (req, res, next) => {
  const note = await Note.findById(sanitize(req.params.id));
  // console.log(note);
  res.render('edit_note', { note });
});
