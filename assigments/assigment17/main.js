const express = require("express");
const BlogRouter = require("./blogs/blog.controller");
const UserRouter = require("./users/user.controller");
const AuthRouter = require("./auth/auth.controller");
const connectToDb = require("./config/db.config");
const multer = require("multer");
require("dotenv").config();

const app = express();

app.use(express.json());

app.use("/auth", AuthRouter);
app.use("/blogs", BlogRouter);
app.use("/users", UserRouter);

app.use((err, req, res, next) => {
  if (err instanceof multer.MulterError && err.code === "LIMIT_FILE_SIZE") {
    return res.status(400).json({
      message: "image must not exceed 2 MB",
    });
  }

  if (err) {
    return res.status(400).json({ message: err.message });
  }

  next();
});

connectToDb().then(() => {
  app.listen((port = process.env.PORT), () => {
    console.log(`server running on http://localhost:${port}`);
  });
});
