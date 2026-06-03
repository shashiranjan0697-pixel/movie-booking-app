const mongoose = require('mongoose');
const bcrypt = require("bcrypt");


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
        enum:["CUSTOMER", "ADMIN", "CLIENT"],
        default:"CUSTOMER"
    },
    userStatus:{
        type:String,
        required:true,
        enum:["PENDING", "APPROVED"],
        default:"APPROVED"
    }

}, {timestamps:true});

// Encrypting plain password before saving
userSchema.pre('save', async function () {
    const hashedPass = await bcrypt.hash(this.password, 10);
    this.password = hashedPass;
});

//  Vlidating pssword for user signin
userSchema.methods.isValidPass = async function (plainPass) {
    const currentUser = this;
    const compare = await bcrypt.compare(plainPass, currentUser.password);
    return compare;
};

const User = mongoose.model('User', userSchema);
module.exports = User;