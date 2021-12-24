const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, 'User must have a name'],
  },
  email: {
    type: String,
    required: [true, 'User must have an email'],
    unique: true,
    validate: [validator.isEmail, 'Please provide a valid email'],
  },
  //At least 1 letter between lowercase [ a - z ] -> 25%
  //At least 1 letter between uppercase [ A - Z ] -> 25%
  //At least 1 number between [ 0 - 9 ] -> 25%
  //At least 1 character from [ $@#&! ] -> 25%
  password: {
    type: String,
    required: [true, 'Please provide a password'],
    minLength: [6, 'Password must be at least 6, got {VALUE}'],
    validate: {
      validator: function (v) {
        return (
          v.match(/[a-z]+/) &&
          v.match(/[A-Z]+/) &&
          v.match(/[0-9]+/) &&
          v.match(/[$@#&!]+/)
        );
      },
      message: 'Password must be strong',
    },
    select: false,
  },
  passwordConfirm: {
    type: String,
    required: [true, 'Please provide a password confirm'],
    validate: {
      validator: function (v) {
        return v === this.password;
      },
      message: 'Passwords are not the same!',
    },
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user',
  },
  passwordChangedAt: Date,
  passwordResetToken: String,
  passwordResetExpired: Date,
  active: {
    type: Boolean,
    default: true,
  },
});
// userSchema.virtual('notes', {
//   ref: 'Note',
//   foreignField: 'user',
//   localField: '_id',
// });
userSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

userSchema.methods.changedPasswordAfter = function (JWTTimestamp) {
  if (this.passwordChangedAt) {
    const changedTimestamp = parseInt(
      this.passwordChangedAt.getTime() / 1000,
      10
    );

    return JWTTimestamp < changedTimestamp;
  }

  // False means NOT changed
  return false;
};

userSchema.methods.createPasswordResetToken = function () {
  const resetToken = crypto.randomBytes(32).toString('hex');

  this.passwordResetToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex');

  // console.log({ resetToken }, this.passwordResetToken);
  this.passwordResetExpired = Date.now() + 10 * 60 * 1000;

  return resetToken;
};

userSchema.pre('save', async function (next) {
  // Only run this function if password was actually modified
  if (!this.isModified('password')) return next();

  // Hash the password with cost of 12
  this.password = await bcrypt.hash(this.password, 12);

  // Delete passwordConfirm field
  this.passwordConfirm = undefined;
  next();
});

userSchema.pre(/^find/, function (next) {
  this.find({ active: { $ne: false } });
  next();
});

const User = mongoose.model('User', userSchema);
module.exports = User;
