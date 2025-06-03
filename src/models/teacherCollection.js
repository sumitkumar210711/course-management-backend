const mongoose = require('mongoose');

const teacherCollection = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users',
    required: true
  },
  phone: {
    type: Number,
    trim: true
  },
  courseCount: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('teacher', teacherCollection);
