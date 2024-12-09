const {constants} = require("../constants");
const errorHandler = (error,req,res,next)=>{
    const statusCode = res.statusCode?res.statusCode:500;
    switch (statusCode) {
        case constants.BAD_REQUEST:
            res.json({
                title:"Not a valid request",
                message:error.message,
                stackTrace:error.stack
            });
            
            break;
        case constants.FORBIDDEN:
            res.json({
                title:"this request is forbidden",
                message:error.message,
                stackTrace:error.stack
            });
            
            break;
        case constants.NOT_FOUND:
            res.json({
                title:"Page not found",
                message:error.message,
                stackTrace:error.stack
            });
        case constants.SERVER_ERROR:
            res.json({
                title:"Internal server error",
                message:error.message,
                stackTrace:error.stack
            });
            
            break;
    
        default:
            console.log("none of the documented error is found");
            break;
    }
    
}
module.exports = errorHandler;