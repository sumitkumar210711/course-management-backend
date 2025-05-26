/*
* @file backendServer.js
This file is a file from where the backend server starts its execution. 
It contains parser to parse the incoming request bodies.
*/
const express = require('express');
const app=express();

const connectMongoDB = require('./src/config/database');

app.use(express.json());

connectMongoDB();

app.get('/',(req,res) =>{
    res.send("Hello World, My Name is Sumit kumar and this is the get route")

});
const PORT = process.env.PORT || 5002;
// the following statement is used to start the server on the port 5002.
app.listen(PORT, ()=>{
    console.log(`The backend server for course management system is running on ${PORT}`)
});