const express = require("express");
const cors = require("cors");
const connection = require("./db");
const userRouter = require("./routes/user.route");
const postRouter = require("./routes/post.route");
const auth = require("./middleware/auth.middleware");

require("dotenv").config();

const app = express();

app.use(express.json());
app.use(cors());
app.use("/users", userRouter);
app.use(auth);
app.use("/posts", postRouter)

app.listen(process.env.PORT, async (req, res) => {
    try {
        await connection;
        console.log("connected");
    } catch (e) {
        console.log(e);
    }
})

