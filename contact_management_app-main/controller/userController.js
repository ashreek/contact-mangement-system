//adding async ahndler to avoid using try-catch in every block
const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
//@Desc register a new user
//@api /user/register
//@access public
const registerUser = asyncHandler( async (req,res)=>{
    const {name,email,password} = req.body;
    if(!name || !email ||!password)
    {
        res.status(400);
        throw new Error("All feilds are mandatory");
    }
    const userAvailable = await User.findOne({email});
    if(userAvailable)
    {
        res.status(400);
        throw new Error("User already exists");
    }
    const hpassword = await bcrypt.hash(password,10);
    const user = await User.create({
        username:name,
        email:email,
        password:hpassword
    }) ;
    if(!user)
    {
        res.status(500);
        throw new Error("insertion error");
    }
    else{
    res.status(201).json({"name":user.username,"email":user.email});
    }
});

//@Desc login the exisiting user
//@api /user/login
//@access public
const loginUser = asyncHandler( async (req,res)=>{
    const {email,password} = req.body;
    if(!email || !password)
    {
        res.status(400);
        throw new Error("All feilds are mandatory");
    }
    const user  = await User.findOne({email});
    if(user && (await bcrypt.compare(password,user.password)))
    {
        const accessToken = jwt.sign({
            user:
            {
                username:user.username,
                email:user.email,
                id:user.id,
            }
        },
            process.env.ACCESS_SECRET,
            {expiresIn:"15m"}
        );
        res.status(200).json({accessToken});
    }
    
    res.status(200).json("user is logged in");
});

//@Desc info about the current user
//@api /user/current
//@access private
const currentUser = asyncHandler( async (req,res)=>{
    
    res.status(200).json(req.user);
});

module.exports  = {registerUser,loginUser,currentUser};