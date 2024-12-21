
// const budgetInput = document.getElementById("budget-input");
// const setBudgetButton = document.getElementById("set-budget");
// const budgetDisplay = document.getElementById("budget-display");
// const expenseNameInput = document.getElementById("expense-name");
// const expenseAmountInput = document.getElementById("expense-amount");
// const expenseCategorySelect = document.getElementById("expense-category");
// const addExpenseButton = document.getElementById("add-expense");
// const expenseItemsList = document.getElementById("expense-items");
// const remainingBudgetDisplay = document.getElementById("remaining-budget");

// let totalBudget = 0;
// let totalExpenses = 0;
// let expenses = [];

// setBudgetButton.addEventListener("click", () => {
//   const budgetValue = parseFloat(budgetInput.value);
//   if (!isNaN(budgetValue) && budgetValue > 0) {
//     totalBudget = budgetValue;
//     budgetDisplay.textContent = `Monthly Budget: $${totalBudget.toFixed(2)}`;
//     updateRemainingBudget();
//     budgetInput.value = ""; 
//   } else {
//     alert("Please enter a valid budget amount!");
//   }
// });

// addExpenseButton.addEventListener("click", () => {
//   const expenseName = expenseNameInput.value.trim();
//   const expenseAmount = parseFloat(expenseAmountInput.value);
//   const expenseCategory = expenseCategorySelect.value;

//   if (expenseName && !isNaN(expenseAmount) && expenseAmount > 0) {
    
//     const expense = {
//       name: expenseName,
//       amount: expenseAmount,
//       category: expenseCategory,
//     };
//     expenses.push(expense);
//     totalExpenses += expenseAmount;


//     const expenseItem = document.createElement("li");
//     expenseItem.textContent = `${expenseName} - $${expenseAmount.toFixed(2)} (${expenseCategory})`;
//     expenseItemsList.appendChild(expenseItem);

    
//     updateRemainingBudget();

   
//     expenseNameInput.value = "";
//     expenseAmountInput.value = "";
//   } else {
//     alert("Please enter valid expense details!");
//   }
// });


// function updateRemainingBudget() {
//   const remainingBudget = totalBudget - totalExpenses;
//   remainingBudgetDisplay.textContent = `Remaining Budget: $${remainingBudget.toFixed(2)}`;

 
//   if (remainingBudget < 0) {
//     remainingBudgetDisplay.style.color = "red";
//     alert("Budget exceeded! Please review your expenses.");
//   } else {
//     remainingBudgetDisplay.style.color = "green";
//   }
// }

const budgetInput = document.getElementById("budget-input");
const setBudgetButton = document.getElementById("set-budget");
const budgetDisplay = document.getElementById("budget-display");
const expenseNameInput = document.getElementById("expense-name");
const expenseAmountInput = document.getElementById("expense-amount");
const expenseCategorySelect = document.getElementById("expense-category");
const addExpenseButton = document.getElementById("add-expense");
const expenseItemsList = document.getElementById("expense-items");
const remainingBudgetDisplay = document.getElementById("remaining-budget");
const chartCanvas = document.getElementById("expenseChart");

let totalBudget = 0;
let totalExpenses = 0;
let expenses = [];
let expenseChart = null;

function initializeChart() {
    expenseChart = new Chart(chartCanvas, {
        type: 'pie',
        data: {
            labels: [],
            datasets: [{
                data: [],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.8)',
                    'rgba(54, 162, 235, 0.8)',
                    'rgba(255, 206, 86, 0.8)',
                    'rgba(75, 192, 192, 0.8)'
                ]
            }]
        },
        options: {
            responsive: true,
            plugins: {
                title: {
                    display: true,
                    text: 'Expense Distribution by Category'
                }
            }
        }
    });
}

function updateChart() {
    const categoryTotals = {};
    
 
    expenses.forEach(expense => {
        categoryTotals[expense.category] = (categoryTotals[expense.category] || 0) + expense.amount;
    });

    
    expenseChart.data.labels = Object.keys(categoryTotals);
    expenseChart.data.datasets[0].data = Object.values(categoryTotals);
    expenseChart.update();
}

setBudgetButton.addEventListener("click", () => {
    const budgetValue = parseFloat(budgetInput.value);
    if (!isNaN(budgetValue) && budgetValue > 0) {
        totalBudget = budgetValue;
        budgetDisplay.textContent = `Monthly Budget: $${totalBudget.toFixed(2)}`;
        updateRemainingBudget();
        budgetInput.value = "";
    } else {
        alert("Please enter a valid budget amount!");
    }
});

addExpenseButton.addEventListener("click", () => {
    const expenseName = expenseNameInput.value.trim();
    const expenseAmount = parseFloat(expenseAmountInput.value);
    const expenseCategory = expenseCategorySelect.value;

    if (expenseName && !isNaN(expenseAmount) && expenseAmount > 0) {
        const expense = {
            name: expenseName,
            amount: expenseAmount,
            category: expenseCategory,
        };
        expenses.push(expense);
        totalExpenses += expenseAmount;

        const expenseItem = document.createElement("li");
        expenseItem.textContent = `${expenseName} - $${expenseAmount.toFixed(2)} (${expenseCategory})`;
        expenseItemsList.appendChild(expenseItem);

        updateRemainingBudget();
        updateChart();

        expenseNameInput.value = "";
        expenseAmountInput.value = "";
    } else {
        alert("Please enter valid expense details!");
    }
});

function updateRemainingBudget() {
    const remainingBudget = totalBudget - totalExpenses;
    remainingBudgetDisplay.textContent = `Remaining Budget: $${remainingBudget.toFixed(2)}`;

    if (remainingBudget < 0) {
        remainingBudgetDisplay.style.color = "red";
        alert("Budget exceeded! Please review your expenses.");
    } else {
        remainingBudgetDisplay.style.color = "green";
    }
}


initializeChart();