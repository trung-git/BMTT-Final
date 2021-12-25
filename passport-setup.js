const passport = require('passport');
const User = require('./models/userModel');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (user, done) {
  done(null, user);
});
passport.use(
  new GoogleStrategy(
    {
      clientID:
        '629885708455-lsf606087p6390ic1ifbprvs2cle2f6v.apps.googleusercontent.com',
      clientSecret: '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',
      callbackURL: '/auth/google/callback',
    },
    async function (accessToken, refreshToken, profile, cb) {
      const user = await User.findOne({ email: profile._json.email });
      if (!user) {
        const newUser = new User({
          name: profile._json.name,
          email: profile._json.email,
          photo: profile._json.picture,
        });
        await newUser.save({ validateBeforeSave: false });
        // console.log({ newUser });
        return cb(null, newUser);
      } else {
        return cb(null, user);
      }
    }
  )
);
