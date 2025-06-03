const { assignCourseToStudentsService } = require('../services/studentCourseService');

const assignCourseToStudents = async (req, res) => {
  const courseId = req.params.id;
  const { students } = req.body;

  if (!courseId || !Array.isArray(students) || students.length === 0) {
    return res.status(400).json({ error: 'Course ID and students array are required.' });
  }

  try {
    const result = await assignCourseToStudentsService(courseId, students);
    res.status(200).json({ message: 'Students assigned to course successfully', data: result });
  } catch (error) {
    console.error('Error assigning students to course:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

module.exports = { assignCourseToStudents };
