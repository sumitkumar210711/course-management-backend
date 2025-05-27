const mongoose  = require('mongoose');
const dotenv =require('dotenv');
dotenv.config();
const connectMongoDB  = async()=>{
    try{
         await mongoose.connect(process.env.mongoDBPath,{
    }
    );
    }catch(error){
        console.error("Database Connection Error", error);
        process.exit(1);
    }
}

module.exports = connectMongoDB;