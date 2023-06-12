const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const express = require("express");
const UserModel = require("../models/user.model");

const userRouter = express.Router();

userRouter.post("/register", async (req, res) => {
    try {
        const { email, name, password, gender, age, city, is_married } = req.body;
        const user = await UserModel.findOne({ email });
        if (user) {
            res.status(400).send({ msg: "User already registered!" });
        } else {
            bcrypt.hash(password, 5, async (err, hashed) => {
                if (err) {
                    res.status(400).send({ err: err });
                } else {
                    const newUser = new UserModel(req.body);
                    await newUser.save({ email, name, password: hashed, gender, age, city, is_married });
                    res.status(200).send({ msg: "User registered!" });
                }
            })
        }
    } catch (e) {
        console.log(e);
        res.status(400).send({ err: e.message });
    }
})

userRouter.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await UserModel.findOne({ email });

        if (user) {
            bcrypt.compare(password, user.password, (err, result) => {
                if (err) {
                    res.status(400).send({ err: err });
                } else {
                    const token = jwt.sign({ "userId": user._id }, "secret");
                    res.status(200).send({ msg: "Logged in", token: token });
                }
            })
        } else {
            res.status(400).send({ err: "Please register first" });
        }

    } catch (e) {
        console.log(e);
        res.status(400).send({ err: e.message });
    }
})

module.exports = userRouter
