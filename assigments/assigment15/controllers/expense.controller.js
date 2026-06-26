const ExpenseService = require("../services/expense.service");

exports.getAllExpenses = async (req, res) => {
  try {
    let expenses = await ExpenseService.getAllExpenses(req.query);
    res.json(expenses);
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
    });
  }
};

exports.getTopExpenses = async (req, res) => {
  try {
    let topExpenses = await ExpenseService.getTopExpenses();
    res.json(topExpenses);
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
    });
  }
};
exports.createExpense = async (req, res) => {
  try {
    const newExpense = await ExpenseService.createExpense(req.body);

    res.status(201).json({ success: true, data: newExpense });
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
    });
  }
};

exports.updateExpenseById = async (req, res) => {
  try {
    const updatedExpense = await ExpenseService.updateExpenseById(
      req.params.id,
      req.body,
    );

    if (!updatedExpense) {
      return res.status(404).json({ message: "Expense not Found!" });
    }

    res.json({
      message: "Expense updated Successfully!",
      data: updatedExpense,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
    });
  }
};

exports.deleteExpenseById = async (req, res) => {
  try {
    const deletedExpense = await ExpenseService.deleteExpenseById(
      req.params.id,
    );

    if (deletedExpense === "NOT_FOUND") {
      return res.status(404).json({ message: "Expense not Found!" });
    }

    res.json({
      message: "Expense deleted Successfully!",
      data: deletedExpense,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
    });
  }
};
