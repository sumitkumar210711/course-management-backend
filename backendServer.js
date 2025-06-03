/*
* @file backendServer.js
This file is a file from where the backend server starts its execution. 
It contains parser to parse the incoming request bodies.
*/
const express = require('express');
const app=express();
const cors = require('cors');
const connectMongoDB = require('./src/config/database');
const registerAdmin = require('./src/admin/admin');
const generateToken =require('./src/middleware/authMiddleware');
const authRoutes = require('./src/routes/authRoutes');
const studentRoutes = require('./src/routes/studentRoutes');
const teacherRoutes = require('./src/routes/teacherRoutes');
const courseRoutes = require('./src/routes/courseRoutes');
const studentCourseRoutes = require('./src/routes/studentCourseRoutes');
const mappingRoutes = require('./src/routes/mappingRoutes');


app.use(cors());
app.use(express.json());


// The following callAdminRegister() async function helps to connect the mongodb database and to register the admin to the database
const callAdminRegister = async()=> {
    try{
    await connectMongoDB();
        console.log("MongoDB is Connected Successfully to the backend server.")
    await registerAdmin();
    }catch(error){
        console.error("Error in Register Admin and Connecting Database",error);
    }
}
callAdminRegister();

app.use('/api',authRoutes);
app.use('/api',studentRoutes);
app.use('/api',teacherRoutes);
app.use('/api',courseRoutes);
app.use('/api',studentCourseRoutes);
app.use('/api',mappingRoutes);



app.get('/',(req,res) =>{
    res.send("Hello World, My Name is Sumit kumar and this is the get route")

});


const PORT = process.env.PORT || 5002;
app.listen(PORT, ()=>{
    console.log(`The backend server for course management system is running on ${PORT}`)
});
