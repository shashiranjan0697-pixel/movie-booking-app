const movie = require("../model/movie.model");
const Movie = require("../model/movie.model");
const mongoose = require("mongoose");


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


//  creating movies
exports.createMovie = async (req, res) =>{

try {
        const info = await Movie.create(req.body);

        successRes.data = info;
        successRes.message= "Movie created"
        return res.status(201).json(successRes);
    

    }  catch(e){
        errorRes.message =  e.errors.title.message;
        errorRes.err= e.errors.title.name;
        return res.status(500).json(errorRes);
    }
}


// deleting movies
exports.deleteMovie =  async (req, res) =>{
    try{
        const id = req.params.id;
        const info = await Movie.findByIdAndDelete(id); 

        if(!info){
            errorRes.message = "Movie not found"; 
            return res.status(404).json(errorRes);
        }

        successRes.data = info;
        successRes.message= "Movie deleated"
        return res.status(200).json(successRes);

    } catch (e) {
        errorRes.message =  e.message || "Internal server error";
        errorRes.err= e;
        return res.status(500).json(errorRes);
    }
}



// finding movies
exports.movieGet= async (req, res) =>{
    try{
        const option = req.params.option;
        let filter ={};

        if (mongoose.Types.ObjectId.isValid(option)) {
            filter._id = option;
        }else {
            // treat as title search (case-insensitive)
            filter.title = { $regex: option, $options: "i" };
        }

        const info = await Movie.findOne(filter);

        if(!info){
            errorRes.message = "Movie not found"; 
            return res.status(404).json(errorRes);
        }

        successRes.data = info;
        successRes.message= "Movie successfully fetched"
        res.status(200).json(successRes);
        return info;

    } catch (e){
        errorRes.message =  e.message || "Internal server error";
        errorRes.err= e;
        return res.status(500).json(errorRes);
    }
}


exports.movieUpdate= async (req, res) =>{
    
    try {
        const info = await Movie.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true
            }
        );

        successRes.data = info;
        successRes.message= "Movie updated successfully."
        return res.status(201).json(successRes);
    

    }  catch(e){
        errorRes.message =  e.errors.title.message;
        errorRes.err= e.errors.title.name;
        return res.status(500).json(errorRes);
    }
}


exports.findMovie = async (req, res)=>{
    try{
        let filter ={};
        const queries = req.query;

        let info = await Movie.find(queries);

        if(info.length === 0){
            errorRes.message = "Movies not found "; 
            return res.status(404).json(errorRes);
        }

        successRes.data = info;
        successRes.message= "Movie successfully fetched."
        return res.status(201).json(successRes);

    } catch(e){
        errorRes.message =  "Problem in fetching Movies";
        errorRes.err= e.errors.title.name;
        return res.status(500).json(errorRes);
    }
}
