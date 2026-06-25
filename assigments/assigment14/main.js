const express = require("express");
const { readFile, writeFile } = require("./utils/fs.util");
const ExpenseRouter = require("./routes/expense.router");
const RandomFactRouter = require("./routes/fact.router");

const app = express();

app.use(express.json());

app.use("/expenses", ExpenseRouter);
app.use("/random-fact", RandomFactRouter);

app.listen((port = 4000), () => {
  console.log(`server running on http://localhost:${port}`);
});
