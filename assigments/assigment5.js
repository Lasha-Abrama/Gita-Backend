// 1) დაწერეთ ფუნცქია რომელსაც გადაეცემა 2 პარამეტრი, 1 - ობიექტი, 2- ფროფერთი რომელიც გინდათ რომ წაშალოს, ეს ფუნქცია დააბრუნებს ობიექტს რომელშიც წაშლილი იქნება ის ფროფერთი რასაც გადასცემთ.
const myInfo = {
  name: "Lasha",
  age: 20,
  "full name": "Lasha Abramishvili",
  isSmoker: false,
};

function deletePropFromObj(obj, prop) {
  const copy = { ...obj };
  delete copy[prop];
  return copy;
}
// console.log(deletePropFromObj(myInfo, "full name"));

// 2) მოცემული გაქვთ მასივი  [
//   { name: "Ana", score: 50 },
//   { name: "Nika", score: 80 },
//   { name: "Luka", score: 70 }
// ] თქვენი მიზანია დაწეროთ ფუნცქია რომელიც არგუმენტად მიიღებს ამ მასივს და დააბრუნებს ლიდერბორდს ქულების მიხედვით. შედეგი: [
//   { name: 'Nika', score: 80, rank: 1 },
//   { name: 'Luka', score: 70, rank: 2 },
//   { name: 'Ana',  score: 50, rank: 3 }
// ]
const students_example = [
  { name: "Ana", score: 50 },
  { name: "Nika", score: 80 },
  { name: "Luka", score: 70 },
];

function addRankToStudents(students) {
  const sorted = [...students].sort((a, b) => b.score - a.score);

  for (let i = 0; i < sorted.length; i++) {
    sorted[i].rank = i + 1;
  }

  return sorted;
}
// console.log(addRankToStudents(students_example));

// 3) დაწერეთ ფუნცქია რომელიც დააბრუნებს მხოლოდ იმ ობიექტს რომლის სათაურიც ყველაზე გრძელია. მაგ: [
//   { title: "Up", year: 2009 }, { title: "The Lord of the Rings", year: 2001 }
// ] =>   { title: "The Lord of the Rings", year: 2001 }

const movies_example = [
  { title: "Up", year: 2009 },
  { title: "The Lord of the Rings", year: 2001 },
];
function getLongestTitleMovie(movies) {
  const sorted = [...movies].sort((a, b) => b.title.length - a.title.length);

  return sorted[0];
}
// console.log(getLongestTitleMovie(movies_example));

// 4) დაწერეთ ფუნქცია რომელიც გამოითვლის საშუალო ასაკს თითოეულ დეპარტამენტის და დააბრუნებს შესაბამის ობიექტს. მაგ: [
//   { name: "Ana", dept: "HR", age: 25 },
//   { name: "Nika", dept: "IT", age: 30 },
//   { name: "Luka", dept: "IT", age: 22 }
// ]. => { HR: 25, IT: 26 }
const employees_example = [
  { name: "Ana", dept: "HR", age: 25 },
  { name: "Nika", dept: "IT", age: 30 },
  { name: "Luka", dept: "IT", age: 22 },
];
function getAverageAgeByDept(employees) {
  const groupedByDept = employees.reduce((prev, curr) => {
    const { dept, age } = curr;

    if (!prev[dept]) {
      prev[dept] = { total: 0, count: 0 };
    }

    prev[dept].total += age;
    prev[dept].count++;

    return prev;
  }, {});

  return Object.fromEntries(
    Object.entries(groupedByDept).map(([key, value]) => [
      key,
      value.total / value.count,
    ])
  );
}
// console.log(getAverageAgeByDept(employees_example));

// 5) დაწერეთ ფუნქცია რომელიც პარამეტრად მიიღებს კომენტარების მასივს და დააბრუნებს სიტყვების რაოდენობას მაგ: [
//   { id:1, comment:"Hello world" },
//   { id:2, comment:"This is great!" },
//   { id:3, comment:"" }
// ] => 5 ანუ შეკრიბა ყველა კომენტარის სიტყვების რაოდენობა

