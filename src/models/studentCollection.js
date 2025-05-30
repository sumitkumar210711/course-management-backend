const mongoose = require('mongoose');

const studentCollection = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users',
    required: true
  },
  phone: {
    type: Number,
    trim: true
  }
  
}, {
  timestamps: true
});

module.exports = mongoose.model('student', studentCollection);
