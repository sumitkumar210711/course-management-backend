const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const users = require('../models/userCollection');

const admin_Email = process.env.ADMIN_EMAIL;
const admin_Name = process.env.ADMIN_NAME;
const admin_Password = process.env.ADMIN_PASSWORD;


const registerAdmin = async()=>{
    const hashedPassword = await bcrypt.hash(admin_Password,10);

    const registeredAdmin = await users.findOne({ email: admin_Email });
    if (registeredAdmin) {
      console.log('Admin already exists.');
      return true;
    }

    const adminRegistration = new users ({
        name:admin_Name,
        email:admin_Email,
        password: hashedPassword,
        role:'admin'
    });

    await adminRegistration.save();
            console.log("Admin is Registered Successfully")

}

module.exports = registerAdmin;