const comments_example = [
  { id: 1, comment: "Hello world" },
  { id: 2, comment: "This   is great!" },
  { id: 3, comment: "    " },
];

function countWords(comments) {
  return comments.reduce((tot, curr) => {
    const text = curr.comment.trim();
    if (!text) return tot; // მარტო space ან space-ები რო გვქონდეს რომ არ ჩათვალოს სიტყვად
    tot += text.split(/\s+/).length; // გამოვიყენე regular expression /\s+/, რომ მოიცავდეს 1-ზე მეტი სფეისი რომ ყოფილიყო სიტყვებს შორის მაგ ქეისებსაც.
    return tot;
  }, 0);
}
// console.log(countWords(comments_example));

// 6) დაწერეთ ფუნქცია, რომელიც users-ს დააჯგუფებს department-ის მიხედვით. თითოეულ ჯგუფში users უნდა დალაგდეს salary-ის კლებადობით.
// [
//   { name: "Ana", department: "HR", salary: 2000 },
//   { name: "Nika", department: "IT", salary: 5000 },
//   { name: "Luka", department: "IT", salary: 3500 },
//   { name: "Mariam", department: "HR", salary: 3000 }
// ] შედეგი {
//   HR: [
//     { name: "Mariam", department: "HR", salary: 3000 },
//     { name: "Ana", department: "HR", salary: 2000 }
//   ],
//   IT: [
//     { name: "Nika", department: "IT", salary: 5000 },
//     { name: "Luka", department: "IT", salary: 3500 }
//   ]
// }
const users_example = [
  { name: "Ana", department: "HR", salary: 2000 },
  { name: "Nika", department: "IT", salary: 5000 },
  { name: "Luka", department: "IT", salary: 3500 },
  { name: "Mariam", department: "HR", salary: 3000 },
];

function groupAndSortUsers(users) {
  const groupedByDepartment = users.reduce((prev, curr) => {
    if (!prev[curr.department]) {
      prev[curr.department] = [];
    }
    prev[curr.department].push(curr);
    return prev;
  }, {});

  for (let dept in groupedByDepartment) {
    groupedByDepartment[dept].sort((a, b) => b.salary - a.salary);
  }

  return groupedByDepartment;
}
// console.log(groupAndSortUsers(users_example));

// 7) დაწერეთ ფუნქცია, რომელიც მიიღებს cart მასივს და დააბრუნებს საბოლოო ფასს.
// [
//   { title: "Laptop", price: 2000, quantity: 1, discountPercent: 10 },
//   { title: "Mouse", price: 50, quantity: 2, discountPercent: 0 },
//   { title: "Keyboard", price: 100, quantity: 1, discountPercent: 20 }
// ] შედეგი: 1980

const cart_example = [
  { title: "Laptop", price: 2000, quantity: 1, discountPercent: 10 },
  { title: "Mouse", price: 50, quantity: 2, discountPercent: 0 },
  { title: "Keyboard", price: 100, quantity: 1, discountPercent: 20 },
];

function findFinalPrice(cart) {
  const finalPrice = cart.reduce((tot, curr) => {
    tot += curr.price * curr.quantity * ((100 - curr.discountPercent) / 100);
    return tot;
  }, 0);

  return finalPrice;
}
// console.log(findFinalPrice(cart_example));

// 8) დაწერეთ ფუნქცია, რომელიც users მასივს გადააქცევს ობიექტად.
// [
//   { id: 1, name: "Ana", age: 25 },
//   { id: 2, name: "Nika", age: 30 },
//   { id: 3, name: "Luka", age: 22 }
// ]
// შედეგი:
// {
//   1: { id: 1, name: "Ana", age: 25 },
//   2: { id: 2, name: "Nika", age: 30 },
//   3: { id: 3, name: "Luka", age: 22 }
// }

const users = [
  { id: 1, name: "Ana", age: 25 },
  { id: 2, name: "Nika", age: 30 },
  { id: 3, name: "Luka", age: 22 },
];

function arrayToObject(arr) {
  return arr.reduce((prev, curr) => {
    prev[curr.id] = curr;
    return prev;
  }, {});
}
// console.log(arrayToObject(users));
