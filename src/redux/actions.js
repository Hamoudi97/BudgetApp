//expense actiosn
export const ADD_EXPENSE = 'ADD_EXPENSE';
export const DELETE_EXPENSE = 'DELETE_EXPENSE';
export const UPDATE_EXPENSE = 'UPDATE_EXPENSE';
export const CLEAR_EXPENSES = 'CLEAR_EXPENSES';
export const SET_EXPENSES = 'SET_EXPENSES';
export const FILTER_EXPENSES = 'FILTER_EXPENSES';

//bdudgeting actions
export const ADD_BUDGET = 'ADD_BUDGET';
export const UPDATE_BUDGET = 'UPDATE_BUDGET';
export const DELETE_BUDGET = 'DELETE_BUDGET';
export const CLEAR_BUDGETS = 'CLEAR_BUDGETS';
export const SET_BUDGETS = 'SET_BUDGETS';

//auth actions
export const LOGIN_USER = 'LOGIN_USER';
export const LOGOUT_USER = 'LOGOUT_USER';
export const REGISTER_USER = 'REGISTER_USER';
export const SET_USER = 'SET_USER';
export const CLEAR_USER = 'CLEAR_USER';

//for expenses
export const addExpense = (expense) => ({ type: ADD_EXPENSE, payload: expense });
export const deleteExpense = (id) => ({ type: DELETE_EXPENSE, payload: id });
export const updateExpense = (expense) => ({ type: UPDATE_EXPENSE, payload: expense });
export const clearExpenses = () => ({ type: CLEAR_EXPENSES });
export const setExpenses = (expenses) => ({ type: SET_EXPENSES, payload: expenses });
export const filterExpenses = (filter) => ({ type: FILTER_EXPENSES, payload: filter });

//Budgets
export const addBudget = (budget) => ({ type: ADD_BUDGET, payload: budget });
export const updateBudget = (budget) => ({ type: UPDATE_BUDGET, payload: budget });
export const deleteBudget = (id) => ({ type: DELETE_BUDGET, payload: id });
export const clearBudgets = () => ({ type: CLEAR_BUDGETS });
export const setBudgets = (budgets) => ({ type: SET_BUDGETS, payload: budgets });

//for Auth
export const loginUser = (user) => ({ type: LOGIN_USER, payload: user });
export const logoutUser = () => ({ type: LOGOUT_USER });
export const registerUser = (user) => ({ type: REGISTER_USER, payload: user });
export const setUser = (user) => ({ type: SET_USER, payload: user });
export const clearUser = () => ({ type: CLEAR_USER });
