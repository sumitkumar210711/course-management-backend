const course = require('../models/courseCollection');

const createCourseRepository = async (courseData) => {
  try {
    // Check if course with same title exists
    const existing = await course.findOne({ title: courseData.title });
    if (existing) {
      throw new Error('Course already exists');
    }

    // Save new course
    const newCourse = new course(courseData);
    const savedCourse = await newCourse.save();

    // Increment courseCount in teacher document
    await teacher.findByIdAndUpdate(
      courseData.teacherId,
      { $inc: { courseCount: 1 } }
    );

    return savedCourse;
  } catch (error) {
    console.error('Error creating course:', error);
    throw error;
  }
};


const viewCourses = async () => {
  try {
    const courseDetails = await course.find(); // Optional: populate teacher info

    const formattedCourses = courseDetails.map(course => ({
      id: course._id,
      title: course.title,
      description: course.description,
      cost: course.cost,
      status: course.status,
      startDate: course.startDate,
      endDate: course.endDate,
      teacherId: course.teacherId, // you can customize this if you want more teacher details
      createdAt: course.createdAt,
      updatedAt: course.updatedAt
    }));

    console.log("courses fetched on Repository", formattedCourses);

    return formattedCourses;
  } catch (error) {
    console.error("Error fetching courses:", error);
    throw error;
  }
};



module.exports = { createCourseRepository, viewCourses };
