const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema({
    title:{
        type:String,
        require:true,
    },
    description :{
        type:String,
        require:true
    },
    cast:{
        type:[String],
        require:true,
    },
    director:{
        type:[String],
        require:true
    },
    status:{
        type:String,
        default: "Relased"
    },
    language:{
        type:[String],
        default:"Hindi"
    },
    releasedOn:{
        type: String,
        require:true
    }
},{timestamps: true})

const movie = mongoose.model("movie", movieSchema);
module.exports = movie;