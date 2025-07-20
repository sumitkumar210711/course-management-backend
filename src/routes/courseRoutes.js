const express = require('express');
const router = express.Router();
const { createCourseController, viewCoursesController } = require('../controllers/courseController');
const {auth} = require('../middleware/authMiddleware');

router.post('/courses', auth, createCourseController);
router.get('/view-courses',auth, viewCoursesController );


module.exports = router;
