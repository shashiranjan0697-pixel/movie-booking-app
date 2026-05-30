const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    email: {
        type: String,
        trim: true,
        lowercase: true,
        unique: true,
        required: [true, 'Email address is required'],
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },
    password: {
    type: String,
    required: true,
    minLength: 6
    },
    userRole:{
        type:String,
        required:true,
        default:"CUSTOMER"
    },
    userStatus:{
        type:String,
        required:true,
        default:"APPROVED"
    }

}, {timestamps:true});

const User = mongoose.model('User', userSchema);
module.exports = User;