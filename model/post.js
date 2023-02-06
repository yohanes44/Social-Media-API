const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    title: String,
    detail: String,
    likes:[String],
    pictures: [String]
})




module.exports = mongoose.model("Post", PostSchema);