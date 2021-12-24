const Note = require('../models/noteModel');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');
const factory = require('../utils/handleFactory');
const sanitize = require('mongo-sanitize');
exports.createNote = factory.createOne(Note);
exports.getNote = factory.getOne(Note);
exports.updateNote = factory.updateOne(Note);
exports.deleteNote = factory.deleteOne(Note);
exports.getAllNote = factory.getAll(Note);
exports.getAllNoteOfUser = catchAsync(async (req, res, next) => {
  const notes = await Note.find({ user: sanitize(req.user.id) });
  res.status(200).json({
    status: 'success',
    data: notes,
  });
});
