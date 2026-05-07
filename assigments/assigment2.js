// 1) დაწერეთ ფუნცქია რომელიც პარამეტრად მიიღებს სტრინგს და დააბრუნებს ამ სტირნგის აბრივიატურას მაგალითად getAbbr('John Doe') => "J.D"
// function getAbbr(str) {
//   const words = str.trim().split(" ");
//   // console.log(words);
//   const firstLetter = words.map((word) => word[0].toUpperCase());
//   const abbreviation = firstLetter.join(".");

//   return abbreviation;
// }
// console.log(getAbbr("John Martin Doe"));

// 2) დაწერეთ ფუნცქია რომელიც არგუმენტად მიიღებს რიცხვს და დააბრუნებს ამ რიცხვების ჯამს მაგ: getSumOfDigit(123) => 6 ახსნა 1 + 2 + 3
// function getSumOfDigit(num) {
//   let sum = 0;
//   const digits = num.toString().split("");
//   // console.log(digits);
//   for (let i of digits) {
//     sum += Number(i);
//   }
//   return sum;
// }
// console.log(getSumOfDigit(123));

// 3) დაწერეთ ფუნქცია რომელიც პარამეტრად მიიღებს სტრინგს და წაშლის ამ სტრინგიდან ყველა გამეორებად ასოს. მაგ: removeDuplicates('banana') => 'ban'
// function removeDuplicates(str) {
//   let uniqueLetters = "";
//   for (let i of str) {
//     if (!uniqueLetters.includes(i)) {
//       uniqueLetters += i;
//     }
//   }
//   return uniqueLetters;
// }
// console.log(removeDuplicates("banana"));

// 4) დაწერეთ ფუნქცია რომელიც წაშლის ყველა სფეისს სტრინგინდან მაგ: removeSpaces('1 2 aab') => '12aab' უნდა გამოიტენოთ for ლუპი
// function removeSpaces(str) {
//   let strWithoutSpaces = "";
//   for (let i of str) {
//     if (i !== " ") {
//       strWithoutSpaces += i;
//     }
//   }
//   return strWithoutSpaces;
// }
// console.log(removeSpaces("1 2 aab"));

// 5) დაწერეთ ფუნცქია რომელიც მიიღებს წინადადებას და შემოაბრუნებს თითოეულ სიტყვას მაგ: reverseEachWord('Hello World') =>  "olleH dlroW"
// function reverseEachWord(sentence) {
//   let words = sentence.trim().split(" ");
//   let reversedWords = [];
//   // console.log(words);
//   for (let i of words) {
//     let reversed = "";
//     for (let j = i.length - 1; j >= 0; j--) {
//       reversed += i[j];
//     }
//     reversedWords.push(reversed);
//   }
//   return reversedWords.join(" ");
// }
// console.log(reverseEachWord("Hello World"));

// ან ესე

// function reverseEachWord(sentence) {
//   let words = sentence.trim().split(" ");
//   let reversedWords = [];

//   for (let i of words) {
//     reversedWords.push(i.split("").reverse().join(""));
//   }

//   return reversedWords.join(" ");
// }
// console.log(reverseEachWord("Hello Re;educate"));
