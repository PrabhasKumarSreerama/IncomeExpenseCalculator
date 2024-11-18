//array to store the all type of transactions
let transactions = JSON.parse(localStorage.getItem('transactions')) || [];
let isEditing=false;
let editingTransactionId = null;
let currentFilter = "All";

//function to save in local storage
function saveToLocal() {
    localStorage.setItem("transactions", JSON.stringify(transactions));
}

// Function to calculate totals
function calculateTotals() {
    let totalIncome = 0;
    let totalExpenses = 0;
    transactions.forEach(transaction => {
        if (transaction.type === "Income") {
            totalIncome += transaction.amount;
        } else if (transaction.type === "Expense") {
            totalExpenses += transaction.amount;
        }
    });
    const netBalance = totalIncome-totalExpenses;
    document.getElementById("total-income").textContent = parseFloat(totalIncome).toFixed(2);
    document.getElementById("total-expenses").textContent = parseFloat(totalExpenses).toFixed(2);
    document.getElementById("net-balance").textContent = parseFloat(netBalance).toFixed(2);
}

//function to add the current transaction
function addTransaction(type, desc, amount) {
    const transaction = {
        id: Date.now().toString(), //since this will be definitely unique value
        type, 
        desc,
        amount: parseFloat(parseFloat(amount).toFixed(2)),
    }
    transactions.push(transaction);
    saveToLocal();
    calculateTotals();
    showTransactions();
}

//function to update the already existed transaction
function updateTransaction(id, type, desc, amount) {
    transactions.forEach( transaction => {
        if(transaction.id === id){ // finding the matching id
            transaction.type = type;
            transaction.desc = desc;
            transaction.amount = parseFloat(parseFloat(amount).toFixed(2));
        }
    })
    isEditing = false; 
    editingTransactionId = null;
    calculateTotals();
    saveToLocal();
    resetForm();
    showTransactions();
}

//function to delete the existing transaction 
function deleteTransaction(id) {
    transactions =transactions.filter(transaction => transaction.id!==id);
    calculateTotals();
    saveToLocal();
    showTransactions();
}

// function to move the transaction from the table to form
function moveTransaction(id) {
    isEditing=true;
    editingTransactionId = id;
    document.getElementById("add-btn").textContent = "Update";
    const selectedTransaction=transactions.find(transaction => transaction.id === id); // get that selected transaction
    document.getElementById("transaction-id").value = selectedTransaction.id;
    document.getElementById("transaction-type").value = selectedTransaction.type;
    document.getElementById("transaction-desc").value = selectedTransaction.desc;
    document.getElementById("transaction-amount").value = selectedTransaction.amount;
    showTransactions();
}

//function to show(render) the transactions
function showTransactions() {
    const transactionsList = document.getElementById("transactions-list-body"); //all transactions in the table
    transactionsList.innerHTML='';
    const filteredList = transactions.filter(transaction => (currentFilter === "All"||transaction.type === currentFilter));
    filteredList.forEach(transaction => {
        const tableRow=document.createElement('tr');
        tableRow.innerHTML=`
            <td>${transaction.type}</td>
            <td>${transaction.desc}</td>
            <td>${parseFloat(transaction.amount).toFixed(2)}</td>
            <td>
                <button class="edit" onclick="moveTransaction('${transaction.id}')"><i class="fa-solid fa-pen"></i>Edit</button>
                <button class="delete" onclick="deleteTransaction('${transaction.id}')" ${transaction.id === editingTransactionId ? "disabled" : ""}><i class="fa-solid fa-trash"></i>Del</button>
            </td>
        `;
        transactionsList.appendChild(tableRow);
    })
}

//function to reset the form 
function resetForm() {
    document.getElementById("form").reset();
    document.getElementById("transaction-id").value = '';
    document.querySelector("button[type='submit']").textContent = "Add";
    isEditing = false; 
    editingTransactionId = null;
    showTransactions();
}

//function to handle the submission of the form
function handleSubmit(event) {
    event.preventDefault();
    const id = document.getElementById("transaction-id").value ;
    const type = document.getElementById("transaction-type").value ;
    const desc = document.getElementById("transaction-desc").value ;
    const amount = document.getElementById("transaction-amount").value ;
    id?updateTransaction(id, type, desc, amount):addTransaction(type, desc, amount);
    resetForm();
}

//on submit save the info
document.getElementById("form").addEventListener("submit", handleSubmit); 

document.getElementById("reset-btn").addEventListener("click", resetForm);

// dd event listener to update the filter
document.getElementById("filter-form").addEventListener("change", event => {
    currentFilter = event.target.value; 
    showTransactions();
});

showTransactions();