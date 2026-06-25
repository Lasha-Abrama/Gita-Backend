const ExpenseService = require("../services/expense.service");

exports.getAllExpenses = async (req, res) => {
  try {
    let expenses = await ExpenseService.getAllExpenses(req.query);
    res.status(200).json(expenses);
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

exports.deleteExpenseById = async (req, res) => {
  try {
    const id = Number(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({
        message: "Invalid Expense ID",
      });
    }

    console.log(id);

    const deletedExpense = await ExpenseService.deleteExpenseById(id);

    console.log(deletedExpense);

    if (!deletedExpense) {
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
