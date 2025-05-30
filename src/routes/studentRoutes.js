const express = require('express');

const  studentController  = require('../controllers/studentController');

const router = express.Router();
const { auth } = require('../middleware/authMiddleware');

router.post('/students', auth, studentController.registerStudentController);





router.get('/get-students', auth, studentController.getAllStudentsController);

module.exports = router;

