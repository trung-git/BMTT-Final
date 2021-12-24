const router = require('express').Router();
const authController = require('../controllers/authController');
const noteController = require('../controllers/noteController');

const Note = require('../models/noteModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const checkNote = catchAsync(async (req, res, next) => {
  const note = await Note.findOne({ _id: req.params.id });
  // console.log(req.user);
  // console.log(note);

  if (note.user.toString() === req.user._id.toString()) return next();
  else {
    return next(new AppError('This note is not yours !', 400));
  }
});

router.use(authController.protect);
router.get('/', noteController.getAllNoteOfUser);
router.post(
  '/',
  (req, res, next) => {
    req.body.user = req.user._id;
    // console.log(req.user);
    next();
  },
  noteController.createNote
);
router.get('/:id', checkNote, noteController.getNote);
router.patch('/:id', checkNote, noteController.updateNote);
router.delete('/:id', checkNote, noteController.deleteNote);
//Check notes is your note
module.exports = router;
