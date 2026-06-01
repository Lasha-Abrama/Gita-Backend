class Rectangle {
  #width;
  #length;
  constructor(length, width) {
    this.#length = length;
    this.#width = width;
  }

  getArea() {
    return this.#length * this.#width;
  }
  getPerimeter() {
    return (this.#length + this.#width) * 2;
  }
  isSquare() {
    return this.#length === this.#width;
  }
}

// let rec1 = new Rectangle(10, 20);
// console.log(rec1.getArea());
// console.log(rec1.getPerimeter());
// console.log(rec1.isSquare());

class Circle {
  #radius;
  constructor(radius) {
    this.#radius = radius;
  }

  getLength() {
    return Math.round(2 * this.#radius * Math.PI);
  }

  getArea() {
    return Math.round(Math.PI * this.#radius ** 2);
  }
}

// const circ1 = new Circle(8);
// console.log(circ1.getLength());
// console.log(circ1.getArea());

class BankAccount {
  #balance = 0;
  #transactions = [];

  deposit(amount) {
    this.#balance += amount;
    this.#addTransaction("deposit", amount);
    console.log("Deposit Money Succesfully!");
  }

  withdraw(amount) {
    if (this.#balance < amount) {
      console.log("Error, withdraw amount is more than balance!");
      return;
    }
    this.#balance -= amount;
    this.#addTransaction("withdraw", amount);
    console.log("Withdraw Money Succesfully!");
  }

  transferMoneyToSomeone(personId, amount) {
    this.#balance -= amount;
    this.#addTransaction(`transfer to ${personId}`, amount);
    console.log("Transfered Money Succesfully!");
  }

  #addTransaction(type, amount) {
    this.#transactions.push({
      time: new Date().toISOString(),
      type,
      amount,
      totalBalance: this.#balance,
    });
  }

  getTransactionHistory() {
    return this.#transactions;
  }

  getBalance() {
    return this.#balance;
  }
}

// const acc1 = new BankAccount();
// acc1.deposit(1000);
// acc1.withdraw(250);
// acc1.transferMoneyToSomeone("dato", 300);
// console.log(acc1.getTransactionHistory());
// console.log("Balance:", acc1.getBalance());
