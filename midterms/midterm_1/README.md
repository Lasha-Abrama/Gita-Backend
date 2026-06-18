# Expense CLI

A CLI-based expense management system built with Node.js, Commander.js, and the File System module. It allows users to track, filter, and manage personal expenses directly from the terminal with local JSON storage.

## Project Goal

The goal of this project is to build a real-world CLI tool for managing personal expenses using Node.js, practicing CRUD operations, file-based storage, and command-line interface design.

## Features

- Create new expenses
- View all recorded expenses
- Retrieve an expense by ID
- Update existing expenses
- Delete expenses
- Sort expenses by creation date (ascending or descending)
- Filter expenses by category
- Search expenses by date
- Input validation and error handling
- Pagination support
- Automatic ID generation
- Automatic creation timestamp generation
- Local JSON-based data storage

---

# Technologies Used

- Node.js
- Commander.js
- Chalk
- File System (fs)

---

# Concepts Used

- Command-line interface (CLI) design
- File-based persistence (JSON storage)
- CRUD operations
- Data filtering and sorting
- Pagination logic
- Input validation
- Modular Node.js architecture (ES Modules)

---

# Expense Structure

Each expense contains the following fields:

```json
{
  "id": 1,
  "category": "shopping",
  "price": 50,
  "currency": "GEL",
  "createdAt": "2025-06-17T10:30:00.000Z"
}
```

### Required Fields

| Field     | Description                                |
| --------- | ------------------------------------------ |
| id        | Unique identifier generated automatically  |
| category  | Expense category                           |
| price     | Expense amount                             |
| createdAt | Creation timestamp generated automatically |

Additional field:

| Field    | Description      |
| -------- | ---------------- |
| currency | Expense currency |

---

# Installation

Clone the repository:

```bash
git clone <repository-url>
```

Navigate to project folder:

```bash
cd gita-back-1/midterms/midterm_1
```

Install dependencies:

```bash
npm install
```

This makes the CLI available globally as `expense-cli`.

```bash
npm link
```

## Usage

After linking globally:

```bash
expense-cli --help
```

---

# Available Commands

## Add Expense

Creates a new expense.

### Syntax

```bash
expense-cli add <category> <price> <currency>
```

### Example

```bash
expense-cli add shopping 50 GEL
```

### Validation

- Price must be a number
- Price must be at least 10
- Currency must be one of:

```text
GEL
USD
EUR
```

---

## Show All Expenses

Displays expenses.

### Syntax

```bash
expense-cli show
```

### Example

```bash
expense-cli show
```

---

# Pagination

Pagination is supported through the following options:

### Page

```bash
expense-cli show --page 2
```

or

```bash
expense-cli show -p 2
```

### Take

```bash
expense-cli show --take 5
```

or

```bash
expense-cli show -t 5
```

### Example

```bash
expense-cli show --page 2 --take 3
```

---

# Sorting

Expenses can be sorted by creation date.

### Ascending Order

Oldest expense first.

```bash
expense-cli show --asc
```

or

```bash
expense-cli show -a
```

### Descending Order

Newest expense first.

```bash
expense-cli show --desc
```

or

```bash
expense-cli show -d
```

---

# Filter By Category

Returns only expenses belonging to a specific category.

### Syntax

```bash
expense-cli show --category shopping
```

or

```bash
expense-cli show -c shopping
```

### Example

```bash
expense-cli show -c food
```

---

# Show Last Added Expense

Returns the most recently added expense.

### Syntax

```bash
expense-cli show --last
```

or

```bash
expense-cli show -l
```

---

# Get Expense By ID

Returns a single expense by its ID.

### Syntax

```bash
expense-cli get <id>
```

### Example

```bash
expense-cli get 3
```

---

# Update Expense

Updates an existing expense.

### Syntax

```bash
expense-cli update <id> [options]
```

### Available Options

#### Update Category

```bash
expense-cli update 1 --category groceries
```

#### Update Price

```bash
expense-cli update 1 --price 100
```

#### Update Currency

```bash
expense-cli update 1 --currency USD
```

#### Multiple Updates

```bash
expense-cli update 1 --category food --price 120 --currency GEL
```

---

# Delete Expense

Deletes an expense by ID.

### Syntax

```bash
expense-cli delete <id>
```

### Example

```bash
expense-cli delete 2
```

---

# Search Expenses By Date

Returns all expenses created on a specific date.

### Syntax

```bash
expense-cli search <date>
```

### Example

```bash
expense-cli search 2025-06-17
```

### Date Format

```text
YYYY-MM-DD
```

Example:

```text
2025-06-17
```

---

# Error Handling

The application includes input validation and error handling for:

- Invalid expense ID
- Non-numeric or invalid price values
- Price values below 10
- Unsupported currency types
- Invalid date format (YYYY-MM-DD required)
- Empty search results
- Empty category results
- Invalid update operations

---

# Project Requirements Covered

✅ CRUD Operations

- Create
- Read
- Update
- Delete
- Get By ID

✅ Required Expense Fields

- id
- category
- price
- createdAt

✅ Automatic ID Generation

✅ Automatic createdAt Generation

✅ Sorting

- Ascending
- Descending

✅ Category Filtering

✅ Search By Date

✅ Validation

- Minimum price validation

✅ Pagination

---

# Author

**Lasha Abramishvili**

Midterm Project – Expense CLI  
Built with Node.js, Commander.js, and File System module.

- GitHub: https://github.com/Lasha-Abrama
- CLI Package (npm): _Not published yet_
