const teacherServices = require('../services/teacherServices');

const registerTeacherController = async (req, res) => {
  try {
    const teacherData = req.body;
    const result = await teacherServices.registerTeacherService(teacherData);
    return res.status(201).json({
      status_code: 201,
      message: 'Teacher registered successfully',
      data: result
    });
  } catch (error) {
    console.error("error in creating teacher", error);
        if(error.message.includes("exists")){
            return res.status(404).send({
            status_code:404,
            error: "Teacher already exists"
        })}

        else{
        return res.status(500).json({
        status_code: 500,
        error: error.message
        });
    }
  }
};

const getAllTeachersController = async (req, res) => {
  try {
    const teachers = await teacherServices.getAllTeachersService();
    return res.status(200).send({
      status_code: 200,
      data: teachers
    });
  } catch (error) {
    return res.status(500).send({
      status_code: 500,
      error: error.message
    });
  }
};


const assignStudentsController = async (req, res) => {
  try {
    const teacherId = req.params.id;
    const { students } = req.body;
    const result = await teacherServices.assignStudentsService(teacherId, students);
    return res.status(200).json({
      status_code: 200,
      message: 'Students assigned to teacher successfully',
      data: result
    });
  } catch (error) {
    console.error('Error in assignStudentsController:', error.message);
    return res.status(500).json({
      status_code: 500,
      error: error.message || 'Internal Server Error'
    });
  }
};

module.exports = { assignStudentsController, getAllTeachersController , registerTeacherController };
