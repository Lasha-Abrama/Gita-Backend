# My Expenses

EJS and Express CRUD application for managing personal expenses.

Live demo: [https://personal-expenses-app-simi.onrender.com](https://personal-expenses-app-simi.onrender.com/)

## Features

- View all expenses
- Create a new expense
- View expense details
- Edit an expense
- Delete an expense
- Filter expenses by category
- Sort expenses by A-Z, Z-A, latest, oldest, smallest, and biggest
- Expense report page
- JSON file storage with `fs/promises`
- Separate API and view routes
- EJS partials for header and footer

## Tech Stack

- Node.js
- Express.js
- EJS
- HTML/CSS
- JavaScript
- `fs/promises`

## Project Structure

```text
midterm_2/
  data/
    expenses.json
  public/
    css/
      style.css
    js/
      app.js
  routes/
    api.routes.js
    view.routes.js
  services/
    expense.service.js
  utils/
    fs.util.js
  views/
    pages/
    partials/
  main.js
  package.json
```

## Main Files

- `main.js` - Express app setup, EJS setup, static files, and route mounting
- `routes/view.routes.js` - page routes for EJS views
- `routes/api.routes.js` - JSON API routes
- `services/expense.service.js` - CRUD, filter, sort, and report logic
- `utils/fs.util.js` - JSON file read/write helpers using `fs/promises`
- `data/expenses.json` - expense data storage
- `views/partials/header.ejs` and `views/partials/footer.ejs` - reusable EJS partials
- `public/js/app.js` - live category search and filter behavior
- `public/css/style.css` - page styling

## Run Locally

Install dependencies:

```bash
npm install
```

Start the app:

```bash
npm start
```

Open:

```text
http://localhost:4000
```

## API Routes

```text
GET    /api/expenses
GET    /api/expenses/:id
POST   /api/expenses
PUT    /api/expenses/:id
DELETE /api/expenses/:id
```

## Render Deployment

This project is inside a nested folder:

```text
Gita-Backend/midterms/midterm_2
```

Render settings:

```text
New +: Web Service
Root Directory: midterms/midterm_2
Runtime: Node
Build Command: npm install
Start Command: npm start
```

The app uses Render's provided port:

```js
const PORT = process.env.PORT || 4000;
```

## Note

Expenses are stored in `data/expenses.json`. On Render, file changes may reset after redeploys because the default filesystem is not permanent.
