const express = require("express");
const router = express.Router();

const ExpenseService = require("../services/expense.service");

router.get("/", async (req, res) => {
  const { category, sort } = req.query;
  const expenses = await ExpenseService.getAllExpenses(category, sort);

  res.render("pages/index", {
    expenses,
    category: category || "",
    sort: sort || "",
  });
});

router.get("/expenses/create", (req, res) => {
  res.render("pages/create");
});

router.post("/expenses", async (req, res) => {
  await ExpenseService.createExpense(req.body);
  res.redirect("/");
});

router.get("/expenses/report", async (req, res) => {
  const report = await ExpenseService.getExpenseReport();
  res.render("pages/report", { report });
});

router.get("/expenses/:id", async (req, res) => {
  const expense = await ExpenseService.getExpenseById(req.params.id);

  if (!expense) {
    return res.status(404).send("Expense not found");
  }

  res.render("pages/details", { expense });
});

router.get("/expenses/:id/edit", async (req, res) => {
  const expense = await ExpenseService.getExpenseById(req.params.id);

  if (!expense) {
    return res.status(404).send("Expense not found");
  }

  res.render("pages/edit", { expense });
});

router.post("/expenses/:id/update", async (req, res) => {
  await ExpenseService.updateExpense(req.params.id, req.body);
  res.redirect("/");
});

router.post("/expenses/:id/delete", async (req, res) => {
  await ExpenseService.deleteExpense(req.params.id);
  res.redirect("/");
});

module.exports = router;
