const router = require('express').Router();
const viewController = require('../controllers/viewController');
const authController = require('../controllers/authController');
const passport = require('passport');
const Note = require('../models/noteModel');
require('../passport-setup');
router.get(
  '/auth/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

router.get(
  '/auth/google/callback',
  passport.authenticate('google', {
    failureRedirect: '/fail',
    successRedirect: '/home',
  })
);
router.get('/logout', (req, res) => {
  req.session = null;
  req.logout();
  res.cookie('jwt', 'logout', {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true,
  });
  res.redirect('/');
});
router.get('/fail', (req, res) => {
  res.status(400).send('Login fail!');
});

router.get('/', viewController.isLogin2, viewController.index);
router.get('/register', viewController.isLogin2, viewController.register);
router.get('/login', viewController.isLogin2, viewController.login);
router.get('/home', viewController.isLogin1, viewController.home);
router.get(
  '/notes/:id',
  viewController.isLogin1,
  async (req, res, next) => {
    try {
      if (!req.params.id || !(await Note.findById(req.params.id))) {
        return res.render('error');
      }
      next();
    } catch (error) {
      return res.render('error');
    }
  },
  viewController.edit
);
module.exports = router;
