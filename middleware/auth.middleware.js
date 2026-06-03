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

        next();

    }   catch (e) {

        errorRes.err = e.message;
        errorRes.message= "Invalid Token";
        return res.status(401).send(errorRes);

    }

}

exports.validateReset = async (req, res, next)=>{
    if(!req.body.password){
        errorRes.err = "Please enter the old password."
        return res.status(400).json(errorRes);
    }

    if(!req.body.newPassword){
        errorRes.err = "Please enter the new Password."
        return res.status(400).json(errorRes);
    }

    if(req.body.newPassword == req.body.password){
        errorRes.err = "New password must be different from the old password.";
        return res.status(400).json(errorRes);
    }

    next();
}



exports.isAdmin = async (req, res, next)=>{
    const user = await User.findById(req.user);

    if(user.userRole != "ADMIN"){
        errorRes.err = "Only admins are authorized to access this resource."
        return res.status(403).json(errorRes);
    }

    next();

}


exports.isClient = async (req, res, next)=>{
    const user = await User.findById(req.user);

    if(user.userRole != "CLIENT"){
        errorRes.err = "Only client are authorized to access this resource."
        return res.status(403).json(errorRes);
    }

    next();

}


exports.isClientOrAdmin = async (req, res, next)=>{
    const user = await User.findById(req.user);

    if(user.userRole != "CLIENT" && user.userRole != "ADMIN"){
        errorRes.err = "Only client or admin are authorized to access this resource."
        return res.status(403).json(errorRes);
    }

    next();

}