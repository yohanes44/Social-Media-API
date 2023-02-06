const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName:{
        type: String,
        required: true
    },
    username: {
        type: String,
        unique: true,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    followings: {
        type: [String]
    },
    followers:{
        type: [String]
    },
    profilePicture:{
        type: String
    },
    coverPicture:{
        type: String
    },
    pictures: {
        type: [String]
    }
})



module.exports = mongoose.model("User", UserSchema);