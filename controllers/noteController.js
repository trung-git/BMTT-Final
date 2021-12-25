const Note = require('../models/noteModel');
const catchAsync = require('../utils/catchAsync');
const factory = require('../utils/handleFactory');
exports.createNote = factory.createOne(Note);
exports.getNote = factory.getOne(Note);
exports.updateNote = factory.updateOne(Note);
exports.deleteNote = factory.deleteOne(Note);
exports.getAllNote = factory.getAll(Note);
exports.getAllNoteOfUser = catchAsync(async (req, res, next) => {
  const notes = await Note.find({ user: req.user.id });
  res.status(200).json({
    status: 'success',
    data: notes,
  });
});
