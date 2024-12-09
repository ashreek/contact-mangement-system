const mongoose = require("mongoose");

const contactSchema = mongoose.Schema({
    user_id:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"user",
    },
    name:{
        type:String,
        required:[true,"name is required"],
    },
    email:{
        type:String,
        required:[true,"email is required"],
    },
    mobile:{
        type:String,
        required:[true,"mobile number is required"],
    },

},{
    timestamps : true,
})

module.exports = mongoose.model("Contact",contactSchema);