const express = require('express');
const { assignCourseToStudents } = require('../controllers/studentCourseController');
const router = express.Router();
const {auth} = require('../middleware/authMiddleware');

router.post('/courses/:id/assign-students', auth, assignCourseToStudents);

module.exports = router;
