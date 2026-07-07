const { readFile, writeFile } = require("../utils/fs.util");
const path = require("path");

const filePath = path.join(__dirname, "../data/expenses.json");

const readExpenses = async () => {
  const data = await readFile(filePath);
  return data;
};

const writeExpenses = async (expenses) => {
  await writeFile(filePath, expenses);
};

exports.getAllExpenses = async (category, sort) => {
  let expenses = await readExpenses();

  if (category) {
    expenses = expenses.filter((expense) =>
      expense.category.toLowerCase().startsWith(category.toLowerCase()),
    );
  }

  if (sort === "a-z") {
    expenses.sort((a, b) => a.category.localeCompare(b.category));
  }

  if (sort === "z-a") {
    expenses.sort((a, b) => b.category.localeCompare(a.category));
  }

  if (sort === "latest") {
    expenses.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  }

  if (sort === "oldest") {
    expenses.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
  }

  if (sort === "smallest") {
    expenses.sort((a, b) => Number(a.amount) - Number(b.amount));
  }

  if (sort === "biggest") {
    expenses.sort((a, b) => Number(b.amount) - Number(a.amount));
  }

  return expenses;
};

exports.getExpenseById = async (id) => {
  const expenses = await readExpenses();
  return expenses.find((expense) => expense.id === Number(id));
};

exports.createExpense = async (expense) => {
  const expenses = await readExpenses();

  const lastId = expenses.reduce((maxId, item) => {
    return item.id > maxId ? item.id : maxId;
  }, 0);

  const newExpense = {
    id: lastId + 1,
    category: expense.category.trim(),
    amount: Number(expense.amount),
    description: expense.description.trim(),
    createdAt: new Date().toISOString(),
  };

  expenses.push(newExpense);
  await writeExpenses(expenses);

  return newExpense;
};

exports.updateExpense = async (id, updatedData) => {
  const expenses = await readExpenses();
  const index = expenses.findIndex((expense) => expense.id === Number(id));

  if (index === -1) return null;

  expenses[index] = {
    ...expenses[index],
    category: updatedData.category.trim(),
    amount: Number(updatedData.amount),
    description: updatedData.description.trim(),
  };

  await writeExpenses(expenses);
  return expenses[index];
};

exports.deleteExpense = async (id) => {
  const expenses = await readExpenses();
  const index = expenses.findIndex((expense) => expense.id === Number(id));

  if (index === -1) return null;

  const deletedExpense = expenses.splice(index, 1)[0];
  await writeExpenses(expenses);

  return deletedExpense;
};

exports.getExpenseReport = async () => {
  const expenses = await readExpenses();

  const totalAmount = expenses.reduce((total, expense) => {
    return total + Number(expense.amount);
  }, 0);

  const categories = expenses.reduce((acc, expense) => {
    const category = expense.category;

    if (!acc[category]) {
      acc[category] = {
        category,
        count: 0,
        total: 0,
      };
    }

    acc[category].count += 1;
    acc[category].total += Number(expense.amount);

    return acc;
  }, {});

  return {
    totalCount: expenses.length,
    totalAmount,
    categories: Object.values(categories),
  };
};
