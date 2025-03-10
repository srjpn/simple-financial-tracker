const transactions = [];

const parseDate = (dateStr) => {
  const [day, month, year] = dateStr.split('/');
  // month is 0-based in JavaScript Date
  return new Date(year, month - 1, day);
};

const addTransaction = (date, amount) => {
  const parsedDate = parseDate(date);

  if (transactions.length > 0) {
    const lastTransaction = getLastTransaction();

    if (lastTransaction.date > parsedDate)
      throw new Error("Date should not be an older date");
  }

  if (canAddTransaction(amount)) throw new Error("Insufficinat balance");

  transactions.push({
    date: parsedDate,
    amount,
  });
};

const getTransactions = () => {
  return transactions;
};

const getBalance = () => {
  return transactions.reduce((sum, txn) => {
    return sum + txn.amount;
  }, 0);
};

const clear = () => {
  transactions.splice(0, transactions.length);
};

const identifyPattern = (amount) => {
  const absAmount = Math.abs(amount);
  if (absAmount < 500) return "small";
  else if (absAmount < 1000) return "medium";
  else return "large";
};

const getSpendingPattern = () => {
  return transactions.reduce(
    (spendingPattern, txn) => {
      if (isExpense(txn))
        spendingPattern[identifyPattern(txn.amount)] += txn.amount;
      return spendingPattern;
    },
    { small: 0, medium: 0, large: 0 }
  );
};

const getMonthlySummary = (monthAndYear) => {
  const [month, year] = monthAndYear.split("/");

  return transactions.reduce(
    (summary, txn) => {
      const transactionDate = txn.date;
      if (transactionDate.getMonth() !== parseInt(month) - 1 || transactionDate.getFullYear() !== parseInt(year)) {
        return summary;
      }
      if (isExpense(txn)) {
        summary.expenses += txn.amount;
      } else {
        summary.income += txn.amount;
      }
      summary.balance += txn.amount;
      return summary;
    },
    { income: 0, expenses: 0, balance: 0 }
  );
};

module.exports = {
  addTransaction,
  getTransactions,
  getBalance,
  clear,
  getSpendingPattern,
  getMonthlySummary,
};
function isExpense(txn) {
  return txn.amount < 0;
}

function canAddTransaction(amount) {
  return getBalance() + amount < 0;
}

function getLastTransaction() {
  return transactions[transactions.length - 1];
}
