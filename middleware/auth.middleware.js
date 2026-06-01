const User = require("../model/user.model");

const errorRes = {
    success:false,
    message :"Malformed request  |  Bad request",
    err:{},
}

exports.validateAuthUser = async (req, res, next) =>{

    if(!req.body.name){
        errorRes.err = "Name of the user isn't present in request body."
        return res.status(400).json(errorRes);
    }

    if(!req.body.email){
        errorRes.err = "Email of the user isn't present in request body."
        return res.status(400).json(errorRes);
    }

    if(!req.body.password){
        errorRes.err = "Password of the user isn't present in request body."
        return res.status(400).json(errorRes);
    }

    if(req.body.password.length<6){
        errorRes.err = "Password length expected above five."
        return res.status(400).json(errorRes);
    }

    next();
}


exports.validateSignInUser = async (req, res, next) =>{

    if(!req.body.email){
        errorRes.err = "Please enter the Email.."
        return res.status(400).json(errorRes);
    }

    if(!req.body.password){
        errorRes.err = "Please enter the Password."
        return res.status(400).json(errorRes);
    }

    next();
}


const jwt = require('jsonwebtoken');


exports.isAuthnticated = async (req, res, next) =>{
    try{
        
        const token = req.headers["token"];

        if(!token){
            
            errorRes.err= "Token not provided";
            return res.status(401).json(errorRes);
        }

        const response = jwt.verify(token, process.env.AUTH_KEY);

        const user = await User.findById(response.id);

        if (!user) {
            errorRes.err = "User not found";
            return res.status(404).json(errorRes);
        }

        req.user = response.id; 

        console.log(user.id);
        console.log(user.email);
        console.log(user.userRole);

        next();

    }   catch (e) {

        errorRes.err = e.message;
        errorRes.message= "Invalid Token";
        return res.status(401).send(errorRes);

    }

}