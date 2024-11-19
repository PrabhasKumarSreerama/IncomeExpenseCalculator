# Income Expense Calculator

The **Income Expense Calculator** is a simple web application that allows users to track their income and expenses by adding, editing, and deleting transactions. It calculates and displays the total income, total expenses, and net balance, while providing the ability to filter transactions by type - Income/Expense/All (default).

---

## Features

- Add transactions (Income or Expense).
- View all transactions in a table.
- Edit or delete transactions (All CRUD Operations).
- Display:
  - Total Income
  - Total Expenses
  - Net Balance
- Filter transactions by type: Income, Expense, or All.
- Data persistence using **localStorage** to retain transactions across sessions.
- Responsive design for both desktop and mobile views.

---

## Technologies Used

- **HTML5**: Markup structure.
- **CSS3**: Styling and responsive design.
- **JavaScript**: Core application logic.
- **Font Awesome**: Icons for buttons and UI.

---


## How to Use The Application

1. **Add a Transaction**:
   - Select "Income" or "Expense" from the dropdown.
   - Enter a description and amount.
   - Click **Add** to save the transaction.

2. **Edit a Transaction**:
   - Click the **Edit** button next to the transaction in the table.
   - Modify the details in the form.
   - Click **Update** to save changes.
   - During Editing the **Delete** functionality is disabled for that transaction

3. **Delete a Transaction**:
   - Click the **Del** button next to the transaction in the table.

4. **Filter Transactions**:
   - Use the radio buttons in the "Filters" section to view:
     - All transactions
     - Only Income transactions
     - Only Expense transactions

5. **Reset the Form**:
   - Click **Reset** to clear the form inputs.

---
