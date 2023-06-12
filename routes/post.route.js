const express = require("express");
const PostModel = require("../models/post.model");
const jwt = require("jsonwebtoken")

const postRouter = express.Router();

postRouter.get("/", async (req, res) => {
    try {
        const token = req.headers.authorization;
        const decoded = jwt.verify(token, "secret");

        if (decoded) {
            const userId = decoded.userId;
            const posts = await PostModel.find({ userId });
            res.status(200).send(posts);
        } else {
            res.status(400).send({ msg: "Please Login first" });
        }

    } catch (e) {
        console.log(e);
        res.status(400).send({ err: e.message });
    }
})

postRouter.post("/add", async (req, res) => {
    try {
        const post = new PostModel(req.body);
        console.log(req.body);
        await post.save();
        res.status(200).send({ msg: "new post added" });
    } catch (e) {
        console.log(e);
        res.status(400).send({ err: e.message });
    }
})

postRouter.patch("/update/:id", async (req, res) => {
    try {
        const { id } = req.params;
        await PostModel.findByIdAndUpdate({ _id: id }, req.body);
        res.status(200).send({ msg: "updated" });
    } catch (e) {
        console.log(e);
        res.status(400).send({ err: e.message });
    }
})

postRouter.delete("/delete/:id", async (req, res) => {
    try {
        const { id } = req.params;
        await PostModel.findByIdAndDelete({ _id: id });
        res.status(200).send({ msg: "deleted" });
    } catch (e) {
        console.log(e);
        res.status(400).send({ err: e.message });
    }
})

module.exports = postRouter
