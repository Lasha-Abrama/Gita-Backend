const express = require("express");
const BlogRouter = require("./blogs/blog.controller");
const UserRouter = require("./users/user.controller");
const AuthRouter = require("./auth/auth.controller");
const connectToDb = require("./config/db.config");
const { default: mongoose } = require("mongoose");
require("dotenv").config();

const app = express();

app.use(express.json());

app.use("/auth", AuthRouter);
app.use("/blogs", BlogRouter);
app.use("/users", UserRouter);

connectToDb().then(() => {
  app.listen((port = process.env.PORT), () => {
    console.log(`server running on http://localhost:${port}`);
  });
});
