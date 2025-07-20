const { createCourseService, viewCourseService } = require('../services/courseServices');

const createCourseController = async (req, res) => {
  try {
    console.log("Course creation initiated");
    console.log("Data received:", req.body);

    const courseData = req.body;
    const createdCourse = await createCourseService(courseData);

    return res.status(201).json({
      status_code: 201,
      message: "Course created successfully",
      data: createdCourse
    });

  } catch (error) {
    console.error("Error in createCourseController:", error.message);
            if(error.message.includes("exists")){
            return res.status(404).send({
            status_code:404,
            error: "Course already exists"
        })}

        else{
        return res.status(500).json({
        status_code: 500,
        error: error.message
        });
    }
  }
};

const viewCoursesController = async(req,res) =>{
  try{
     console.log("course details are going to be fetched");
    const courses = await viewCourseService();
    console.log("courses fetched", courses);
    return res.status(200).send({
      status_code: 200,
      data: courses
    });
  } catch (error) {
    return res.status(500).send({
      status_code: 500,
      error: error.message
    });
  }

}


module.exports = { createCourseController,
   viewCoursesController };
