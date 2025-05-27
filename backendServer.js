/*
* @file backendServer.js
This file is a file from where the backend server starts its execution. 
It contains parser to parse the incoming request bodies.
*/
const express = require('express');
const app=express();

const connectMongoDB = require('./src/config/database');
const registerAdmin = require('./src/admin/admin');
const generateToken =require('./src/middleware/authMiddleware');
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




app.get('/',(req,res) =>{
    res.send("Hello World, My Name is Sumit kumar and this is the get route")

});


const PORT = process.env.PORT || 5002;
app.listen(PORT, ()=>{
    console.log(`The backend server for course management system is running on ${PORT}`)
});
