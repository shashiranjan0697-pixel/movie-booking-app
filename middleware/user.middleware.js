
const errorRes = {
    success:false,
    message :{},
    err:{}
}


exports.validateRoleStatusUpdate = async (req, res, next)=>{
    
    if(!req.params.id){
            errorRes.message = "User ID is ot provided.";
            return res.status(400).json(errorRes);
    }

    if(!(req.body.userRole || req.body.userStatus) ){
            errorRes.message = "Malformed request, please send atleast one parameter";
            return res.status(400).json(errorRes);
    }
    next();
}


