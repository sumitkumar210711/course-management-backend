const express = require('express');

const router = express.Router();
const  {auth}  = require('../middleware/authMiddleware');
const teacherController = require('../controllers/teacherController');

router.post('/teachers', auth, teacherController.registerTeacherController);



router.get('/get-teachers', auth, teacherController.getAllTeachersController);




router.post('/teachers/:id/assign-students', auth, teacherController.assignStudentsController);

module.exports = router;


module.exports = router;
