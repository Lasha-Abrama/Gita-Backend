// const person = {
//   name: "Lasha",
//   age: 24,
//   isSmoker: false,
//   grade: 0,
//   hobbies: ["swim", "run", "watching tv"],
//   "full name": "Lasha Abramishvili",
//   sayHello() {
//     return "hello";
//   },
//   password: "password",
// };

// person.lastName = "Abramishvili";
// person["position"] = "Full-Stack Developer";
// delete person.isSmoker;
// const { password, ...rest } = person;
// console.log(rest);
// console.log(person.hobbies);
// console.log(person["age"]);
// console.log(person.sayHello());

// TASKS
// 1
// const users = [
//   { id: 1, name: "giorgi", age: 24, isSmoker: true },
//   { id: 2, name: "nika", age: 44, isSmoker: false },
//   { id: 3, name: "mariami", age: 32, isSmoker: true },
//   { id: 4, name: "tekla", age: 21, isSmoker: false },
//   { id: 5, name: "daviti", age: 24, isSmoker: true },
// ];
// const names = users.map((user) => user.name);
// console.log(names);

// 2
// const products = [
//   { name: "iphone", price: 1500 },
//   { name: "macbook", price: 3500 },
//   { name: "lenovo", price: 2500 },
//   { name: "microphone", price: 100 },
//   { name: "headset", price: 500 },
//   { name: "samsung", price: 1800 },
// ];
// const filteredProds = products
//   .filter((product) => product.price > 1000)
//   .reduce((tot, cur) => tot + cur.price, 0);
// console.log(filteredProds);

// 3
// const users = [
//   { id: 1, name: "giorgi", age: 24, isSmoker: true },
//   { id: 2, name: "nika", age: 44, isSmoker: false },
//   { id: 3, name: "mariami", age: 32, isSmoker: true },
//   { id: 4, name: "tekla", age: 21, isSmoker: false },
//   { id: 5, name: "daviti", age: 24, isSmoker: true },
// ];

// const groupedByAge = users.reduce((prev, curr) => {
//   const { name, age } = curr;
//   if (!prev[age]) {
//     prev[age] = [];
//   }
//   prev[age].push(curr.name);
//   return prev;
// }, {});

// console.log(groupedByAge);

// 4
// const students = [
//   { name: "Ana", scores: [80, 90, 100] },
//   { name: "Nika", scores: [70, 60, 75] },
//   { name: "Luka", scores: [95, 85, 90] },
// ];
// option 1
// let highestAvgStud = students[0];
// let highestAvg = 0;

// for (let student of students) {
//   const sum = student.scores.reduce((a, b) => a + b, 0);
//   const avg = sum / student.scores.length;

//   if (avg > highestAvg) {
//     highestAvg = avg;
//     highestAvgStud = student;
//   }
// }

// console.log(highestAvgStud);

// option 2
// const topStudent = students.reduce((prev, curr) => {
//   const avg = arr => arr.reduce((a, b) => a + b) / arr.length;
//   return avg(curr.scores) > avg(prev.scores) ? curr : prev;
// });
