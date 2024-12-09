const mongoose = require("mongoose");

const userSchema = mongoose.Schema({

    username:{
        type:String,
        required:[true,"username is required"],
    },
    email:{
        type:String,
        required:[true,"email is required"],
        unique:[true,"email has already been taken"],
    },
    password:{
        type:String,
        required:[true,"mobile number is required"],
    },

},{
    timestamps : true,
})

module.exports = mongoose.model("user",userSchema);