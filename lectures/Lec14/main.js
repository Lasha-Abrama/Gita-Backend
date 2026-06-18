const express = require("express");
const { readFile, writeFile } = require("./utils/fs.util.js");

const app = express();

// app.use(json());
app.get("/", (req, res) => {
  res.send("Hello World");
});

app.get("/users", async (req, res) => {
  const users = await readFile("users.json", true);
  res.json(users);
});

app.post("/users", async (req, res) => {
  res.send(req.body);
});

app.listen((port = 4000), () => {
  console.log(`server running on localhost http://localhost:${port}`);
});
