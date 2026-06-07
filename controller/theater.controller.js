const Theater = require("../model/theater.model");

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

exports.createTheater = async (req, res) =>{
    try{

        const theater = await Theater.create(req.body);

        successRes.data = theater;
        successRes.message= "Theater created"
        return res.status(201).json(successRes);

    }   catch(e){

        errorRes.message =  e.errors.title.message;
        errorRes.err= e.errors.title.name;
        return res.status(500).json(errorRes);

    }
}


exports.deleteTheater = async (req, res )=>{
    try{
        const theater = await Theater.findByIdAndDelete(req.params.id);

        if(!theater){
            errorRes.message =  "Theater is not found with requested ID";
            errorRes.err= "Bad request";
            return res.status(404).json(errorRes);
        }

        successRes.data = theater;
        successRes.message= "Theater Deleated"
        return res.status(201).json(successRes);

    }   catch(e) {

        errorRes.message =  e.errors.title.message;
        errorRes.err= e.errors.title.name;
        return res.status(500).json(errorRes);

    }
}




exports.getTheater = async (req, res) => {
    try {

        const theater = await Theater.findById(req.params.id);

        if (!theater) {
            errorRes.message = "Theater not found";
            return res.status(404).json(errorRes);
        }

        successRes.data = theater;
        successRes.message = "Theater successfully fetched";

        return res.status(200).json(successRes);

    } catch (e) {

        errorRes.message = e.message || "Internal server error";
        errorRes.err = e;

        return res.status(500).json(errorRes);
    }
}




exports.updateTheater= async (req, res) =>{
    
    try {
        const theater = await Theater.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                returnDocument: 'after',
                runValidators: true
            }
        );

        if(!theater){
            errorRes.message= "Theater not found with given id."
            errorRes.err= "Please enter valid theater id."
            return res.status(404).json(errorRes);
        }

        successRes.data = theater;
        successRes.message= "Theater updated successfully."
        return res.status(201).json(successRes);
    

    }  catch(e){
        errorRes.message =  e.errors.title.message;
        errorRes.err= e.errors.title.name;
        return res.status(500).json(errorRes);
    }
}




exports.getAllTheater = async (req, res) =>{
    try{
        let query = {};
        let pagination = {};

        if(req.query.name){
            query.name = req.query.name;
        }

        if(req.query.city){
            query.city = req.query.city;
        }

        if(req.query.pincode){
            query.pincode = req.query.pincode;
        }

        if(req.query.state){
            query.state = req.query.state;
        }

        if(req.query.address){
            query.address = req.query.address;
        }

        if(req.query.movieId){
            query.movies = {$all:req.query.movieId};
        }

        if(req.query.limit){
            pagination.limit = req.query.limit;
        }

        if(req.query.limit){
            let perpage = req.query.limit ? req.query.limit : 3;
            pagination.skip = (req.query.skip) ? perpage*req.query.skip : 0;
        }

        const theater = await Theater.find(query, {}, pagination);

        if(theater.length == 0){
            successRes.data = theater;
            successRes.message= "No more Theater found for the given details."
            return res.status(201).json(successRes);
        }

        successRes.data = theater;
        successRes.message= "All Theater fetched successfully."
        return res.status(201).json(successRes);

    }   catch(e){

        
        errorRes.message =  e.errors.title.message;
        errorRes.err= e.errors.title.name;
        return res.status(500).json(errorRes);
    }
}


const {updateMovieInTheater} = require("../services/theater.service");
const movie = require("../model/movie.model");


exports.addMovieInTheater = async (req, res) => {

    try {

        const response = await updateMovieInTheater(
            req.params.id,
            req.body.movies,
            req.body.insert
        );

        successRes.data = response;
        successRes.message = "Movies updated successfully.";
        return res.status(200).json(successRes);

    } catch (e) {

        errorRes.message =  e.errors.title.message;
        errorRes.err= e.errors.title.name;

        return res.status(500).json(errorRes);
    }
};


exports.getMovieStreamingInTheater = async (req,res) =>{
    try{

        const response = await Theater.findById(req.params.id, {movies:1, city:1, address:1, name:1}).populate('movies');

        if (!response) { 
            errorRes.message = "Theater not found with given id.";
            return res.status(404).json(errorRes);
        }

        successRes.data = response;
        successRes.message = "Successfully fetched Movies for the theater.";
        return res.status(200).json(successRes)

    }   catch(e){

        errorRes.message =  e.errors.title.message;
        errorRes.err= e.errors.title.name;
        return res.status(500).json(errorRes);

    }
}

// is particular movie is streaming in the particular theater

exports.getMovieInATheater= async (req, res) => {
    try{
        const theater = await Theater.findById(req.params.theaterID);
        if(!theater){
            errorRes.message = "Theater not found with given id.";
            return res.status(404).json(errorRes);
        }
        const isSreaming = theater.movies.includes(req.params.movieId);

        if(!isSreaming){
            errorRes.message = `movie is not streaming with movieId = ${req.params.movieId}.`;
            return res.status(404).json(errorRes);
        }

        successRes.data = movie;
        successRes.message = `Yes, movie with movieId = ${req.params.movieId} is streaming .`;
        return res.status(200).json(successRes)

    }   catch(e){

        errorRes.message =  e.errors.title.message;
        errorRes.err= e.errors.title.name;
        return res.status(500).json(errorRes);

    }
}