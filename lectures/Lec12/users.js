#!/usr/bin/env node
import { Command } from "commander";

const program = new Command();
program
  .name("Users CLI")
  .description("This is users CLI tool")
  .version("1.0.0");

program
  .command("get-all-users")
  .description("This command returns all users from db")
  .action(() => {
    console.log("User List");
  });

program
  .command("add-user")
  .description("this command adds new user in db")
  .argument("<firstName>", "full name of user")
  .argument("<lastName>", "full name of user")
  .argument("<age>", "full name of user")
  .argument("<isSmoker>", "full name of user")
  .action((fullName, lastName, age, isSmoker) => {
    console.log({ fullName, lastName, age, isSmoker });
  });

program.parse();
