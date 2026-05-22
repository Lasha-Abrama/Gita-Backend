// 1) რა თანმიმდევრობით დაილოგება შემდეგი ინსტრუქციები:
// console.log("1");
// setTimeout(() => console.log("2"), 100);
// setTimeout(() => console.log("3"), 0);
// Promise.resolve().then(() => console.log("4"));
// console.log("5");

// პირველ რიგში შესრულდება სინქრონული კოდი და დაილოგება 1 და 5
// შემდეგ Call Stack დაცარიელდება და შესრულდება Promise callback, რადგან Microtask Queue-ს უფრო მაღალი პრიორიტეტი აქვს ვიდრე Task Queue-ს და დაილოგება 4
// ამის შემდეგ Web Api-ში არსებული setTimeout callback ფუნქციები გადავა Task Queue-ში, ჯერ 0 მილიწამიანი delay-ანი და შესრულდება და დაილოგება 3, ხოლო შემდეგ 100 მილიწამიანი და დაილოგება 2
// საბოლოო output-ის თანმიმდევრობა იქნება: 1, 5, 4, 3, 2

// 2) რა თანმიმდევრობით დაილოგება შემდეგი ინსტრუქციები:
// console.log("1");
// setTimeout(() => console.log("2"), 0);
// Promise.resolve().then(() => {
//   console.log("3");
//   setTimeout(() => console.log("4"), 0);
// });
// console.log("5");

// პირველ რიგში შესრულდება სინქრონული კოდი და დაილოგება 1 და 5
// შემდეგ Call Stack დაცარიელდება და შესრულდება Promise callback, რადგან Microtask Queue-ს უფრო მაღალი პრიორიტეტი აქვს ვიდრე Task Queue-ს და დაილოგება 3
// Promise callback-ის შიგნით არსებული setTimeout გადავა Web Api-ში და შემდეგ Task Queue-ში
// Web Api-ში უკვე გვქონდა მეორე setTimeout, ამიტომ ჯერ შესრულდება ის და დაილოგება 2, ხოლო ბოლოს promise-დან წამოსული setTimeout და დაილოგება 4
// საბოლოო output-ის თანმიმდევრობა იქნება: 1, 5, 3, 2, 4

// 3) დაწერეთ სლიფ ფუნქცია რომელიც პარამეტრად მიიღებს მილიწამს და დაიძინებს, ანუ სისტემა გაჩერდება პარამეტრის მიხედვით.
// await sleep(1000) სადაც ამ ფუნცქიას გამოიყენებთ 1 წამი უნდა გაჩერდეს ხოლმე სისტემა, გაითვალისწინეთ await ით უნდა გააჩეროთ ანუ პრომისი უნდა დააბრუნოს ფუნქციამ

function sleep(time) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, time);
  });
}
// await sleep(1000);

// 4) დაწერეთ ფუნცქია რომელიც პარამეტრად მიიღებს რიცხვს 1-დან 20-მდე თქვენი მიზანია ფუნცქიის შიგნით ფუნქციამ ყოველ 1 წამში რენდომ
// რიცხვი დააგენერიროს მანამ სანამ რენდომ დაგენერირებული რიცხვი არ დამეთხვევა პარამეტს, როგორც კი ისინი ერთმანეთს დაემთხვევა გააჩერეთ რენდომ რიცხვის დალოგვა.

function guessNum(num) {
  let interval = setInterval(() => {
    let randNum = Math.floor(Math.random() * 20) + 1;
    console.log(randNum);

    if (randNum === num) {
      clearInterval(interval);
    }
  }, 1000);
}
// guessNum(12);

// 5) დაწერეთ ფუნცქია რომელსაც გადაეცემა 2 პარამეტრი 1 - ნებისმიერი რიცხვი 2 - დროის ერთეული მილიწამებში,
// თქვენი მიზანია დალოგოთ რიცხვები ამ რიცხვიდან 0 მდე იმ დროის ინტერვალში რაც არის მეორე პარამეტრი და 0ზე გააჩეროთ.

function sortWithDelay(num, del) {
  let interval = setInterval(() => {
    console.log(num);
    if (num === 0) {
      clearInterval(interval);
      return;
    }
    if (num > 0) {
      num--;
    } else {
      num++;
    }
  }, del);
}
// sortWithDelay(4, 1000);
