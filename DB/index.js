const mongoose = require("mongoose");
const UserSchema = require("../models/users")
const connection = async () => {
    const config = {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    await mongoose.connect(process.env.MONGO_URL,config,(err)=> {
        if(err) return console.log(err);
        console.log("mongo_db connect")
    })
}

module.exports = connection;