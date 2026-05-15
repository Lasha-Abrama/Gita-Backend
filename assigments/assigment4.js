// 1) წაშალეთ მასივის თითოეულ ელემენტს წაუშლის ბოლო სიმბოლოს მაგ: ["one","two","three"] => ["on","tw","thre"]
const arr = ["one", "two", "three"];
const modifiedArr = arr.map((word) => word.slice(0, -1));
// console.log(modifiedArr);

// 2) იპოვეთ მასივში 2 ყველაზე პატარა ელემენტის ჯამი, მაგ: [19,5,42,2,77] => 7
const numbers = [19, 5, 42, 2, 77];
numbers.sort((a, b) => a - b);
const sumFirstTwoNums = numbers[0] + numbers[1];
// console.log(sumFirstTwoNums);

// 3) გამოთვალეთ მასივის რიცხვების ჯამი ForEach ის გამოყენებით მაგ: [10, 12, 4, 2] => 28
const nums = [10, 12, 4, 2];
let sum = 0;
nums.forEach((num) => (sum += num));
// console.log(sum);

// 4) დაამუშავეთ მასივი რომ დააბრუნოს სტინგი მხოლოდ იმ ელემენტებით რომლის სიგრძე არის 5-ზე მეტი და შეაწებეთ #-ით მაგ: ["cat","parrot","dog","elephant"] => "PARROT#ELEPHANT"
const words = ["cat", "parrot", "dog", "elephant"];
const filteredWords = words
  .filter((word) => word.length > 5)
  .join("#")
  .toUpperCase();
// console.log(filteredWords);

// 5) დააჯგუფეთ მასივი კლასის მიხედვით და გამოითვალეთ საშუალო ქულა, მაგ:
// [
//   { name: "Ann",  cls: "A", grade: 90 },
//   { name: "Ben",  cls: "B", grade: 75 },
//   { name: "Cara", cls: "A", grade: 80 }
// ]
// შედეგი: {"A": 85, "B" 75}

const grades = [
  { name: "Ann", cls: "A", grade: 90 },
  { name: "Ben", cls: "B", grade: 75 },
  { name: "Cara", cls: "A", grade: 80 },
];

const grouped = grades.reduce((prev, curr) => {
  if (!prev[curr.cls]) {
    prev[curr.cls] = {
      sum: curr.grade,
      count: 1,
    };
  } else {
    prev[curr.cls].sum += curr.grade;
    prev[curr.cls].count += 1;
  }
  return prev;
}, {});
// console.log(grouped);
// გამოვიყენე entries და fromEntries ობიექტებთან სამუშაოდ საბოლოო პასუხის მისაღებად.
const avgByClass = Object.fromEntries(
  Object.entries(grouped).map(([key, value]) => [key, value.sum / value.count])
);

// console.log(avgByClass);
