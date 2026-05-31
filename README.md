# Student Expense Tracker

A simple, beginner-friendly web application for tracking student expenses. Track your monthly spending, view daily averages, and see category breakdowns without any complex chart libraries.

## Features

- Add expenses with amount, category, date, and description
- View monthly summary with:
  - Current month
  - Number of expenses
  - Daily average spending
  - Highest expense
- Simple category breakdown with percentages
- Responsive design that works on mobile and desktop
- Data persistence using browser localStorage

## How to Run Locally

### Method 1: Direct File Opening (Simplest)

1. **Download or clone this repository** to your computer
2. **Navigate** to the `student-expense-tracker` folder
3. **Open** the `index.html` file in your web browser:
   - Double-click on `index.html` in your file explorer
   - Or right-click → "Open with" → Choose your browser

That's it! The app will open in your browser and you can start tracking expenses.

### Method 2: Using a Local Server (Recommended for Development)

If you want to run it with a local server (useful if you're making changes to the code):

1. **Install a simple server** (if you don't have one):
   ```bash
   npm install -g http-server
   ```

2. **Navigate** to the project folder:
   ```bash
   cd student-expense-tracker
   ```

3. **Start the server**:
   ```bash
   http-server
   ```

4. **Open** your browser to: http://localhost:8080

### Method 3: Using Python (If you have Python installed)

1. **Navigate** to the project folder:
   ```bash
   cd student-expense-tracker
   ```

2. **Run Python's simple server**:
   ```bash
   python -m http.server 8000
   ```

3. **Open** your browser to: http://localhost:8000

## Project Structure

```
student-expense-tracker/
├── index.html      # Main HTML file
├── styles.css      # CSS styling for responsive UI
├── app.js          # JavaScript logic with beginner comments
└── README.md       # This file
```

## How to Use the App

1. Fill in the **Add New Expense** form:
   - **Amount**: How much you spent (in dollars)
   - **Category**: Select from the dropdown (Food, Transport, Books, etc.)
   - **Date**: When the expense occurred (defaults to today)
   - **Description**: Optional details about the expense

2. Click **Add Expense** to save it

3. View your **Monthly Summary** to see:
   - Which month you're tracking
   - How many expenses you've added
   - Your average daily spending
   - Your highest single expense

4. Check the **Category Breakdown** to see how your spending is distributed across different categories

5. See all your expenses listed in the **Your Expenses** section

6. To delete an expense, click the **×** button next to it

## Browser Support

Works in all modern browsers:
- Chrome
- Firefox
- Edge
- Safari
- Opera

## Technologies Used

- HTML5
- CSS3 (with Flexbox and Grid for responsive layout)
- Vanilla JavaScript (no frameworks or libraries)
- localStorage API for data persistence

## Notes for Beginners

- All code is heavily commented in `app.js` to explain what each part does
- No external libraries are used - just plain HTML, CSS, and JavaScript
- Data is saved in your browser's localStorage, so it persists between visits
- The app is intentionally simple to make it easy to understand and modify
