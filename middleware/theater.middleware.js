const { validate } = require("../model/theater.model");

const errorRes = {
    success:false,
    message :"Malformed request  |  Bad request",
    err:{},
}

exports.validateTheater = async (req, res, next) =>{

    if(!req.body.name){
        errorRes.err = "Name of the theater is not present."
        return res.status(400).json(errorRes);
    }

    if(!req.body.address){
        errorRes.err = "Address is not present."
        return res.status(400).json(errorRes);
    }
    
    if(!req.body.pincode || req.body.pincode.length!=6){
        errorRes.err = "Either pincode is invalid or not present."
        return res.status(400).json(errorRes);
    }

    if(!req.body.city){
        errorRes.err = "City is not present."
        return res.status(400).json(errorRes);
    }

    if(!req.body.state){
        errorRes.err = "State is not present."
        return res.status(400).json(errorRes);
    }

    next();

}


exports.validateMovieUpdateInTheater = async (req, res, next) => {

    // if(!req.body.insert){
    //     errorRes.err = "Insert parameters is not available."
    //     return res.status(400).json(errorRes);
    // }
     if (req.body.insert === undefined) {
        errorRes.err = "Insert parameter is not available.";
        return res.status(400).json(errorRes);
    }

    if(!req.params.id){
        errorRes.err = "ID of the theater is not available."
        return res.status(400).json(errorRes);
    }

    if(!req.body.movies){
        errorRes.err = "Movie IDs is not available."
        return res.status(400).json(errorRes);
    }

    if(!req.body.movies instanceof Array){
        errorRes.err = "Movie IDs is supposed to be in Array."
        return res.status(400).json(errorRes);
    }

    if(req.body.movies.length == 0){
        errorRes.err = "No Movies is provided in the Array."
        return res.status(400).json(errorRes);
    }
    next();
}