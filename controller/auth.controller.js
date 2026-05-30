const jwt = require("jsonwebtoken");
require ("dotenv").config();

const User = require('../model/user.model');
const {registerUser, getUserByEmail} = require("../services/auth.service")

const errorRes = {
    success:false,
    message :{},
    err:{}
}

const successRes = {
    success:true,
    message :{},
    data:{},
}


exports.signup = async (req, res) =>{
    try{
        
        const user = await registerUser(req.body);

        successRes.data = user;
        successRes.message= "User registered"
        return res.status(201).json(successRes);

    }   catch(e){

        errorRes.message = e.message;
        errorRes.err = e.name;
        return res.status(500).json(errorRes);

    }
}

exports.signin = async (req, res) =>{
    try{
        
        const user = await getUserByEmail(req.body.email);

        const compare = await user.isValidPass(req.body.password);

        if(!compare){
            successRes.message= "invalid Password"
            return res.status(401).json(errorRes);
        }

        const token =jwt.sign(
            {id:user.id, email:user.email }, 
            process.env.AUTH_KEY,
            {expiresIn:"5d"}
        );

        return res.status(200).json({
            success: true,
            message: "User logged in successfully",
            data: {
                name: user.name,
                email: user.email,
                userRole: user.userRole,
                userStatus: user.userStatus
            },
            token: token
        });
    }   catch(e){

        errorRes.message = e.message;
        errorRes.err = e.name;
        return res.status(500).json(errorRes);

    }
}