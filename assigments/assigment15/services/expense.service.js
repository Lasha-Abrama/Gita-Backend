const ExpenseModel = require("../modules/expense.module");

// expenses?category=shopping,gym,food&amountFrom=200&amountTo=500
exports.getAllExpenses = async (query) => {
  let filter = {};
  if ("category" in query) {
    filter["category"] = { $in: query.category.split(",") };
  }
  if ("amountFrom" in query) {
    filter["price"] = {
      ...filter["price"],
      $gte: Number(query.amountFrom),
    };
  }
  if ("amountTo" in query) {
    filter["price"] = {
      ...filter["price"],
      $lte: Number(query.amountTo),
    };
  }

  const expenses = await ExpenseModel.find(filter);
  return expenses;
};

exports.getTopExpenses = async (amount = 5) => {
  let topExpenses = await ExpenseModel.find()
    .sort({ currency: 1, price: -1 })
    .limit(amount);
  return topExpenses;
};

exports.createExpense = async (body) => {
  const newExpense = await ExpenseModel.create({
    category: body.category,
    price: body.price,
    currency: body.currency,
  });
  return newExpense;
};

exports.updateExpenseById = async (id, body) => {
  const updatedExpense = await ExpenseModel.findByIdAndUpdate(id, body, {
    new: true,
  });
  if (!updatedExpense) {
    return null;
  }
  return updatedExpense;
};

exports.deleteExpenseById = async (id) => {
  const deletedExpense = await ExpenseModel.findByIdAndDelete(id);
  if (!deletedExpense) {
    return "NOT_FOUND";
  }
  return deletedExpense;
};
