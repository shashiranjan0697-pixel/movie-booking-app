const jwt = require("jsonwebtoken");
require ("dotenv").config();
const bcrypt = require("bcrypt");

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




exports.updateRoleOrStatus = async (req, res) =>{
    try{
        const updateQuery = {};
        if(req.body.userRole) updateQuery.userRole = req.body.userRole;
        if(req.body.userStatus) updateQuery.userStatus = req.body.userStatus;

        const response = await User.findByIdAndUpdate(
            req.params.id,
            updateQuery, 
            { returnDocument: 'after' , runValidators:true}
        );

        if(!response){
            errorRes.message = "No user found with given id.";
            return res.status(404).json(errorRes);
        }

        return res.status(200).json({
            success: true,
            data:response,
            message: "Role and status updated successfully."
        });

    }   catch(e){

        if (e.name === "ValidationError") {

        errorRes.message = "Validation failed";

        Object.keys(e.errors).forEach(key => {
            errorRes.err[key] = e.errors[key].message;
        });

        return res.status(400).json(errorRes);
        }

        errorRes.message = e.message;
        errorRes.err = e.name;
        return res.status(500).json(errorRes);

    }
}