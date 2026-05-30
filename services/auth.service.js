const User = require("../model/user.model");


exports.registerUser = async (data) => {

    const response = await User.create(data);

    if (!response) {
        throw new Error("Invalid data");
    }

    return response;
    
};

exports.getUserByEmail = async (email) => {

    const user = await User.findOne({email:email});

    if (!user) {
        throw new Error("User is not found for the provided email.");
    }

    return user;
    
};