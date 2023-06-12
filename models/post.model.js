const mongoose = require("mongoose");

const Schema = mongoose.Schema({
    title: String,
    body: String,
    device: String,
    no_of_comments: Number
}, {
    versionKey: false
})

const PostModel = new mongoose.model("post", Schema)

module.exports = PostModel;
