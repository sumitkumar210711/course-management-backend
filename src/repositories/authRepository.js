const users = require('../models/userCollection');
const student = require('../models/studentCollection');
const teacher = require('../models/teacherCollection');
const bcrypt = require('bcryptjs');

const loginUser = async (email, password) => {
  try {
    // 1. Fetch user by email
    const userDetails = await users.findOne({ email });
    if (!userDetails) {
      throw new Error('User Details not found');
    }

    // 2. Verify password
    const isPasswordMatched = await bcrypt.compare(password, userDetails.password);
    if (!isPasswordMatched) {
      throw new Error('Password not matched');
    }

    // 3. Fetch phone from profile based on role
    let profile = null;
    if (userDetails.role === 'teacher') {
      profile = await teacher.findOne({ user: userDetails._id }).select('phone');
    } else if (userDetails.role === 'student') {
      profile = await student.findOne({ user: userDetails._id }).select('phone');
    }

    // 4. Consolidate and return
    return {
      user: {
        id: userDetails._id,
        name: userDetails.name,
        email: userDetails.email,
        role: userDetails.role,
        phone: profile ? profile.phone : null,
        userId : profile ? profile._id : null
      },
      
    };
  } catch (error) {
    throw error;
  }
};

module.exports = { loginUser };
