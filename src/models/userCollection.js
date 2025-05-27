const mongoose = require('mongoose');
const userCollection = new mongoose.Schema({
    name:{type:String, required:true},
    email:{type: String, required:true, unique:true},
    password:{type:String, required:true},
    role:{type:String, required:true, enum:['admin','teacher','student']}
});

module.exports = mongoose.model('users',userCollection);
