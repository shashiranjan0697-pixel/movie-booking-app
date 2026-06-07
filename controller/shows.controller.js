const showServices = require("../services/shows.service");
const Show = require("../model/show.model");

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

const create = async (req, res) => {
    try {
        const show = await showServices.createShow(req.body);
        successRes.message="Show created successfully.";
        successRes.data = show;
        return res.status(201).json(successRes);

    } catch (e) {

        errorRes.message= e.message;
        errorRes.err= e.name;
        return res.status(500).json(errorRes);
    }
};

const getShows = async (req, res) =>{
    try{
        const filter ={};
        if(req.query.theaterId){
            filter.theaterId = req.query.theaterId;
        }

        if(req.query.movieId){
            filter.movieId = req.query.movieId;
        }

        const show = await Show.find(filter);

        if(!show){
            errorRes.message="No show found.";
            return res.status(404).json(errorRes);
        }

        successRes.message= "Shows fetched Successfully."
        successRes.data = show;
        return res.status(200).json(successRes);

    }   catch(e){

        errorRes.message=e.message;
        errorRes.err=e.name;
        return res.status(404).json(errorRes);

    }
}


const deleteShow = async (req, res) =>{
    try{
        if(!req.params.id){
            errorRes.err = "ShowId is not present."
            return res.status(404).json(errorRes);
        }
        const show = await Show.findByIdAndDelete(req.params.id);
        if(!show){
            errorRes.message="Please enter correct showId";
            errorRes.err="Invalid showId.";
            return res.status(404).json(errorRes);
        }

       
        successRes.message="Show deleted successfully.";
        successRes.data = show;
        return res.status(404).json(successRes);

    }   catch(e){
        errorRes.message=e.message;
        errorRes.err=e.name;
        return res.status(404).json(errorRes);
    }
}


const updateShow = async (req, res) =>{
    try{
        
        const show = await Show.findByIdAndUpdate(
                req.params.id,
                req.body,
                {
                    returnDocument:"after",
                    runValidators:true
                }
            );
        if(!show){
            errorRes.message="Please enter correct showId";
            errorRes.err="Invalid showId.";
            return res.status(400).json(errorRes);
        }

       
        successRes.message="Show updated successfully.";
        successRes.data = show;
        return res.status(404).json(successRes);

    }   catch(e){
        errorRes.message=e.message;
        errorRes.err=e.name;
        return res.status(404).json(errorRes);
    }
}


module.exports = {
    create,
    getShows,
    deleteShow,
    updateShow
};