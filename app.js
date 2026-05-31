/**
 * Student Expense Tracker
 * A simple web app for tracking monthly expenses
 * This file contains all the JavaScript logic for the application
 */

// ============================================
// STEP 1: SETUP AND INITIAL DATA
// ============================================

// This is the main array that will store all expense data
// Each expense is an object with: id, amount, category, date, description
let expenses = [];

// DOM Elements - These are the HTML elements we'll be updating
// We store them in variables so we can easily access them later
const expenseForm = document.getElementById('expenseForm');
const expenseList = document.getElementById('expenseList');
const categoryBreakdown = document.getElementById('categoryBreakdown');
const currentMonthElement = document.getElementById('currentMonth');
const expenseCountElement = document.getElementById('expenseCount');
const dailyAverageElement = document.getElementById('dailyAverage');
const highestExpenseElement = document.getElementById('highestExpense');


// ============================================
// STEP 2: LOAD DATA FROM STORAGE
// ============================================

/**
 * Load expenses from localStorage when the page loads
 * localStorage is like a small database in the browser that remembers data
 * even after you close and reopen the page
 */
function loadExpenses() {
    // Check if there's saved data in localStorage
    const savedExpenses = localStorage.getItem('studentExpenses');
    
    // If there is saved data, parse it (convert from string to array)
    // and store it in our expenses array
    if (savedExpenses) {
        expenses = JSON.parse(savedExpenses);
    }
}


// ============================================
// STEP 3: SAVE DATA TO STORAGE
// ============================================

/**
 * Save expenses to localStorage
 * This converts our array to a string and saves it
 * so it persists even after page refresh
 */
function saveExpenses() {
    // Convert the expenses array to a string and save it
    localStorage.setItem('studentExpenses', JSON.stringify(expenses));
}


// ============================================
// STEP 4: ADD NEW EXPENSE
// ============================================

/**
 * Add a new expense to our list
 * @param {number} amount - The expense amount in dollars
 * @param {string} category - The category of the expense (e.g., "Food", "Transport")
 * @param {string} date - The date of the expense (format: YYYY-MM-DD)
 * @param {string} description - A description of the expense
 */
function addExpense(amount, category, date, description) {
    // Create a new expense object with a unique ID
    // Date.now() gives us a unique number based on the current time
    const newExpense = {
        id: Date.now(),
        amount: parseFloat(amount),
        category: category,
        date: date,
        description: description
    };
    
    // Add the new expense to the beginning of our array
    expenses.unshift(newExpense);
    
    // Save to localStorage so it's remembered
    saveExpenses();
    
    // Update the display
    renderExpenses();
    renderSummary();
    renderCategoryBreakdown();
    
    // Reset the form so it's ready for the next entry
    expenseForm.reset();
}


// ============================================
// STEP 5: DELETE AN EXPENSE
// ============================================

/**
 * Remove an expense from the list by its ID
 * @param {number} id - The unique ID of the expense to remove
 */
function deleteExpense(id) {
    // Filter the array to keep only expenses that don't match the ID
    // This creates a new array without the deleted expense
    expenses = expenses.filter(expense => expense.id !== id);
    
    // Save the updated list
    saveExpenses();
    
    // Update the display
    renderExpenses();
    renderSummary();
    renderCategoryBreakdown();
}


// ============================================
// STEP 6: CALCULATE MONTHLY SUMMARY
// ============================================

/**
 * Calculate and return summary statistics for the current month's expenses
 * This includes: current month name, total count, daily average, highest expense
 * @returns {object} An object containing month, count, dailyAverage, highestExpense
 */
function calculateSummary() {
    // If there are no expenses, return default values
    if (expenses.length === 0) {
        return {
            month: '-',
            count: 0,
            dailyAverage: 0,
            highestExpense: 0
        };
    }
    
    // Get the current month and year from the first expense
    // (We're assuming all expenses are for the current month in this simple app)
    const firstExpenseDate = new Date(expenses[0].date);
    const monthName = firstExpenseDate.toLocaleString('default', { 
        month: 'long', 
        year: 'numeric' 
    });
    
    // Count how many expenses we have
    const count = expenses.length;
    
    // Calculate the total amount spent
    const totalAmount = expenses.reduce((sum, expense) => sum + expense.amount, 0);
    
    // Calculate daily average
    // We approximate the number of days in the month as 30 for simplicity
    // (A more advanced app could calculate exact days)
    const dailyAverage = totalAmount / 30;
    
    // Find the highest expense using Math.max with spread operator
    // First we extract all amounts, then find the maximum
    const amounts = expenses.map(expense => expense.amount);
    const highestExpense = Math.max(...amounts);
    
    // Return all the calculated values as an object
    return {
        month: monthName,
        count: count,
        dailyAverage: dailyAverage,
        highestExpense: highestExpense
    };
}


// ============================================
// STEP 7: CALCULATE CATEGORY BREAKDOWN
// ============================================

/**
 * Calculate the percentage and total for each category
 * This shows how spending is distributed across different categories
 * @returns {Array} Array of objects with category, total, and percentage
 */
function calculateCategoryBreakdown() {
    // If no expenses, return empty array
    if (expenses.length === 0) {
        return [];
    }
    
    // First, calculate the total amount spent across all expenses
    const totalAmount = expenses.reduce((sum, expense) => sum + expense.amount, 0);
    
    // Create an object to track totals for each category
    const categoryTotals = {};
    
    // Loop through each expense and add to the appropriate category total
    for (const expense of expenses) {
        if (!categoryTotals[expense.category]) {
            categoryTotals[expense.category] = 0;
        }
        categoryTotals[expense.category] += expense.amount;
    }
    
    // Convert the object to an array of objects with category, total, and percentage
    const breakdown = [];
    for (const category in categoryTotals) {
        const total = categoryTotals[category];
        const percentage = (total / totalAmount * 100).toFixed(1); // Round to 1 decimal
        
        breakdown.push({
            category: category,
            total: total,
            percentage: parseFloat(percentage)
        });
    }
    
    // Sort by total amount (highest first)
    breakdown.sort((a, b) => b.total - a.total);
    
    return breakdown;
}


