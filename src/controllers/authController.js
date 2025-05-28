const { generateToken } = require('../middleware/authMiddleware');
const authServices = require('../services/authServices');

const authUserController = async(req,res)=>{
    try{
        console.log("auth controller is accessing");
        console.log("data coming from frontend", req.body);
        const {email,password} = req.body;
    const loggedUser = await authServices.loginUserServices(email,password);

    console.log("user logged in", loggedUser);

    const token = generateToken(loggedUser);
    console.log("token", token);

    return res.status(200).send({
        status_code:200,
        message:"You are Successfully logged in",
        data: {loggedUser, token}
    });

    }catch(error){
        if(error.message.includes("not found")){
            return res.status(404).send({
            status_code:404,
            error: "user not found"
        })}
        if(error.message.includes("Password")){
            return res.status(401).send({
            status_code:401,
            error: "Password not matched"
        })}
        else{
        return res.status(500).send({
            status_code :500,
            error: error
        })}
    }

}

module.exports ={authUserController};
