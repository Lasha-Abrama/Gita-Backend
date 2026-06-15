#!/usr/bin/env node
import { Command } from "commander";
import { readFile } from "./utils/read-file.js";
import { writeFile } from "./utils/write-file.js";

const program = new Command();
program
  .name("Test CLI using commander")
  .description("This is simple CLI usage")
  .version("1.0.0");

program
  .command("Hello")
  .description("This command returns Hello World")
  .action(() => {
    console.log("Hello World");
  });

program
  .command("sum")
  .description("This command sum two numbers")
  .argument("<num1>")
  .argument("<num2>")
  .action((num1, num2) => {
    console.log(Number(num1) + Number(num2));
  });

program
  .command("add-phone")
  .description("this command adds new product in db")
  .argument("<name>", "product name")
  .argument("<price>", "product price")
  .option("-s, --stock <stock>", "this is stock of phone", 10)
  .action(async (name, price, opts) => {
    const products = await readFile("products.json", true);

    const newPhone = {
      name,
      price: Number(price),
      stock: Number(opts.stock),
    };

    products.push(newPhone);
    await writeFile("products.json", products);

    console.log("Phone Added Succesfully!");
  });

program
  .command("get-all-phones")
  .option("-p, --price <price>", "expensive products")
  .action(async (opts) => {
    const products = await readFile("products.json", true);
    if (opts.price) {
      return console.log(
        products.filter((prod) => prod.price >= Number(opts.price)),
      );
    }
    console.log(products);
  });

program.parse();
