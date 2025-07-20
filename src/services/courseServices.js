const { createCourseRepository, viewCourses } = require('../repositories/courseRepository');

const createCourseService = async (courseData) => {
  try {
    const result = await createCourseRepository(courseData);
    return result;
  } catch (error) {
    throw error;
  }
};

const viewCourseService = async()=>{
  try{
    const courseDetails = await viewCourses(); 
    return courseDetails;

  }catch(error){

    throw error;

  }
}

module.exports = { createCourseService, viewCourseService };
