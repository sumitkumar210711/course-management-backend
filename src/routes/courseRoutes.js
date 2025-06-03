const express = require('express');
const router = express.Router();
const { createCourseController } = require('../controllers/courseController');
const {auth} = require('../middleware/authMiddleware');

router.post('/courses', auth, createCourseController);

module.exports = router;
