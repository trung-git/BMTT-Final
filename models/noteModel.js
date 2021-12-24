const mongoose = require('mongoose');
const noteSchema = mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Note must have a title'],
  },
  content: {
    type: String,
    required: [true, 'Note must have a content'],
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: [true, 'Note must belong to a user'],
  },
});

const Note = mongoose.model('Note', noteSchema);
module.exports = Note;
