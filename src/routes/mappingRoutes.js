const express = require('express');
const router = express.Router();
const {
  getCoursesByTeacherId,
  getStudentsByTeacherId,
  getCoursesByStudentId,
  getTeacherByStudentId,
  assignCourseToStudent
} = require('../controllers/mappingController');

const { auth } = require('../middleware/authMiddleware');


router.get('/teachers/:id/courses', auth, getCoursesByTeacherId);


router.get('/teachers/:id/students', auth, getStudentsByTeacherId);


router.get('/students/:id/courses', auth, getCoursesByStudentId);


router.get('/students/:id/teacher', auth, getTeacherByStudentId);

router.post('/student/assign-courses', auth, assignCourseToStudent);

module.exports = router;
