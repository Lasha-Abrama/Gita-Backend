// 1) Todo App კლასი
// მოთხოვნები: Todo (id, title, isDone, createdAt),
// TodoList კლასში მეთოდები: დაამატე, წაშალე(id), მონიშნე შესრულებული checkActiveTodo(id),
// დააბრუნე Todos(ფილტრი: all/active/done),
// getAllTodos({active: true}) => actives,
// getAllTodos({active: false}) => not active,
// getAllTodos() => all todos.

class Todo {
  constructor(id, title) {
    this.id = id;
    this.title = title;
    this.isDone = false;
    this.createdAt = new Date();
  }
}

class TodoList {
  constructor() {
    this.todoItems = [];
    this.nextId = 1;
  }

  addTodoItem(title) {
    const item = new Todo(this.nextId, title);
    this.todoItems.push(item);
    this.nextId++;
    return item;
  }

  removeTodoItem(id) {
    this.todoItems = this.todoItems.filter((item) => item.id !== id);
  }

  checkActiveTodo(id) {
    const item = this.todoItems.find((item) => item.id === id);

    if (item) {
      item.isDone = true;
    }
  }

  getAllTodos(filter) {
    if (!filter) {
      return this.todoItems;
    }

    if (filter.active === true) {
      return this.todoItems.filter((item) => !item.isDone);
    }

    if (filter.active === false) {
      return this.todoItems.filter((item) => item.isDone);
    }

    return this.todoItems;
  }
}

const todoList1 = new TodoList();

todoList1.addTodoItem("Task 1");
todoList1.addTodoItem("Task 2");
todoList1.addTodoItem("Task 3");

todoList1.checkActiveTodo(1);
todoList1.removeTodoItem(2);

// console.log(todoList1.getAllTodos(), "All Todos");
// console.log(todoList1.getAllTodos({ active: true }), "Active Todos");
// console.log(todoList1.getAllTodos({ active: false }), "Done Todos");

// 2) Shoppinc Cart კლასი
// მეთოდები: addToCart(), removeFromCart(), calculateTotalPrice(), updateItem()

class CartItem {
  constructor(id, name, price, quantity) {
    this.id = id;
    this.name = name;
    this.price = price;
    this.quantity = quantity;
  }
}

class ShoppingCart {
  constructor() {
    this.items = [];
    this.nextId = 1;
  }
  addToCart(name, price, quantity) {
    const item = new CartItem(this.nextId, name, price, quantity);
    this.items.push(item);
    this.nextId++;
    return item;
  }
  removeFromCart(id) {
    this.items = this.items.filter((item) => item.id !== id);
  }
  calculateTotalPrice() {
    return this.items.reduce(
      (tot, curr) => (tot += curr.price * curr.quantity),
      0,
    );
  }
  updateItem(id, newQuantity) {
    const item = this.items.find((item) => item.id === id);

    if (item) {
      item.quantity = newQuantity;
    }
  }
}

const cart1 = new ShoppingCart();

cart1.addToCart("t-shirt", 30, 2);
cart1.addToCart("jeans", 80, 1);
cart1.addToCart("shorts", 40, 2);
cart1.addToCart("cap", 10, 1);

// console.log(cart1.items);

cart1.removeFromCart(4);
cart1.updateItem(3, 1);

// console.log(cart1.items);
// console.log(cart1.calculateTotalPrice(), "total");

// 3) Library კლასი რომელიც შეინახავს წიგნების მასივს.
// მეთოდები: addBook(), removeBook(), listBooks() ამას შეიძლება გადაეცეს სორტი მაგალითად წამოიღეთ წიგნები გამოშვების წლის მიხედვით.
class Book {
  constructor(id, name, author, pages_amount, release_year) {
    this.id = id;
    this.name = name;
    this.author = author;
    this.pages_amount = pages_amount;
    this.release_year = release_year;
  }
}

