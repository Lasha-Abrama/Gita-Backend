const { Router } = require("express");
const ExpenseController = require("../controllers/expense.controller");
const isKeyMiddleware = require("../middlewares/is-key.middleware");
const isAllRequiredFields = require("../middlewares/is-all-required-fields");

const expenseRouter = new Router();

expenseRouter.get("/", ExpenseController.getAllExpenses);
expenseRouter.post("/", isAllRequiredFields, ExpenseController.createExpense);
expenseRouter.delete(
  "/:id",
  isKeyMiddleware,
  ExpenseController.deleteExpenseById,
);

module.exports = expenseRouter;
