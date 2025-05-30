const studentCourseMapping = require('../models/mappingSCCollection');

const assignCourseToStudentsRepo = async (courseId, studentIds) => {
  const result = [];

  for (const studentId of studentIds) {
    const existing = await studentCourseMapping.findOne({ courseId, studentId });

    if (!existing) {
      const newMapping = await studentCourseMapping.create({ courseId, studentId });
      result.push(newMapping);
    }
  }

  return result;
};

module.exports = { assignCourseToStudentsRepo };
