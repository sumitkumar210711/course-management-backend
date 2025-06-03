const express = require('express');
const router = express.Router();
const {
  getCoursesByTeacherId,
  getStudentsByTeacherId,
  getCoursesByStudentId,
  getTeacherByStudentId,
} = require('../controllers/mappingController');

const { auth } = require('../middleware/authMiddleware');


router.get('/teachers/:id/courses', auth, getCoursesByTeacherId);


router.get('/teachers/:id/students', auth, getStudentsByTeacherId);


router.get('/students/:id/courses', auth, getCoursesByStudentId);


router.get('/students/:id/teacher', auth, getTeacherByStudentId);

module.exports = router;
