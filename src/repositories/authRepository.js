const users = require('../models/userCollection');
const bcrypt = require('bcryptjs');
const loginUser = async(email, password)=>{
    try{

        const userDetails = await users.findOne({email});
        if(!userDetails){
            throw new Error("User Details not found");
        }
        console.log("user Details",userDetails);

        const isPasswordMatched = await bcrypt.compare(password,userDetails.password);
        if(!isPasswordMatched){
         throw new Error("Password not matched");
        }
        return userDetails;
    }catch(error){
        throw error;
    }
}

module.exports = {loginUser};