# Simple Financial Tracker

A tool to track financial transactions and execute computations on top of them.

## Requirements

- You can write a class or multiple functions to satisfy the requirements
- You are free to use stateless or stateful functions
- The term "function" is used to refer generally to a function or a method
- Write unit tests for each function to verify its behavior
- Prioritize completing the exercise in full

## Exercise

### 1. Track Transactions

Write a function to track transactions that:
- Accepts a transaction as input and adds it to the list of transactions
- Transactions should be represented as objects with properties:
  - `date`: either a string or a Date object
  - `amount`: a number representing the monetary value of the transaction
  - A positive value represents income
  - A negative value represents expenses

#### Baseline Data
The following transactions will be used as our baseline (dates in format dd/MM/yyyy):

```javascript
[
  { date: '01/01/2024', amount: 200 },
  { date: '01/03/2024', amount: 1000 },
  { date: '01/05/2024', amount: -500 },
  { date: '15/05/2024', amount: 1500 },
  { date: '01/06/2024', amount: -2000 },
  { date: '01/07/2024', amount: 150 },
  { date: '01/07/2024', amount: 1000 },
  { date: '05/07/2024', amount: 500 },
  { date: '31/07/2024', amount: -500 },
  { date: '30/08/2024', amount: -200 }
]
```

### 2. Retrieve and Clear Transactions

- Write a function which returns an array/list containing all the tracked transactions
- Write a function which allows clearing the list of transactions

### 3. Calculate Balance

- Write a function that can calculate the balance of the account
- In the baseline, the account balance should be: 1150

### 4. Handle Out-of-Order Transactions and Insufficient Balance

Modify the transaction tracking function to throw/raise an error when:
- A transaction has a date that is before the date of the last transaction
  Example: `{ date: '01/02/2024', amount: 1 }`
- A transaction has a negative amount that would bring the account balance below zero
  Example: `{ date: '01/12/2024', amount: -10000 }`

### 5. Identify Spending Patterns

Create a function to classify spending patterns by grouping expenses into:
- Small expenses: below 500 (in absolute value)
- Medium expenses: below 1000
- Large expenses: greater than or equal to 1000

Return an object containing the overall amount of expenses for each category.

Expected output for baseline data:
```javascript
{
  small: -200,
  medium: -1000,
  large: -2000
}
```

### 6. Monthly Income and Expense Analysis

Create a function to calculate income, expenses and balance for a provided month:
- Input: month in format 'MM/YYYY' (e.g., '07/2024')
- Output: object containing expenses, income, and balance

Example output for July 2024 using baseline data:
```javascript
{
  income: 1650,
  expenses: -500,
  balance: 1150
}
```
	
