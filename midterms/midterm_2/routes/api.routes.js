const express = require("express");
const router = express.Router();

const ExpenseService = require("../services/expense.service");

router.get("/expenses", async (req, res) => {
  const expenses = await ExpenseService.getAllExpenses(
    req.query.category,
    req.query.sort,
  );

  res.json(expenses);
});

router.get("/expenses/:id", async (req, res) => {
  const expense = await ExpenseService.getExpenseById(req.params.id);

  if (!expense) {
    return res.status(404).json({ message: "Expense not found" });
  }

  res.json(expense);
});

router.post("/expenses", async (req, res) => {
  const expense = await ExpenseService.createExpense(req.body);
  res.status(201).json(expense);
});

router.put("/expenses/:id", async (req, res) => {
  const expense = await ExpenseService.updateExpense(req.params.id, req.body);

  if (!expense) {
    return res.status(404).json({ message: "Expense not found" });
  }

  res.json(expense);
});

router.delete("/expenses/:id", async (req, res) => {
  const expense = await ExpenseService.deleteExpense(req.params.id);

  if (!expense) {
    return res.status(404).json({ message: "Expense not found" });
  }

  res.json({
    message: "Expense deleted successfully",
    data: expense,
  });
});

module.exports = router;
