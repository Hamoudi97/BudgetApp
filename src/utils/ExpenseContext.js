import React, { createContext, useState } from "react";

export const ExpenseContext = createContext();

export const ExpenseProvider = ({ children }) => {
  const [expenses, setExpenses] = useState([]);
  const [budgets, setBudgets] = useState([]);

  // Add new expense
  const addExpense = (expense) => {
    const newExpense = {
      id: Date.now().toString(),
      userId: "user-123", // change to work with auth context later
      amount: parseFloat(expense.amount),
      category: expense.category,
      description: expense.desc,
      date: new Date().toISOString(),
    };
    setExpenses((prev) => [...prev, newExpense]);
  };

  // Save or update a budget
  const saveBudget = (budget) => {
    const existingIndex = budgets.findIndex(
      (b) => b.category === budget.category
    );

    if (existingIndex >= 0) {
      // Update existing budget
      const updated = [...budgets];
      updated[existingIndex] = budget;
      setBudgets(updated);
    } else {
      // Add new budget
      setBudgets((prev) => [...prev, budget]);
    }
  };

  // Get budgets for current month
  const getBudgets = (month, year) => {
    return budgets.filter((b) => b.month === month && b.year === year);
  };

  return (
    <ExpenseContext.Provider
      value={{
        expenses,
        budgets,
        addExpense,
        saveBudget,
        getBudgets,
      }}
    >
      {children}
    </ExpenseContext.Provider>
  );
};
