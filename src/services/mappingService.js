const mappingRepo = require('../repositories/mappingRepository');

const getCoursesByTeacherIdService = async (teacherId) => {
  return await mappingRepo.getCoursesByTeacherIdRepo(teacherId);
};

const getStudentsByTeacherIdService = async (teacherId) => {
  return await mappingRepo.getStudentsByTeacherIdRepo(teacherId);
};

const getCoursesByStudentIdService = async (studentId) => {
  return await mappingRepo.getCoursesByStudentIdRepo(studentId);
};

const getTeacherByStudentIdService = async (studentId) => {
  return await mappingRepo.getTeacherByStudentIdRepo(studentId);
};

const assignCoursesToStudent = async (studentId, courseIds) => {
  try {
    const result = await mappingRepo.assignCoursesToStudent(studentId, courseIds);
    return result;
  } catch (error) {
    throw new Error('Error assigning courses to student: ' + error.message);
  }
};


module.exports = {
  getCoursesByTeacherIdService,
  getStudentsByTeacherIdService,
  getCoursesByStudentIdService,
  getTeacherByStudentIdService,
  assignCoursesToStudent
};
