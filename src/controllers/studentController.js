const studentServices = require('../services/studentServices');

const registerStudentController = async (req, res) => {
  try {
    const studentData = req.body;
    const result = await studentServices.registerStudentService(studentData);
    return res.status(201).json({
      status_code: 201,
      message: 'Student registered successfully',
      data: result
    });
  } catch (error) {
    console.error("error", error);
            if(error.message.includes("exists")){
            return res.status(404).send({
            status_code:404,
            error: "Student already exists"
        })}

        else{
        return res.status(500).json({
        status_code: 500,
        error: error.message
        });
    }
  }
};





const getAllStudentsController = async (req, res) => {
  try {
    const students = await studentServices.getAllStudentsService();
    return res.status(200).send({
      status_code: 200,
      data: students
    });
  } catch (error) {
    return res.status(500).send({
      status_code: 500,
      error: error.message
    });
  }
};

module.exports = { getAllStudentsController,
    registerStudentController 
 };
