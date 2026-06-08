// 1) წამოიღეთ ინფომრაცია ამ API-დან  https://jsonplaceholder.typicode.com/users და მირებული
// შედეგი ჩაწერეთ users.json ში ოღონდ იუზერებს უნდა ქონდეთ მხოლოდ id, name, username და email

// const fs = require("fs/promises");

// async function getUsers() {
//   try {
//     const res = await fetch("https://jsonplaceholder.typicode.com/users");
//     const users = await res.json();

//     const selectedUsersInfo = users.map((user) => ({
//       id: user.id,
//       name: user.name,
//       username: user.username,
//       email: user.email,
//     }));

//     await fs.writeFile(
//       "users.json",
//       JSON.stringify(selectedUsersInfo, null, 2),
//     );

//     console.log("users.json created successfully");
//   } catch (e) {
//     console.log(e.message);
//   }
// }

// getUsers();

// 2) შექმენით phone.js და contacts.json ფაილები, თქვენი მიზანია შექმნათ phone cli თული
// რომელსაც ქნება დამატება, წაშლა და ყველა კონტაქტის წაკითხვის ფუნცქიონალი.
// node phone.js add 555151515 nika უნდა დაემატოს ეს ნომერი contacts.json ში.
// გაითვალისწინეთ დაადოთ ვალიდაცია და თუ ნომერი არსობბს არ დაამატოს იგივე ნომერი.
// წაშლითაც ნომერს გადასცემთ და ის ნომერი წაშლება contacts.json დან.
// node phone.js delete 555151515. node phone.js show უნდა გაჩვენოთ ყველა კონტაქტი.

// კოდი phone.js ფაილშია

// 3) შექმენით car.js და cars.json ფაილები. როდესაც გამოიძახებთ ბრძანებას node car.js Ferrari 2020 red
// უნდა დაამატოთ ეს მანქანის ინფორმაცია cars.json ში. გაითვალისწინეთ თითოეულ დამატებულ ობიექტს უნდა ჰქონდეს,
// carName, carColor, carReleaseDate. 5 ჯერ რო გავუშვა ეს ბრძანება 5 ახალი მანქანა უნდა იყოს დამატებული
// cars.json ში. როდესაც გამოვიძახებ node car.js show 2020 უნდა გამოაჩინოს მხოლოდ 2020 წლის მანქანები,
// როცა გამოვიძახებ node car.js show red უნდა გამოაჩინოს მხოლოდ წითელი ფერის მანქანები

// კოდი car.js ფაილშია

// 4) შექმენით ფაილი random.txt შიგნით დაწერეთ რაიმე წინადადება თქვენი მიზანია დაითვალოთ რამდენი სიტყვა, რამდენი ხმოვანი და რამდენი ასოა ამ ფაილში და ჩაწეროთ შედეგი result.json ში შემდეგი სახით  {word: 20, vowel: 64, chars: 152}

// const fs = require("fs/promises");

// async function fileInfo(fileName) {
//   try {
//     const readData = await fs.readFile(fileName, "utf-8");

//     const words = readData.trim().split(/\s+/);

//     const chars = readData.replace(/\s/g, "");

//     const matches = chars.match(/[aeiou]/gi);

//     const vowels = matches ? matches.length : 0;

//     console.log({
//       words: words.length,
//       chars: chars.length,
//       vowels: vowels,
//     });
//   } catch (e) {
//     console.log("File name is unknown");
//   }
// }

// fileInfo(process.argv[2]);
