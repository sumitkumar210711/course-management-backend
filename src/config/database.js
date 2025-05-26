const mongoose  = require('mongoose');
const dotenv =require('dotenv');
dotenv.config();
const connectMongoDB  = async()=>{
    try{
         await mongoose.connect(process.env.mongoDBPath,{
    }
    );
    console.log("MongoDB is Connected Successfully to the backen server.")
    }catch(error){
        console.error("Database Connection Error", error);
        process.exit(1);
    }
}

module.exports = connectMongoDB;