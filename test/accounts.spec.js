const account = require("../src/account");

describe("Financial Account", () => {
  beforeEach(() => {
    account.clear();
  });

  const sampleTransactions = [
    { date: "01/01/2024", amount: 200 },
    { date: "01/03/2024", amount: 1000 },
    { date: "01/05/2024", amount: -500 },
    { date: "15/05/2024", amount: 1500 },
    { date: "01/06/2024", amount: -2000 },
    { date: "01/07/2024", amount: 150 },
    { date: "01/07/2024", amount: 1000 },
    { date: "05/07/2024", amount: 500 },
    { date: "31/07/2024", amount: -500 },
    { date: "30/08/2024", amount: -200 },
  ];

  describe("Transaction Management", () => {
    it("should add a single transaction and retrieve it", () => {
      const date = "01/02/2024";
      const amount = 200;
      account.addTransaction(date, amount);
      expect(account.getTransactions()).toHaveLength(1);
    });

    it("should maintain chronological order of transactions", () => {
      const date = "01/01/2024";
      const amount = 200;
      account.addTransaction(date, amount);
      const olderDate = "01/12/2023";
      expect(() => account.addTransaction(olderDate, amount)).toThrow(Error);
    });

    it("should prevent negative balance transactions", () => {
      const date = "01/01/2024";
      const amount = -200;
      expect(() => account.addTransaction(date, amount)).toThrow(Error);
    });
  });

  describe("Balance Calculations", () => {
    it("should calculate correct total balance", () => {
      sampleTransactions.forEach((txn) => account.addTransaction(txn.date, txn.amount));
      expect(account.getBalance()).toBe(1150);
    });
  });

  describe("Spending Analysis", () => {
    it("should categorize expenses into small, medium, and large", () => {
      sampleTransactions.forEach((txn) => account.addTransaction(txn.date, txn.amount));
      expect(account.getSpendingPattern()).toEqual({
        small: -200,
        medium: -1000,
        large: -2000,
      });
    });

    it("should calculate monthly income, expenses, and balance", () => {
      sampleTransactions.forEach((txn) => account.addTransaction(txn.date, txn.amount));
      expect(account.getMonthlySummary("07/2024")).toEqual({
        income: 1650,
        expenses: -500,
        balance: 1150,
      });
    });
  });
});
