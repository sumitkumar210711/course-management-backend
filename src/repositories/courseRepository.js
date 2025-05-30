const course = require('../models/courseCollection');

const createCourseRepository = async (courseData) => {
  try {
     const existing = await course.findOne({ title: courseData.title });
      if (existing) {
          throw new Error('Course already exists');
        
      }
    
    const newCourse = new course(courseData);

    const savedCourse = await newCourse.save();
    return savedCourse;
  } catch (error) {
    throw error;
  }
};

module.exports = { createCourseRepository };
