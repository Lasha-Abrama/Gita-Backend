// 1) დაწერეთ ფუნცქია რომელიც გადააკონვერტირებს ცელსიუს ფარენჰეიტში და დააბრუნებს პასუხს.
function celsiusToFahrenheit(celsius) {
  return (celsius * 9) / 5 + 32;
}
// console.log(celsiusToFahrenheit(2));

// 2) დაწერე თუნცქია რომელიც მიიღებს სტრინგს არგუმენტად და დააბრუნებს ამ სრინგის შებრუნებულს(reverse).
function reversedString(str) {
  return str.split("").reverse().join("");
}
// console.log(reversedString("re;educate"));

// 3) დაწერეთ ფუნქცია რომელიც პარამეტრად მიიღებს წინადადებას და დათვლის რამდენი სიტყვაა შიგნით(ეს ლექციაზე არ გაგვიკეთებია მაგრამ შეგიძლია დასერჩოთ)
function countWords(sentence) {
  return sentence.trim().split(/\s+/).length; // /\s+/ მოვსერჩე empty space-ები დამატებით სიტვებად რომ არ ჩაეთვალა
}
// console.log(countWords("Gita    Backend 1"));

// 4) დაწერეთ ფუნცქია რომელიც პარამეტრად მიიღებს სიტყვას და დააბრუნებს რამდენი ხმოვანია ამ სიტყვაში
function countVowels(word) {
  let count = 0;
  let vowels = "aeiou";

  for (let i = 0; i < word.length; i++) {
    if (vowels.includes(word.toLowerCase()[i])) {
      count++;
    }
  }
  return count;
}
// console.log(countVowels("re;educate"));

// 5) დაწერეთ ფუნცქია რომელიც მიიღებს რიცხს პარამეტრად და დაგიბრუნებთ ამ რიცხვის ფაქტორიალს
function factorial(num) {
  let result = 1;
  for (let i = 1; i <= num; i++) {
    result *= i;
  }
  return result;
}
// console.log(factorial(5));

// 6) დაწერეთ ფუნცქია რომლეიც მიიღებს რიცხს პარამეტრად და დაგიბრუნებთ 0 დან ამ რიცხვამდე მხოლოდ ლუწი რიცხვების ჯამს
function sumEven(num) {
  let sum = 0;
  for (let i = 0; i < num; i++) {
    if (i % 2 === 0) {
      sum += i;
    }
  }
  return sum;
}
// console.log(sumEven(8));

// 7) დაწერეთ ფუნცქია რომელიც მიიღებს სტუდენტის ქულას არგუმენტად და დაგირბუნებთ სტუდენტის შეფასებას A,B,C,E,F
function rateStudent(score) {
  if (score < 0 || score > 100) {
    return "Invalid score";
  }
  if (score >= 91) {
    return "A";
  } else if (score >= 81) {
    return "B";
  } else if (score >= 71) {
    return "C";
  } else if (score >= 61) {
    return "D";
  } else if (score >= 51) {
    return "E";
  } else {
    return "F";
  }
}
// console.log(rateStudent(95));
// console.log(rateStudent(85));
// console.log(rateStudent(75));
// console.log(rateStudent(65));
// console.log(rateStudent(55));
// console.log(rateStudent(45));
// console.log(rateStudent(105));

// 8) დაწერეთ ფუნცქია რომელიც მიიღებს პაროლს პარამეტრად თქვენი მიზანია შეამოწმოთ თუ არის 8 სიმბოლოზე მეტი შეიცავს რიცხვს და ერთი დიდ ასოს(capital letter)

function checkPassword(pass) {
  if (pass.length < 8) {
    return "Password must be at least 8 symbols";
  }

  let hasNumber = false;
  let hasUppercase = false;

  for (let i of pass) {
    if (i >= "0" && i <= "9") {
      hasNumber = true;
    }

    if (i === i.toUpperCase() && i !== i.toLowerCase()) {
      hasUppercase = true;
    }
  }

  if (hasNumber && hasUppercase) {
    return "Valid password";
  } else {
    return "Invalid password! Must contain at least 1 uppercase letter and 1 number";
  }
}
// console.log(checkPassword("gita"));
// console.log(checkPassword("re;educate"));
// console.log(checkPassword("Re;educate"));
// console.log(checkPassword("Re;educate-Backend-1"));
