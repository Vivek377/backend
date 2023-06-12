const mongoose = require("mongoose");

const Schema = mongoose.Schema({
    name: String,
    email: String,
    gender: String,
    password: String,
    age: Number,
    city: String,
    is_married: Boolean
}, {
    versionKey: false
})

const UserModel = new mongoose.model("user", Schema)

module.exports = UserModel;
