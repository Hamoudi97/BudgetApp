import { ADD_BUDGET, UPDATE_BUDGET, DELETE_BUDGET, CLEAR_BUDGETS,SET_BUDGETS, } from '../actions';

const initialState = {
  budgets: [],
};

const budgetReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_BUDGET:
      const existingIndex = state.budgets.findIndex(
        (b) => b.category === action.payload.category
      );
      if (existingIndex >= 0) {
        const updated = [...state.budgets];
        updated[existingIndex] = action.payload;
        return { ...state, budgets: updated };
      }
      return {
        ...state,
        budgets: [...state.budgets, action.payload],
      };

    case UPDATE_BUDGET:
      return {
        ...state,
        budgets: state.budgets.map((budget) =>
          budget.id === action.payload.id ? action.payload : budget
        ),
      };

    case DELETE_BUDGET:
      return {
        ...state,
        budgets: state.budgets.filter((budget) => budget.id !== action.payload),
      };

    case CLEAR_BUDGETS:
      return {
        ...state,
        budgets: [],
      };

    case SET_BUDGETS:
      return {
        ...state,
        budgets: action.payload,
      };

    default:
      return state;
  }
};

export default budgetReducer;
