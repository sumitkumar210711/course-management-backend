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

/**
 * Get students assigned to teacher via mappingST
 */
const getStudentsByTeacherIdRepo = async (teacherId) => {
  try{
    console.log("teacherid",teacherId);
  const mappings = await mappingStudentTeacher.find({ teacherId }).populate({ path: 'studentId', populate: { path: 'user', select: 'name email' } });
  console.log("mappings", mappings);
  return mappings.map(m => m.studentId);
  }catch(error){
    console.log("error", error);
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

/**
 * Get teacher mapped to a student via mappingST
 */
const getTeacherByStudentIdRepo = async (studentId) => {
  const mapping = await mappingStudentTeacher.findOne({ studentId }).populate({ path: 'teacherId', populate: { path: 'user', select: 'name email' } });
  return mapping ? mapping.teacherId : null;
};

module.exports = {
  getCoursesByTeacherIdRepo,
  getStudentsByTeacherIdRepo,
  getCoursesByStudentIdRepo,
  getTeacherByStudentIdRepo
};
