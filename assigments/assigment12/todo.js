#!/usr/bin/env node
import { Command } from "commander";
import { readFile } from "./utils/read-file.js";
import { writeFile } from "./utils/write-file.js";
import path from "path";
const __dirname = import.meta.dirname;

const program = new Command();
const fullPath = path.join(__dirname, "todos.json");

program
  .name("Todos CLI")
  .description("This is simple todo cli tool")
  .version("1.2.3");

program
  .command("show")
  .description("this command returns all todos from db")
  .action(async () => {
    const todos = await readFile(fullPath, true);
    console.log(todos);
  });

program
  .command("add")
  .description("this command adds new todo in db")
  .argument("<todoName>", "Todo Name")
  .action(async (title) => {
    const todos = await readFile(fullPath, true);

    const newTodo = {
      id: todos.length > 0 ? todos.length + 1 : 1,
      title,
      isDone: false,
    };
    todos.push(newTodo);

    await writeFile(fullPath, todos);

    console.log(newTodo);
  });

program
  .command("delete")
  .description("this command deletes todo from db by id")
  .argument("<id>", "Todo ID")
  .action(async (id) => {
    const todos = await readFile(fullPath, true);

    if (!todos.some((todo) => todo.id === Number(id))) {
      return console.log("Todo not found");
    }

    const deletedTodo = todos.find((todo) => todo.id === Number(id));

    const modifiedTodo = todos.filter((todo) => todo.id !== Number(id));

    await writeFile(fullPath, modifiedTodo);

    console.log(deletedTodo);
  });

program
  .command("update")
  .description("this command updates todo's name in db by id")
  .argument("<id>", "Todo ID")
  .option("-n, --name <todoName>", "Todo Name")
  .option("-d, --done", "Done or not")
  .action(async (id, opts) => {
    const todos = await readFile(fullPath, true);

    const index = todos.findIndex((todo) => todo.id === Number(id));
    if (index === -1) {
      console.log("Wrong id provided");
      return;
    }

    const updatedTodo = {};
    if (opts.name) {
      updatedTodo["title"] = opts.name;
    }
    if (opts.done) {
      updatedTodo.isDone = true;
    }

    todos[index] = {
      ...todos[index],
      ...updatedTodo,
    };
    await writeFile(fullPath, todos);

    console.log(todos[index]);
  });

// program.parse();

// 1) დაწერეთ todo-cli ხელსაწყო ქომანდერის გამოყენებით რომელსაც ექნება შემდეგი ფუნცქიონალი:
// todo-cli show => დააბრუნებს ყველა თუდუს ობიექტს
// todo-cli add todoName => დაგიბრუნებთ ახალ შექმნილ თუდუს
// todo-cli delete todoId => დაგიბრუნებთ წაშლილ თუდუს
// todo-cli todoId --name todoName => დაგიბრუნებთ განახლებულ თუდუს.
// თუდუს ობიექტს უნდა გამოიყურებოდეს: {id: 1, title: "ReadBook", isDone: false}
// შეგიძლიათ დაამატოთ სხვადასხვა ფროფერთიები, გაითვალისიწნეთ განახლება უნდა მოხდეს option მეთოდით.
