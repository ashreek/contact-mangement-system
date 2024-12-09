const jwt = require("jsonwebtoken");
const asyncHnadler = require("express-async-handler");

const validateToken = asyncHnadler(async(req,res,next) => {
    let token;
    const authHeader = req.headers.Authorization || req.headers.authorization;
    if(authHeader && authHeader.startsWith("Bearer"))
    {
        token = authHeader.split(" ")[1];
        jwt.verify(token,process.env.ACCESS_SECRET,(err,decoded) => {
               if(err)
               {
                 res.status(400);
                 throw new Error("user cannot have Access to this page");
               }
               else{
                  req.user = decoded.user;
                  next();
               }
        });
        if(!token)
        {
            res.status(400);
            throw new Error("Access token is not correct or has expired");
        }

    }
    else{
        res.status(400);
        throw new Error("No access token found in the request");
    }
});

module.exports = validateToken;