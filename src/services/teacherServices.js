const teacherRepository = require('../repositories/teacherRepository');

const registerTeacherService = async (data) => {
  try {
    return await teacherRepository.registerTeacherRepo(data);
  } catch (error) {
    throw error;
  }
};

const getAllTeachersService = async () => {
  try {
    const result = await teacherRepository.getAllTeachers();
    return result;
  } catch (error) {
    throw error;
  }
};

const assignStudentsService = async (teacherId, studentIds) => {
  try {
    const mappings = await teacherRepository.assignStudentsRepository(teacherId, studentIds);
    return mappings;
  } catch (error) {
    throw error;
  }
};


module.exports = { assignStudentsService, getAllTeachersService , registerTeacherService };
