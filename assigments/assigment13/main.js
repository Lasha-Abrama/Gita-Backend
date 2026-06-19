// 1) შექმენით ხარჯების(expenses) ქრადი ექსპრესის გამოყენებით.

// 2) დაამატეთ ფეჯინეიშენის ფიჩერი, /expenses?page=1&take=30 უნდა დააბურნოს 30 ჩანაწერი,
// გაითვალისწინეთ ზედა ზღვარზე შეზღუდვა

// 3) დაამატეთ ვალიდაცია წაშლის დროს, უზერმა უნდა შეძლოს ხარჯის წაშლა მხოლოდ მაშინ თუ ჰედერში გამოატანს რაიმე
// კოდურ სიტყვას მაგალითად secret=random123

// 4) გაჰენდლეთ ერორები, ყველა ენდფოითნზე როდესაც კლიენტი არასწორ ინფორმაციას გამოატანს გაუზაგვნეთ
// შესაბამისი სტატუს კოდები,

// გამოიყენეთ FS მოდული და ExpressJS, ხარჯები უნდა შეინახოტ expenses.json ფაილში

const express = require("express");
const { readFile, writeFile } = require("./utils/fs.util");

const app = express();

app.use(express.json());

app.get("/expenses", async (req, res) => {
  try {
    const expenses = await readFile("expenses.json", true);

    const page = Math.max(Number(req.query.page) || 1, 1);
    const take = Math.min(Number(req.query.take) || 30, 30);

    const start = (page - 1) * take;
    const end = start + take;

    const result = expenses.slice(start, end);

    res.json({
      page,
      take,
      total: expenses.length,
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
    });
  }
});

app.post("/expenses", async (req, res) => {
  try {
    if (
      !req.body ||
      !req.body.category ||
      !req.body.price ||
      !req.body.currency
    ) {
      return res
        .status(400)
        .json({ message: "category, price and currrency are required" });
    }

    if (typeof req.body.price !== "number") {
      return res.status(400).json({
        message: "Price must be a number",
      });
    }

    const expenses = await readFile("expenses.json", true);
    const lastId = expenses[expenses.length - 1]?.id || 0;

    const newExpense = {
      id: lastId + 1,
      category: req.body.category,
      price: req.body.price,
      currency: req.body.currency,
      createdAt: new Date().toISOString(),
    };
    expenses.push(newExpense);
    await writeFile("expenses.json", expenses);

    res.status(201).json({ success: true, data: newExpense });
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
    });
  }
});

app.delete("/expenses/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({
        message: "Invalid Expense ID",
      });
    }
    const expenses = await readFile("expenses.json", true);
    const index = expenses.findIndex((expense) => expense.id === id);
    if (index === -1) {
      return res.status(404).json({ message: "Expense not Found!" });
    }

    const secret = req.headers["secret"];
    if (!secret || secret !== "random123") {
      return res.status(401).json({
        message: "You need a right secret code to delete an expense!",
      });
    }

    const deletedExpense = expenses.splice(index, 1);
    await writeFile("expenses.json", expenses);
    res.json({
      message: "Expense deleted Successfully!",
      data: deletedExpense[0],
    });
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
    });
  }
});

app.listen((port = 4000), () => {
  console.log(`server running on http://localhost:${port}`);
});
