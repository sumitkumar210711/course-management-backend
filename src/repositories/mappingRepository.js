const course = require('../models/courseCollection');
const studentCourseMapping = require('../models/mappingSCCollection');
const mappingStudentTeacher = require('../models/mappingSTCollection');
const student = require('../models/studentCollection');
const teacher = require('../models/teacherCollection');
const users = require('../models/userCollection');
/**
 * Get courses by teacherId directly from Course model
 */
const getCoursesByTeacherIdRepo = async (teacherId) => {
  return await course.find({ teacherId }).lean();
};


const getStudentsByTeacherIdRepo = async (teacherId) => {
  try {
    // Step 1: Get student-teacher mappings and populate student + user info
    const mappings = await mappingStudentTeacher.find({ teacherId }).populate({
      path: 'studentId',
      populate: {
        path: 'user',
        select: 'name email'
      }
    });

    // Step 2: Extract valid student objects
    const students = mappings
      .map(m => m.studentId)
      .filter(std => std && std.user); // Remove null/invalid ones

    // Step 3: For each student, count courses from studentCourseMapping
    const studentDataWithCourseCount = await Promise.all(
      students.map(async (std) => {
        const courseCount = await studentCourseMapping.countDocuments({ studentId: std._id });
        return {
          _id: std._id,
          phone: std.phone,
          user: std.user, // contains name, email
          courses_Enrolled: courseCount
        };
      })
    );

    return studentDataWithCourseCount;

  } catch (error) {
    console.error('Error fetching students with courses:', error);
    throw error;
  }
};

/**
 * Get courses a student is enrolled in via mappingSC
 */
const getCoursesByStudentIdRepo = async (studentId) => {
  const mappings = await studentCourseMapping.find({ studentId }).populate('courseId');
  return mappings.map(m => m.courseId);
};

const getTeacherByStudentIdRepo = async (studentId) => {
  try {
    // Step 1: Get all teacher mappings for the student
    const teacherMappings = await mappingStudentTeacher.find({ studentId }).populate({
      path: 'teacherId',
      populate: {
        path: 'user',
        select: 'name email'
      }
    });

    const teacherIds = teacherMappings
      .map(mapping => mapping.teacherId?._id)
      .filter(Boolean); // remove null/undefined

    // Step 2: Get all courses taught by those teachers
    const courses = await course.find({ teacherId: { $in: teacherIds } })
      .populate({
        path: 'teacherId',
        populate: {
          path: 'user',
          select: 'name email'
        }
      })
      .select('title teacherId');

    // Step 3: Format response
    const result = courses.map(c => ({
      courseTitle: c.title,
      courseId: c._id,
      teacher: {
        id: c.teacherId?._id,
        phone: c.teacherId?.phone,
        name: c.teacherId?.user?.name,
        email: c.teacherId?.user?.email
      }
    }));

    return result;
  } catch (error) {
    console.error('Error fetching courses by student ID:', error);
    throw error;
  }
};


const assignCoursesToStudent = async (studentId, courseIds) => {
  try {
    // Step 1: Get existing mappings for the student & courseIds
    const existingMappings = await studentCourseMapping.find({
      studentId,
      courseId: { $in: courseIds }
    }).select('courseId');

    // Step 2: Filter out already assigned courseIds
    const existingCourseIds = existingMappings.map(m => m.courseId.toString());
    const newCourseIds = courseIds.filter(
      id => !existingCourseIds.includes(id.toString())
    );

    // Step 3: Build new mapping documents
    const assignments = newCourseIds.map(courseId => ({
      studentId,
      courseId
    }));

    if (assignments.length === 0) {
      return { message: 'No new courses to assign', assigned: 0 };
    }

    // Step 4: Insert new assignments
    const result = await studentCourseMapping.insertMany(assignments);
    return { message: 'Courses assigned', assigned: result.length };
  } catch (error) {
    throw new Error('Error assigning courses to student: ' + error.message);
  }
};



module.exports = {
  getCoursesByTeacherIdRepo,
  getStudentsByTeacherIdRepo,
  getCoursesByStudentIdRepo,
  getTeacherByStudentIdRepo,
  assignCoursesToStudent
};
