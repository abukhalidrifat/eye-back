module.exports = (req, res, next) =>{
    if(req.userRole == "admin"){
        next();
    }else{
        const error = new Error('You are not allowed to view this page.');
        error.statusCode = 403;
        throw error;
    }
}