const express = require("express");
const ExpenseRouter = require("./routes/expense.router");
const connectToDb = require("./config/db.config");
const { default: mongoose } = require("mongoose");
require("dotenv").config();

const app = express();

app.use(express.json());

app.use("/expenses", ExpenseRouter);

connectToDb().then(() => {
  app.listen((port = process.env.PORT), () => {
    console.log(`server running on http://localhost:${port}`);
  });
});
