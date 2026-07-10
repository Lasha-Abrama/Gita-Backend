"use strict";
// გადავწეროთ მოცემული ფაილი typescript_ზე.
Object.defineProperty(exports, "__esModule", { value: true });
class Rectangle {
    width;
    height;
    constructor(width, height) {
        this.width = width;
        this.height = height;
    }
    calculateRectangleArea() {
        return rectangle.width * rectangle.height;
    }
    calculateRectanglePerimeter() {
        return 2 * (rectangle.width + rectangle.height);
    }
}
class Circle {
    radius;
    constructor(radius) {
        this.radius = radius;
    }
    calculateCircleArea() {
        return Math.PI * Math.pow(circle.radius, 2);
    }
    calculateCirclePerimeter() {
        return 2 * Math.PI * circle.radius;
    }
}
// Independent Functions
function addNumbers(a, b) {
    return a + b;
}
function multiplyNumbers(a, b) {
    return a * b;
}
function capitalizeString(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}
function filterEvenNumbers(numbers) {
    return numbers.filter((num) => num % 2 === 0);
}
function findMax(numbers) {
    return Math.max(...numbers);
}
function isPalindrome(str) {
    const cleanStr = str.toLowerCase().replace(/[^a-zA-Z0-9]/g, "");
    const reversedStr = cleanStr.split("").reverse().join("");
    return cleanStr === reversedStr;
}
function calculateFactorial(n) {
    if (n === 0 || n === 1) {
        return 1;
    }
    else {
        return n * calculateFactorial(n - 1);
    }
}
// Test Cases
// სასურველია გავაკეთოთ Rectangle და Circle კლაზები და დავუმატოთ შესაბამისი მეთოდები.
const rectangle = { width: 5, height: 8 };
const circle = { radius: 3 };
const Rectangle1 = new Rectangle(10, 20);
const rectangleArea = Rectangle1.calculateRectangleArea();
const rectanglePerimeter = Rectangle1.calculateRectanglePerimeter();
const Circle1 = new Circle(5);
const circleArea = Circle1.calculateCircleArea();
const circlePerimeter = Circle1.calculateCirclePerimeter();
console.log(`Rectangle Area: ${rectangleArea}, Perimeter: ${rectanglePerimeter}`);
console.log(`Circle Area: ${circleArea}, Perimeter: ${circlePerimeter}`);
const sumResult = addNumbers(5, 3);
const multiplicationResult = multiplyNumbers(4, 7);
const capitalizedString = capitalizeString("javascript is fun");
const evenNumbers = filterEvenNumbers([1, 2, 3, 4, 5, 6, 7, 8]);
console.log(`Sum: ${sumResult}`);
console.log(`Multiplication: ${multiplicationResult}`);
console.log(`Capitalized String: ${capitalizedString}`);
console.log(`Even Numbers: ${evenNumbers}`);
const maxNumber = findMax([23, 56, 12, 89, 43]);
const isPalindromeResult = isPalindrome("A man, a plan, a canal, Panama");
const factorialResult = calculateFactorial(5);
console.log(`Max Number: ${maxNumber}`);
console.log(`Is Palindrome: ${isPalindromeResult}`);
console.log(`Factorial: ${factorialResult}`);
/*

2. შევქმნათ კლასი BankAccount რომელსაც ექნება accountNumber,balance და transactionHistory ფროფერთები.
   კონსტრუქტორში უნდა ვიღებდეთ accountNumber და initialBalance მნიშვნელობებს.
   გარედან არუნდა იყოს შესაძლებელი accountNumber, balance და transactionHistory შეცვლა.
   კლასში უნდა გვქონდეს მეთოდები:
   getAccountInfo
   deposit - თანხის დამატება ანგარიშზე.
   withdraw - თანხის მოკლება ანგარიშიდან.
   transferFunds - გადარიცხვა სხვა BankAccount_ზე
   getTransactionHistory - აბრუნებს transactionHistory_ მასივს
   recordTransaction - transactionHistory_ში ამატებს ჩნაწერს ტრანსფერის შესახებ

   შევქმნათ მინიმუმ 2 BankAccount_ის ინსტანსი.
   გავაკეთოთ სხვადასხვა ოპერაციები.
   დავბეჯდოთ შექმნილი ექაუნთების transactionHistory.

*/
class BankAccount {
    accountNumber;
    balance;
    transactionHistory;
    constructor(accountNumber, balance) {
        this.accountNumber = accountNumber;
        this.balance = balance;
        this.transactionHistory = [];
    }
    getAccountInfo() {
        return `Account ${this.accountNumber} has ${this.balance} $`;
    }
    deposit(amount) {
        this.balance += amount;
        this.recordTransaction(`Deposited amount: ${amount}`);
    }
    withdraw(amount) {
        this.balance -= amount;
        this.recordTransaction(`Withdrawed amount: ${amount}`);
    }
    transferFunds(receiver, amount) {
        receiver.balance += amount;
        this.balance -= amount;
        this.recordTransaction(`Transfered amount: ${amount} to Account ${this.accountNumber}`);
        receiver.recordTransaction(`Account ${this.accountNumber} Transfered amount: ${amount} to you`);
    }
    getTransactionHistory() {
        return [...this.transactionHistory];
    }
    recordTransaction(record) {
        this.transactionHistory.push(record);
    }
}
const account1 = new BankAccount(1, 1500);
const account2 = new BankAccount(2, 750);
console.log(account1.getAccountInfo());
console.log(account2.getAccountInfo());
account1.deposit(300);
console.log(account1.getAccountInfo());
account1.withdraw(200);
console.log(account1.getAccountInfo());
account1.transferFunds(account2, 400);
console.log(account1.getAccountInfo());
console.log(account2.getAccountInfo());
console.log(account1.getTransactionHistory());
console.log(account2.getTransactionHistory());
account2.recordTransaction("Account created successfully");
console.log(account2.getTransactionHistory());
//# sourceMappingURL=index.js.map