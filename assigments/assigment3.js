// 1) დაწერეთ ფუნცქცია რომელიც მიიღებს მასივს არგუმენტად და დააბრუნებს ამ მასივის საშუალო არითმეტიკულს.
function arrayAvg(arr) {
  let sum = 0;
  for (let i of arr) {
    sum += i;
  }
  return sum / arr.length;
}
// console.log(arrayAvg([1, 2, 3, 4, 5, 6, 7, 8, 9]));

// 2) დაწერეთ ფუნცქია რომელიც პარამეტრად მიიღებს რიცხვს და დააბრუნებს ამ რიცხვის შებრუნებულ მასივს თითოეული წევრით. მაგ: 35231 → [1,3,2,5,3]. 0 => [0]
function numToArr(num) {
  let result = [];
  for (let i of num.toString().split("").reverse()) {
    result.push(Number(i));
  }
  return result;
}
// console.log(numToArr(35231));

// 3) დაწერეთ ფუნქცია რომელიც მიიღებს 2 მასივს არგუმენტად და დააბრუნებს მასივის მხოლოდ იმ წევრებს რომელსაც მეორე მასივი არ შეიცავს მაგ: a = [1, 2] და b = [1] დააბრუნეთ [2]. a = [1, 2, 2, 2, 3] და b = [2] დააბრუნეთ [1, 3].
function uniquesInFirst(arr1, arr2) {
  let result = [];
  for (let i of arr1) {
    if (!arr2.includes(i)) {
      result.push(i);
    }
  }
  return result;
}
// console.log(uniquesInFirst([1, 2, 2, 2, 3], [2]));

// 4) დაწერეთ ფუნცქცია რომელსაც გადმოეცემა მასივი და იპოვე მასივში მეორე ყველაზე დიდი რიცხვი. მაგ: [10, 40, 20, 5, 30] => 30
function secondNum(arr) {
  return [...arr].sort((a, b) => a - b)[arr.length - 2];
}
// console.log(secondNum([10, 40, 20, 5, 30]));

// 5) დაწერეთ ფუნცქია რომელიც მიიღებს სტირნგების მასივს და უნდა დააბრუნოტ მხოლოდ იმ სიტყვების მასივი რომლებიც არის პალინდორმი:
// * პალინდორმი ეწოდება სიტყვას რომელიც შემობრუნების შემდეგ იგივე მნიშვნელობას ინარჩუნებს.
// მაგ: ["mom", "car", "level", "dog"] => ["mom", "level"]

function palindromWords(arr) {
  let result = [];
  for (let word of arr) {
    let reversedWord = word.split("").reverse().join("");
    if (reversedWord === word) {
      result.push(word);
    }
  }
  return result;
}
// console.log(palindromWords(["mom", "car", "level", "dog"]));

// with double for loop
function palindromWords(arr) {
  let result = [];
  for (let word of arr) {
    let isPalindrome = true;
    for (let i = 0; i < word.length / 2; i++) {
      if (word[i] !== word[word.length - 1 - i]) {
        isPalindrome = false;
      }
    }
    if (isPalindrome) {
      result.push(word);
    }
  }
  return result;
}
// console.log(palindromWords(["mom", "car", "level", "dog"]));

// with filter
function palindromWords(arr) {
  return arr.filter((word) => word === word.split("").reverse().join(""));
}
// console.log(palindromWords(["mom", "car", "level", "dog"]));

// 6)დაწერეთ ფუნცქია რომელიც მიიღებს რიცხვების მასივს და დააბრუნებთ რომელია ყველაზე ხშირად გამეორებადი რიცხვი მაგ: [4, 5, 6, 5, 4, 5] => 5
function mostRepeatedNum(arr) {
  let maxCount = 0;
  let mostFrequent = arr[0];
  for (let i = 0; i < arr.length; i++) {
    let count = 0;
    for (let j = 0; j < arr.length; j++) {
      if (arr[i] === arr[j]) {
        count++;
      }
    }
    if (count > maxCount) {
      maxCount = count;
      mostFrequent = arr[i];
    }
  }
  return mostFrequent;
}
// console.log(mostRepeatedNum([4, 5, 6, 5, 4, 5, 6]));
