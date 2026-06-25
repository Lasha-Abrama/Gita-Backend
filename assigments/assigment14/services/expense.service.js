const { readFile, writeFile } = require("../utils/fs.util");

exports.getAllExpenses = async (query) => {
  const expenses = await readFile("expenses.json", true);
  const page = Math.max(Number(query.page) || 1, 1);
  const take = Math.min(Number(query.take) || 30, 30);

  const start = (page - 1) * take;
  const end = start + take;

  const result = expenses.slice(start, end);

  return {
    page,
    take,
    total: expenses.length,
    data: result,
  };
};

exports.createExpense = async (body) => {
  const expenses = await readFile("expenses.json", true);
  const lastId = expenses[expenses.length - 1]?.id || 0;

  const newExpense = {
    id: lastId + 1,
    category: body.category,
    price: body.price,
    currency: body.currency,
    createdAt: new Date().toISOString(),
  };
  expenses.push(newExpense);
  await writeFile("expenses.json", expenses);

  return newExpense;
};

exports.deleteExpenseById = async (id) => {
  const expenses = await readFile("expenses.json", true);
  const index = expenses.findIndex((expense) => expense.id === id);
  if (index === -1) {
    return null;
  }

  const deletedExpense = expenses.splice(index, 1);
  await writeFile("expenses.json", expenses);

  return deletedExpense[0];
};
