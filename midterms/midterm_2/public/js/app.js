const searchInput = document.querySelector("#category-search");
const sortFilter = document.querySelector("#sort-filter");
const expensesList = document.querySelector("#expenses-list");

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function renderExpense(expense) {
  return `
    <div class="card">
      <div class="card-header">
        <h3>${escapeHtml(expense.category)}</h3>
        <span class="amount">${escapeHtml(expense.amount)} GEL</span>
      </div>

      <p>${escapeHtml(expense.description)}</p>

      <div class="actions">
        <a class="btn btn-secondary" href="/expenses/${expense.id}">Details</a>
        <a class="btn btn-warning" href="/expenses/${expense.id}/edit">Edit</a>

        <form action="/expenses/${expense.id}/delete" method="POST">
          <button class="btn-danger" type="submit">Delete</button>
        </form>
      </div>
    </div>
  `;
}

async function loadExpenses() {
  const params = new URLSearchParams();

  if (searchInput.value.trim()) {
    params.set("category", searchInput.value.trim());
  }

  if (sortFilter.value) {
    params.set("sort", sortFilter.value);
  }

  const response = await fetch(`/api/expenses?${params.toString()}`);
  const expenses = await response.json();

  if (expenses.length === 0) {
    expensesList.innerHTML = '<p class="empty-state">No expenses found.</p>';
    return;
  }

  expensesList.innerHTML = expenses.map(renderExpense).join("");
}

if (searchInput && sortFilter && expensesList) {
  searchInput.addEventListener("input", loadExpenses);
  sortFilter.addEventListener("change", loadExpenses);
}
