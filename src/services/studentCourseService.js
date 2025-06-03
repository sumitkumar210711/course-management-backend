const { assignCourseToStudentsRepo } = require('../repositories/studentCourseRepository');

const assignCourseToStudentsService = async (courseId, studentIds) => {
  const mappings = await assignCourseToStudentsRepo(courseId, studentIds);
  return mappings;
};

module.exports = { assignCourseToStudentsService };
