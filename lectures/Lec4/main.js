// Filter

// const nums = [12, 4, 15, 63, 21, 78];
// option 1
// const filteredArr = nums.filter((num) => {
//   if (num > 20) {
//     return num;
//   }
// });
// option 2
// const filteredArr = nums.filter((num) => num > 20);
// console.log(filteredArr);

// const fruits = ["apple", "banana", "pear", "watermelon"];
// option 1
// const filteredArr = fruits.filter((fruit) => fruit.length >= 5);
// option 2
// const filteredArr = fruits.filter((fruit) => {
//   if (fruit.length >= 5) {
//     return fruit;
//   }
// });
// console.log(filteredArr);

// Map - !!ramden elementiani masivic aris igives abrunebs aucileblad

// const nums = [1, 2, 3, 4, 5];
// option 1
// const sqrNums = nums.map((num) => num ** 2);
// option 2
// const sqrNums = nums.map((num) => {
//   return num > 2;
// });
// console.log(sqrNums);

// const names = ["nika", "giorgi", "luka"];
// const capitalNames = names
//   .map
// pirveli uppercase
// (name) => name[0].toUpperCase() + name.substring(1, name.length)
// (name) => name[0].toUpperCase() + name.slice(1)
// bolo uppercase
// (name) => name.slice(0, name.length - 1) + name[name.length - 1].toUpperCase()
// ();
// console.log(capitalNames);

// Find - pirvelive trues abrunebs da sruldeba procesi

// const nums = [12, 4, 15, 63, 21, 78];
// const firstOddNum = nums.find((num) => num % 2);
// console.log(firstOddNum);

// FindIndex

// const nums = [12, 4, 15, 63, 21, 78];
// const firstOddNum = nums.findIndex((num) => num % 2);
// console.log(firstOddNum);

// ForEach

// const nums = [12, 4, 15, 63, 21, 78];
// const Odds = [];
// nums.forEach((num) => {
//   if (num % 2 === 0) {
//     Odds.push(num);
//   }
// });
// console.log(Odds);

// Some / every => boolean

// const nums = [12, 4, 15, 63, 21, 78];
// const isAllEvenNums = nums.every((num) => num % 2 === 0);
// const isSomeOfThemEvenNums = nums.some((num) => num % 2 === 0);
// console.log(isAllEvenNums);
// console.log(isSomeOfThemEvenNums);

// reduce => sum/multiply, grouped

// const nums = [12, 4, 15, 63, 21, 78];
// const totalNumsSum = nums.reduce((prev, curr) => {
//   return prev * curr;
// }, 1); // 0 => sum
// console.log(totalNumsSum, "multiply");

// grouped - object

// const colors = ["red", "green", "yellow", "yellow", "black"];
// const groupedByColor = colors.reduce((prev, curr) => {
//   if (!prev[curr]) {
//     prev[curr] = 1;
//   } else {
//     prev[curr] += 1;
//   }
//   return prev;
// }, {});
// console.log(groupedByColor);

// sort

// const nums = [12, 4, 15, 63, 21, 78];
// const sortedArr = nums.sort((a, b) => b - a);
// console.log(sortedArr);

// isArray

// function sumArr(arr) {
//   if (Array.isArray(arr)) {
//     return arr.reduce((tot, curr) => tot + curr, 0);
//   }
// }
// console.log(sumArr([1, 2, 3]));

// concat

// const a = [1, 2, 3];
// const b = [4, 5, 6];

// const c = a.concat(b);
// const c2 = [...a, ...b];
// console.log(c);
// console.log(c2);

// indexOf / lastIndexOf

// const a = [1, 2, 3, 4, 1, 1];

// const indexOf1 = a.indexOf(2);
// const lastIndexOf1 = a.lastIndexOf(4);
// console.log(indexOf1);
// console.log(lastIndexOf1);

// reverse

// const arr = [1, 2, 3];
// const reversedArr = arr.reverse();
// console.log(reversedArr);

// Flat

// const a = [1, [2, 3, [4, 5, [1, 2]]], [6], [7, 8, [9, 10]]];
// const b = [1, 2, 3, [4, 5, 6]];

// const flatedA = a.flat(Infinity);
// console.log(flatedA);

// Tasks
// 1
// const nums = [2, 55, 12, 3, 41, 87];
// const filteredArr = nums
//   .map((num) => num * 2)
//   .filter((num) => num % 3 === 0 && num > 0);
// console.log(filteredArr);
// 2
// const nums = [2, -55, -12, 3, 41, 87];
// const filteredArr = nums
//   .filter((num) => num > 0)
//   .reduce((tot, curr) => tot + curr, 0);
// console.log(filteredArr);
// 3
// function reverseStr(str) {
//   return str.split("").reverse().join("");
// }
// console.log(reverseStr("Hello"));
// 4
// const transactions = [
//   { amount: 10, currency: "USD" },
//   { amount: 20, currency: "EUR" },
//   { amount: 5, currency: "USD" },
//   { amount: 50, currency: "EUR" },
// ];
// const groupedByCurrency = transactions.reduce((prev, curr) => {
//   if (!prev[curr.currency]) {
//     prev[curr.currency] = curr.amount;
//   } else {
//     prev[curr.currency] += curr.amount;
//   }
//   return prev;
// }, {});

// console.log(groupedByCurrency);
