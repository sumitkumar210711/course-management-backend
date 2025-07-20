const mongoose = require('mongoose');

const mappingSCCollection = new mongoose.Schema({
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'student',
    required: true
  },
  courseId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'course',
    required: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('studentCourseMapping', mappingSCCollection);
