// repositories/studentRepository.js
const users = require('../models/userCollection');
const student = require('../models/studentCollection');
const bcrypt = require('bcryptjs');

const registerStudentRepo = async (data) => {
  const existing = await users.findOne({ email: data.emailId });
  if (existing) {
    if (existing.role === 'student') {
      throw new Error('Student already exists');
    } else {
      throw new Error('Student already exists');
    }
  }

  try {
    // 2. Hash and create user
    const hashedPassword = await bcrypt.hash(data.password, 10);
    const newUser = await users.create({
      name: data.name,
      email: data.emailId,
      password: hashedPassword,
      role: 'student'
    });

    // 3. Create the student profile
    await student.create({
      user: newUser._id,
      phone: data.phoneNo
    });


    return { user: newUser };
  } catch (error) {
    console.error("error on student repo", error);
    throw error;
  }
};


const getAllStudents = async () => {
  try {
    const studentDetails = await student.find().populate('user', 'name email role');

    const formattedStudents = studentDetails.map(std => ({
      id: std._id,
      phone: std.phone,
      name: std.user?.name,
      email: std.user?.email,
      role: std.user?.role,
    }));

    return formattedStudents;
  } catch (error) {
    console.error("Error fetching students:", error);
    throw error;
  }
};

module.exports = { getAllStudents , registerStudentRepo };
