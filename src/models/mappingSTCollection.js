const mongoose = require('mongoose');

const mappingSTCollection = new mongoose.Schema({
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'student',
    required: true
  },
  teacherId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'teacher',
    required: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('mappingStudentTeacher', mappingSTCollection);
