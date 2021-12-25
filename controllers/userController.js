const User = require('../models/userModel');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');
const factory = require('../utils/handleFactory');

exports.getMe = (req, res, next) => {
  req.params.id = req.user._id;
  next();
};
const filterObj = (obj, ...allowedFields) => {
  const newObj = {};
  Object.keys(obj).forEach((el) => {
    if (allowedFields.includes(el)) newObj[el] = obj[el];
  });
  return newObj;
};
exports.updateMe = catchAsync(async (req, res, next) => {
  // 1) Create error if user POSTs password data
  if (req.body.password || req.body.passwordConfirm) {
    return next(
      new AppError(
        'This route is not for password updates. Please use /updateMyPassword.',
        400
      )
    );
  }

  // 2) Filtered out unwanted fields names that are not allowed to be updated
  const filteredBody = filterObj(req.body, 'name', 'email');
  // if (req.file) {
  //   filteredBody.photo = req.file.filename;
  // }
  // 3) Update user document
  const updatedUser = await User.findByIdAndUpdate(req.user.id, filteredBody, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    status: 'success',
    data: {
      user: updatedUser,
    },
  });
});
exports.deleteMe = catchAsync(async (req, res, next) => {
  const user = await User.findByIdAndUpdate(
    req.user.id,
    { active: false },
    {
      new: true,
    }
  );

  res.status(200).json({
    status: 'success',
    data: user,
  });
});

// exports.getAllUser = catchAsync(async (req, res, next) => {
//   const user = await User.find();
//   if (user.length === 0) {
//     return next(new AppError('User is empty', 400));
//   }
//   res.status(200).json({
//     status: 'success',
//     results: user.length,
//     data: user,
//   });
// });

// exports.getUser = catchAsync(async (req, res, next) => {
//   const user = await User.findById(req.params.id);

//   if (!user) {
//     return next(new AppError('User is not exist', 400));
//   }

//   res.status(200).json({
//     status: 'success',
//     data: user,
//   });
// });

// exports.updateUser = catchAsync(async (req, res, next) => {
//   const user = User.findByIdAndUpdate(req.params.id, req.body, {
//     runValidators: true,
//     new: true,
//   });
//   res.status(200).json({
//     status: 'success',
//     data: user,
//   });
// });

// exports.deleteUser = catchAsync(async (req, res, next) => {
//   const user = await User.findByIdAndDelete(req.params.id);

//   res.status(200).json({
//     status: 'success',
//     data: user,
//   });
// });
exports.createUser = (req, res) => {
  res.status(400).json({
    status: 'fail',
    message: 'Please use /signup to create User',
  });
};
exports.getUser = factory.getOne(User);
exports.updateUser = factory.updateOne(User);
exports.deleteUser = factory.deleteOne(User);
exports.getAllUser = factory.getAll(User);
