const { createCourseRepository } = require('../repositories/courseRepository');

const createCourseService = async (courseData) => {
  try {
    const result = await createCourseRepository(courseData);
    return result;
  } catch (error) {
    throw error;
  }
};

module.exports = { createCourseService };
