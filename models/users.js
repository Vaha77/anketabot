const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    user_id:String,
    username:String,
    first_name:String,
    phone:Number,
    isAdmin:{
        type:Boolean,
        default:false
    }
})

module.exports = mongoose.model("Users", UserSchema);