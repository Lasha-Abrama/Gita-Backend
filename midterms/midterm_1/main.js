#!/usr/bin/env node

import { Command } from "commander";
import chalk from "chalk";
import { readFile, writeFile } from "./utils/fs.util.js";

const program = new Command();

program
  .name("Expenses Cli")
  .description("Simple expenses CRUD CLI app")
  .version("1.0.0");

program
  .command("show")
  .description("this command returns list of expenses")
  .option("-a, --asc", "this option sorts prices ascending by date")
  .option("-d, --desc", "this option sorts prices descending by date")
  .option("-p, --page <page>", "this is page", 1)
  .option("-t, --take <take>", "this is page", 5)
  .option("-c, --category <category>", "this return expenses by category")
  .option("-l, --last", "this returns the latest expense")
  .action(async (opts) => {
    const expenses = await readFile("expenses.json");

    let result = [...expenses];

    if (opts.asc && opts.desc) {
      console.log(chalk.magentaBright("Choose only one sorting option"));
      return;
    }

    if (opts.category) {
      result = result.filter(
        (expense) =>
          expense.category.toLowerCase() === opts.category.toLowerCase(),
      );

      if (result.length === 0) {
        console.log(chalk.redBright("No expenses found"));
        return;
      }
    }
    if (opts.asc) {
      result = result.sort(
        (a, b) => new Date(a.createdAt) - new Date(b.createdAt),
      );
    }
    if (opts.desc) {
      result = result.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt),
      );
    }
    if (opts.last) {
      const lastExpense = result[result.length - 1];

      if (!lastExpense) {
        console.log(chalk.red("No expenses found"));
        return;
      }

      console.log(lastExpense);
      return;
    }

    const page = Math.max(Number(opts.page), 1);
    const take = Math.max(1, Math.min(Number(opts.take), 10));
    result = result.slice((page - 1) * take, page * take);
    console.log(chalk.blue(`Page ${page} | Showing ${result.length} expenses`));
    console.log(result);
  });

program
  .command("search <date>")
  .description("this command returns list of expenses by date")
  .action(async (date) => {
    const isValidDate = /^\d{4}-\d{2}-\d{2}$/.test(date);

    if (!isValidDate) {
      console.log(
        chalk.red("Invalid date format!") +
          "\n" +
          chalk.blue("Expected: YYYY-MM-DD (example: 2026-06-12)"),
      );
      return;
    }

    const expenses = await readFile("expenses.json");
    const filteredByDate = expenses.filter((expense) =>
      expense.createdAt.startsWith(date),
    );

    if (filteredByDate.length === 0) {
      console.log(chalk.greenBright("No expenses found on that date"));
      return;
    }

    console.log(chalk.green(`Expenses on ${date}:`));

    filteredByDate.forEach((expense) => {
      const [d, t] = expense.createdAt.split("T");
      const time = t.split(".")[0];

      console.log(
        `${expense.id}. ${expense.category} | ${expense.price} ${expense.currency} | ${d} ${time}`,
      );
    });
  });

program
  .command("add")
  .description("this command adds new expense in db")
  .argument("<category>", "expense category field")
  .argument("<price>", "expense price field")
  .argument("<currency>", "expense currency field")
  .action(async (category, price, currency) => {
    const expenses = await readFile("expenses.json");
    const lastId = expenses[expenses.length - 1]?.id || 0;
    const numPrice = Number(price);
    const allowedCurrencies = ["GEL", "EUR", "USD"];
    currency = currency.toUpperCase();

    if (Number.isNaN(numPrice)) {
      console.log(chalk.red("Price must be a number"));
      return;
    }
    if (numPrice < 10) {
      console.log(chalk.bgRed.white(`Price must be at least 10 ${currency}`));
      return;
    }

    if (!allowedCurrencies.includes(currency)) {
      console.log(chalk.red("Invalid currency!"));
      console.log(chalk.green("Allowed: GEL, EUR, USD"));
      return;
    }
    const newExpense = {
      id: lastId + 1,
      category,
      price: numPrice,
      currency,
      createdAt: new Date().toISOString(),
    };

    expenses.push(newExpense);
    await writeFile("expenses.json", expenses);
    console.log(chalk.green("Expense added successfully"));
  });

program
  .command("delete")
  .description("This command deletes expense by id")
  .argument("<id>", "Unique id of expense")
  .action(async (id) => {
    const expenses = await readFile("expenses.json");
    const index = expenses.findIndex((expense) => expense.id === Number(id));
    if (index === -1) {
      console.log(chalk.red("Wrong id provided"));
      return;
    }

    const deletedExpense = expenses.splice(index, 1);
    await writeFile("expenses.json", expenses);

    console.log(
      `Deleted Expense: ${deletedExpense[0].id}. ${deletedExpense[0].category} | ${deletedExpense[0].price} | ${deletedExpense[0].currency}`,
    );
  });

program
  .command("update")
  .description("This command updates expense by id")
  .argument("<id>", "Unique id of expense")
  .option("-c, --category <category>", "category property")
  .option("-p, --price <price>", "price property")
  .option("--currency <currency>", "currency property")
  .action(async (id, opts) => {
    const expenses = await readFile("expenses.json");
    const index = expenses.findIndex((expense) => expense.id === Number(id));
    const allowedCurrencies = ["GEL", "EUR", "USD"];
    if (index === -1) {
      console.log(chalk.red("Wrong id provided"));
      return;
    }

    if (
      opts.currency &&
      !allowedCurrencies.includes(opts.currency.toUpperCase())
    ) {
      console.log(chalk.red("Invalid currency!"));
      console.log(chalk.green("Allowed: GEL, EUR, USD"));
      return;
    }

    if (!opts.category && !opts.price && !opts.currency) {
      console.log(chalk.red("Nothing to update"));
      return;
    }

    const updateReq = {};
    if (opts.category) {
      updateReq["category"] = opts.category;
    }
    if (opts.price) {
      const numPrice = Number(opts.price);

      if (Number.isNaN(numPrice)) {
        console.log(chalk.red("Price must be a number"));
        return;
      }

      if (numPrice < 10) {
        console.log(chalk.red("Price must be at least 10"));
        return;
      }

      updateReq.price = numPrice;
    }
    if (opts.currency) {
      updateReq["currency"] = opts.currency.toUpperCase();
    }

    expenses[index] = {
      ...expenses[index],
      ...updateReq,
    };
    await writeFile("expenses.json", expenses);
    console.log(chalk.green("Expense updated successfully"));
  });

program
  .command("get")
  .argument("<id>", "Unique id of Expense")
  .description("this command returns an expense by id")
  .action(async (id) => {
    const expenses = await readFile("expenses.json");

    const expense = expenses.find((expense) => expense.id === Number(id));

    if (!expense) {
      console.log(chalk.red("Expense not found"));
      return;
    }

    console.log(expense);
  });

program.parse();
