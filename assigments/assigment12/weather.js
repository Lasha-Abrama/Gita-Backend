#!/usr/bin/env node
import { Command } from "commander";
import chalk from "chalk";

const program = new Command();

program.argument("<city>").action(async (city) => {
  try {
    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=895284fb2d2c50a520ea537456963d9c`,
    );

    const data = await res.json();

    console.log(chalk.bold.cyan(`City: ${data.name}`));
    console.log(chalk.green(`Weather: ${data.weather[0].main}`));
    console.log(chalk.yellow(`Temperature: ${data.main.temp} Celsius`));
    console.log(chalk.magenta(`Feels like: ${data.main.feels_like} Celsius`));
  } catch (err) {
    console.log(chalk.red("City with this name not found"));
  }
});

program.parse();

// 2) გააკეთეთ weather-cli ხელსაწყო რომელსაც ექნება შემდეგი ფუნქციონალი:
// weather-cli tbilisi => დაგიბრუნებთ თბილისში რა ამინდია იმას, თუ ისეთ ქალაქს ჩაწერთ რაც არ იძებნება დააბრუნეთ შესაბამისი ერორი.
// ამინდის ინფორმაცია უნდა წამოიღოთ შემდეგი ეიპიაიდან: https://api.openweathermap.org/data/2.5/weather?q={cityName}&units=metric&appid=895284fb2d2c50a520ea537456963d9c
// cityName ის ნაცვლად უნდა გამოიყენოთ არგუმენტად მიღებული ქალაქის სახელი და გამოაჩინოთ შესაბამისი მონაცემები.