class Library {
  constructor() {
    this.books = [];
    this.nextId = 1;
  }
  addBook(name, author, pages_amount, release_year) {
    const book = new Book(
      this.nextId,
      name,
      author,
      pages_amount,
      release_year,
    );
    this.books.push(book);
    this.nextId++;
    return book;
  }
  removeBook(id) {
    this.books = this.books.filter((book) => book.id !== id);
  }
  listBooks(listType = "byId") {
    const sorted = [...this.books];

    if (listType === "byDateAsc") {
      return sorted.sort((a, b) => a.release_year - b.release_year);
    }
    if (listType === "byDateDesc") {
      return sorted.sort((a, b) => b.release_year - a.release_year);
    }
    if (listType === "byPagesAsc") {
      return sorted.sort((a, b) => a.pages_amount - b.pages_amount);
    }
    if (listType === "byPagesDesc") {
      return sorted.sort((a, b) => b.pages_amount - a.pages_amount);
    }
    return sorted.sort((a, b) => a.id - b.id);
  }
}

const libr1 = new Library();

libr1.addBook("ვეფხისტყაოსანი", "შოთა რუსთაველი", 400, 1200);
libr1.addBook("ჯაყოს ხიზნები", "მიხეილ ჯავახიშვილი", 250, 1924);
libr1.addBook("დიდოსტატის მარჯვენა", "კონსტანტინე გამსახურდია", 600, 1939);
libr1.addBook("ბაში-აჩუკი", "აკაკი წერეთელი", 200, 1896);
libr1.addBook("მე", "მაგარი წიგნი", 1, 2026);

libr1.removeBook(5);
// console.log(libr1.listBooks("byPagesDesc"));

// 4) ContactManager კლასი
// უნდა ჰქონდეს შემდეგი მეთოდები:
// addNewContact() // სახელი, ნომერი, იმეილი დაადეთ ვალიდაცია რომ 2 ერთი და იგივე იმეილის კონტაქტი ვერ უნდა შექმნათ, ვერც ორი ერთი და იგივე ნომერი
// viewAllContacts(), updatePhone(), deleteContact()

class Contact {
  constructor(id, name, phone, email) {
    this.id = id;
    this.name = name;
    this.phone = phone;
    this.email = email;
  }
}

class ContactManager {
  constructor() {
    this.contacts = [];
    this.nextId = 1;
  }
  addNewContact(name, phone, email) {
    if (
      this.contacts.some(
        (contact) => contact.phone === phone || contact.email === email,
      )
    ) {
      return `contact with this phone: ${phone} or email: ${email} already exists`;
    }
    const contact = new Contact(this.nextId, name, phone, email);
    this.contacts.push(contact);
    this.nextId++;
    return contact;
  }
  viewAllContacts() {
    return this.contacts;
  }
  updatePhone(id, newPhone) {
    if (
      this.contacts.some(
        (contact) => contact.phone === newPhone && contact.id !== id,
      )
    ) {
      return "phone already exists";
    }
    const contact = this.contacts.find((contact) => contact.id === id);

    if (!contact) {
      return "contact not found";
    }
    contact.phone = newPhone;
    return `${contact.name}'s phone updated successfully with ${contact.phone}`;
  }
  deleteContact(id) {
    this.contacts = this.contacts.filter((contact) => contact.id !== id);
  }
}

const contMan1 = new ContactManager();
contMan1.addNewContact("Lasha", 599999999, "lasha@gmail.com");
contMan1.addNewContact("Nika", 566666666, "nika@gmail.com");
contMan1.addNewContact("Giorgi", 577777777, "giorgi@gmail.com");
contMan1.addNewContact("Davit", 588888888, "davit@gmail.com");
// console.log(contMan1.addNewContact("Lasha", 599999999, "lasha@gmail.com"));

contMan1.deleteContact(2);
contMan1.updatePhone(4, 577777777);
// console.log(contMan1.updatePhone(4, 577777778));
// console.log(contMan1.viewAllContacts());