// ============================================
// STEP 8: RENDER EXPENSES TO THE PAGE
// ============================================

/**
 * Display all expenses in the expense list section
 * This creates HTML elements for each expense and adds them to the page
 */
function renderExpenses() {
    // Clear the current list
    expenseList.innerHTML = '';
    
    // If there are no expenses, show a friendly message
    if (expenses.length === 0) {
        expenseList.innerHTML = '<p class="no-data">No expenses yet. Add one above!</p>';
        return;
    }
    
    // Loop through each expense and create HTML for it
    expenses.forEach(expense => {
        // Create a div element for the expense
        const expenseElement = document.createElement('div');
        expenseElement.className = 'expense-item';
        
        // Format the date to be more readable (e.g., "Jan 15, 2024")
        const formattedDate = new Date(expense.date).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
        });
        
        // Format the amount to always show 2 decimal places
        const formattedAmount = expense.amount.toFixed(2);
        
        // Build the HTML for this expense
        expenseElement.innerHTML = `
            <div class="expense-info">
                <h4>${expense.category}</h4>
                <p>${formattedDate}</p>
                <p>${expense.description || 'No description'}</p>
            </div>
            <span class="expense-amount">$${formattedAmount}</span>
            <button class="delete-btn" onclick="deleteExpense(${expense.id})">
                &times;
            </button>
        `;
        
        // Add the expense element to the list
        expenseList.appendChild(expenseElement);
    });
}


// ============================================
// STEP 9: RENDER MONTHLY SUMMARY
// ============================================

/**
 * Update the monthly summary section with calculated values
 * Shows: month, number of expenses, daily average, highest expense
 */
function renderSummary() {
    // Calculate the summary statistics
    const summary = calculateSummary();
    
    // Update each element with the calculated value
    currentMonthElement.textContent = summary.month;
    expenseCountElement.textContent = summary.count;
    dailyAverageElement.textContent = '$' + summary.dailyAverage.toFixed(2);
    highestExpenseElement.textContent = '$' + summary.highestExpense.toFixed(2);
}


// ============================================
// STEP 10: RENDER CATEGORY BREAKDOWN
// ============================================

/**
 * Display the category breakdown as a simple list with percentages
 * Each category shows its name, percentage of total, and total amount
 */
function renderCategoryBreakdown() {
    // Calculate the breakdown data
    const breakdown = calculateCategoryBreakdown();
    
    // Clear the current breakdown
    categoryBreakdown.innerHTML = '';
    
    // If no breakdown data (no expenses), show a message
    if (breakdown.length === 0) {
        categoryBreakdown.innerHTML = '<p class="no-data">No expenses recorded yet.</p>';
        return;
    }
    
    // Loop through each category and create HTML for it
    breakdown.forEach(item => {
        const categoryElement = document.createElement('div');
        categoryElement.className = 'category-item';
        
        // Format the amount to 2 decimal places
        const formattedAmount = item.total.toFixed(2);
        
        // Create a class name for the progress bar based on category
        // We replace spaces with dashes and make it lowercase
        const barClass = item.category.toLowerCase().replace(/\s+/g, '-');
        
        // Build the HTML for this category
        categoryElement.innerHTML = `
            <span class="category-name">${item.category}</span>
            <div>
                <span class="category-percent">${item.percentage}%</span>
                <span class="category-amount">$${formattedAmount}</span>
            </div>
            <div class="progress-container">
                <div class="progress-bar ${barClass}" style="width: ${item.percentage}%"></div>
            </div>
        `;
        
        // Add the category element to the breakdown
        categoryBreakdown.appendChild(categoryElement);
    });
}


// ============================================
// STEP 11: FORM SUBMISSION HANDLER
// ============================================

/**
 * This function runs when the expense form is submitted
 * It prevents the page from refreshing and adds the new expense
 */
function handleFormSubmit(event) {
    // Prevent the default form submission behavior (page refresh)
    event.preventDefault();
    
    // Get the values from the form inputs
    const amount = document.getElementById('amount').value;
    const category = document.getElementById('category').value;
    const date = document.getElementById('date').value;
    const description = document.getElementById('description').value;
    
    // Validate that we have required values
    if (!amount || !category || !date) {
        alert('Please fill in all required fields!');
        return;
    }
    
    // Check that amount is a positive number
    if (parseFloat(amount) <= 0) {
        alert('Amount must be greater than zero!');
        return;
    }
    
    // If all validation passes, add the expense
    addExpense(amount, category, date, description);
}


// ============================================
// STEP 12: INITIALIZE THE APPLICATION
// ============================================

/**
 * This function runs when the page first loads
 * It sets up event listeners and loads any saved data
 */
function init() {
    // Load any saved expenses from localStorage
    loadExpenses();
    
    // Add event listener to the form
    // When the form is submitted, run our handleFormSubmit function
    expenseForm.addEventListener('submit', handleFormSubmit);
    
    // Set today's date as the default date in the form
    document.getElementById('date').valueAsDate = new Date();
    
    // Render the initial state of the page
    renderExpenses();
    renderSummary();
    renderCategoryBreakdown();
}


// ============================================
// START THE APPLICATION
// ============================================

// Run the init function when the page finishes loading
// This ensures all HTML elements exist before we try to access them
document.addEventListener('DOMContentLoaded', init);
