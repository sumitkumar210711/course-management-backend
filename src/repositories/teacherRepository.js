// repositories/teacherRepository.js
const users = require('../models/userCollection');
const teacher = require('../models/teacherCollection');
const bcrypt = require('bcryptjs');
const course = require('../models/courseCollection');
const mappingStudentTeacher = require('../models/mappingSTCollection');

const registerTeacherRepo = async (data) => {
  // 1. Check if email is already taken
  const existing = await users.findOne({ email: data.emailId });
  if (existing) {
    if (existing.role === 'teacher') {
      throw new Error('Teacher already exists');
    } else {
      // email taken by a student or admin
      throw new Error('teacher already exists');
    }
  }

  try {
    // 2. Hash and create user
    const hashedPassword = await bcrypt.hash(data.password, 10);
    const newUser = await users.create({
      name: data.name,
      email: data.emailId,
      password: hashedPassword,
      role: 'teacher'
    });

    // 3. Create the teacher profile
    await teacher.create({
      user: newUser._id,
      phone: data.phoneNo
    });

    return { user: newUser };
  } catch (error) {
    throw error;
  }
};


const getAllTeachers = async () => {
  try {
    // Fetch all teachers and populate user info
    const teacherDetails = await teacher.find().populate('user', 'name email role');

    const formattedTeachers = await Promise.all(
      teacherDetails.map(async (t) => {
        const courseDetailsByTeacher = await course.find({ teacherId: t.user._id });

        return {
          id: t._id,
          phone: t.phone,
          name: t.user?.name,
          email: t.user?.email,
          role: t.user?.role,
          courseCount: t.courseCount,
          courses: courseDetailsByTeacher.map(course => ({
            id: course._id,
            description:course.description,
            title: course.title,
            status: course.status,
            startDate: course.startDate,
            endDate: course.endDate
          }))
        };
      })
    );

    return formattedTeachers;
  } catch (error) {
    console.error("Error fetching teachers:", error);
    throw error;
  }
};


const assignStudentsRepository = async (teacherId, studentIds) => {
  const createdMappings = [];

  for (const studentId of studentIds) {
    // Check if mapping exists
    const exists = await mappingStudentTeacher.findOne({ teacherId, studentId });
    if (!exists) {
      const mapping = new mappingStudentTeacher({ teacherId, studentId });
      const saved = await mapping.save();
      createdMappings.push(saved);
    }
  }

  return createdMappings;
};

module.exports = { assignStudentsRepository, getAllTeachers , registerTeacherRepo };
