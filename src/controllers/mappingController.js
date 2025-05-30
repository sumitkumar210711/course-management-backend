const mappingService = require('../services/mappingService');

const getCoursesByTeacherId = async (req, res) => {
  try {
    const teacherId = req.params.id;
    const courses = await mappingService.getCoursesByTeacherIdService(teacherId);
    res.status(200).json({ status_code: 200, data: courses });
  } catch (error) {
    res.status(500).json({ status_code: 500, error: error.message });
  }
};

const getStudentsByTeacherId = async (req, res) => {
  try {
    const teacherId = req.params.id;
    const students = await mappingService.getStudentsByTeacherIdService(teacherId);
    res.status(200).json({ status_code: 200, data: students });
  } catch (error) {
    res.status(500).json({ status_code: 500, error: error.message });
  }
};

const getCoursesByStudentId = async (req, res) => {
  try {
    const studentId = req.params.id;
    const courses = await mappingService.getCoursesByStudentIdService(studentId);
    res.status(200).json({ status_code: 200, data: courses });
  } catch (error) {
    res.status(500).json({ status_code: 500, error: error.message });
  }
};

const getTeacherByStudentId = async (req, res) => {
  try {
    const studentId = req.params.id;
    const teacher = await mappingService.getTeacherByStudentIdService(studentId);
    res.status(200).json({ status_code: 200, data: teacher });
  } catch (error) {
    res.status(500).json({ status_code: 500, error: error.message });
  }
};

module.exports = {
  getCoursesByTeacherId,
  getStudentsByTeacherId,
  getCoursesByStudentId,
  getTeacherByStudentId
};
