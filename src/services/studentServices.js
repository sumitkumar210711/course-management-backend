const studentRepository = require('../repositories/studentRepository');

const registerStudentService = async (data) => {
  try {
    return await studentRepository.registerStudentRepo(data);
  } catch (error) {
    throw error;
  }
};

const getAllStudentsService = async () => {
  try {
    const result = await studentRepository.getAllStudents();
    return result;
  } catch (error) {
    throw error;
  }
};

module.exports = { getAllStudentsService , registerStudentService};
