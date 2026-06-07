const errorRes = {
    success:false,
    message :"Malformed request  |  Bad request",
    err:{},
}

const ObjectId = require('mongoose').Types.ObjectId;
const Theater = require('../model/theater.model');
const Movie = require("../model/movie.model");

const validateShow = async (req, res, next) =>{
   
try{
    
    if(!req.body.theaterId){
        errorRes.err = "TheaterId is not present."
        return res.status(400).json(errorRes);
    }

    if(!req.body.movieId){
        errorRes.err = "MovieId is not present."
        return res.status(400).json(errorRes);
    }


    if(!req.body.timing){
        errorRes.err = "Timing is not present."
        return res.status(400).json(errorRes);
    }

    if(!ObjectId.isValid(req.body.theaterId)){
        errorRes.err = "Invalid theater id."
        return res.status(400).json(errorRes);
    }

    const theater = await Theater.findById(req.body.theaterId);

    if(!theater){
        errorRes.err = "No theater found with given theater id ."
        return res.status(404).json(errorRes);
    }

    if(!ObjectId.isValid(req.body.movieId)){
        errorRes.err = "Invalid movie id."
        return res.status(400).json(errorRes);
    }

    if(!theater.movies.includes(req.body.movieId)){
        errorRes.err = "MOvie is not streamin in this theater."
        return res.status(400).json(errorRes);
    }

    const movie = await Movie.findById(req.body.movieId);

    if(!movie){
        errorRes.err = "No movie found with given movie id ."
        return res.status(404).json(errorRes);
    }

    next();

}   catch(err){
        errorRes.message= "Internal server error";
        errorRes.err= err.message;
        return res.status(500).json(errorRes);
}
  
}


const validateUpdateRequest = async (req, res, next) =>{

    if(!req.params.id){
        errorRes.err = "ShowId is not present."
        return res.status(404).json(errorRes);
    }

    if(req.body.movieId || req.body.theaterId){
        errorRes.err = "You can't update theater or movie for an already added show."
        return res.status(404).json(errorRes);
    }

    next();

}



module.exports = {
    validateShow,
    validateUpdateRequest,
}
