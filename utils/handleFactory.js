const catchAsync = require('./catchAsync');
const AppError = require('./appError');
const sanitize = require('mongo-sanitize');

module.exports.createOne = (Model) => {
  return catchAsync(async (req, res, next) => {
    const doc = await Model.create(sanitize(req.body));
    res.status(201).json({
      status: 'success',
      data: {
        data: doc,
      },
    });
  });
};

module.exports.getOne = (Model, populateOptions) => {
  return catchAsync(async (req, res, next) => {
    let query = Model.findById(sanitize(req.params.id));
    if (populateOptions) {
      query = query.populate(populateOptions);
    }

    const doc = await query;
    if (!doc) return next(new AppError('Document not found !', 404));

    res.status(200).json({
      status: 'success',
      data: {
        doc,
      },
    });
  });
};

module.exports.updateOne = (Model) => {
  return catchAsync(async (req, res, next) => {
    const doc = await Model.findByIdAndUpdate(
      sanitize(req.params.id),
      sanitize(req.body),
      {
        new: true,
        runValidators: true,
      }
    );
    if (!doc) return next(new AppError('Document not found !', 404));
    res.status(200).json({
      status: 'success',
      data: {
        doc,
      },
    });
  });
};

module.exports.deleteOne = (Model) => {
  return catchAsync(async (req, res, next) => {
    const doc = await Model.findByIdAndDelete(sanitize(req.params.id));

    if (!doc) return next(new AppError('Document not found !', 404));

    res.status(200).json({
      status: 'success',
      data: doc,
    });
  });
};

module.exports.getAll = (Model) => {
  return catchAsync(async (req, res, next) => {
    const doc = await Model.find({});
    if (doc.length === 0) return next(new AppError('Document is empty !', 404));
    res.status(200).json({
      status: 'success',
      results: doc.length,
      data: doc,
    });
  });
};
