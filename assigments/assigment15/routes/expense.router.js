const { Router } = require("express");
const ExpenseController = require("../controllers/expense.controller");
const isKeyMiddleware = require("../middlewares/is-key.middleware");
const isAllRequiredFields = require("../middlewares/is-all-required-fields");
const isValidMongoIdMiddleware = require("../middlewares/is-valid-mongo-id.middleware");

const expenseRouter = new Router();

expenseRouter.get("/", ExpenseController.getAllExpenses);
expenseRouter.post("/", isAllRequiredFields, ExpenseController.createExpense);
expenseRouter.delete(
  "/:id",
  isKeyMiddleware,
  isValidMongoIdMiddleware,
  ExpenseController.deleteExpenseById,
);
expenseRouter.put(
  "/:id",
  isValidMongoIdMiddleware,
  ExpenseController.updateExpenseById,
);
expenseRouter.get("/top-5", ExpenseController.getTopExpenses);

module.exports = expenseRouter;
