import { ADD_EXPENSE,DELETE_EXPENSE, UPDATE_EXPENSE,CLEAR_EXPENSES, SET_EXPENSES,FILTER_EXPENSES, } from '../actions';

const initialState = {
  expenses: [],
  filteredExpenses: [],
};

const expenseReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_EXPENSE:
      const newExpense = {
        id: Date.now().toString(),
        userId: 'user-123',
        amount: parseFloat(action.payload.amount),
        category: action.payload.category,
        description: action.payload.desc,
        date: new Date().toISOString(),
      };
      return {
        ...state,
        expenses: [...state.expenses, newExpense],
        filteredExpenses: [...state.expenses, newExpense],
      };

    case DELETE_EXPENSE:
      return {
        ...state,
        expenses: state.expenses.filter((exp) => exp.id !== action.payload),
        filteredExpenses: state.filteredExpenses.filter((exp) => exp.id !== action.payload),
      };

    case UPDATE_EXPENSE:
      return {
        ...state,
        expenses: state.expenses.map((exp) =>
          exp.id === action.payload.id ? action.payload : exp
        ),
        filteredExpenses: state.filteredExpenses.map((exp) =>
          exp.id === action.payload.id ? action.payload : exp
        ),
      };

    case CLEAR_EXPENSES:
      return {
        ...state,
        expenses: [],
        filteredExpenses: [],
      };

    case SET_EXPENSES:
      return {
        ...state,
        expenses: action.payload,
        filteredExpenses: action.payload,
      };

    case FILTER_EXPENSES:
      const filtered = state.expenses.filter((exp) =>
        action.payload ? exp.category === action.payload : true
      );
      return {
        ...state,
        filteredExpenses: filtered,
      };

    default:
      return state;
  }
};

export default expenseReducer;
