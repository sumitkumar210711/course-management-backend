const authRepository = require('../repositories/authRepository');

const loginUserServices = async(email,password) =>{
    try{
        const result = await authRepository.loginUser(email,password);
        return result;
    }catch(error){
        throw error;
    }
}

module.exports = {loginUserServices};