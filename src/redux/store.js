import { createStore, combineReducers } from 'redux';
import expenseReducer from './reducers/expenseReducer';
import budgetReducer from './reducers/budgetReducer';
import authReducer from './reducers/authReducer';

const rootReducer = combineReducers({
  expenses: expenseReducer,
  budgets: budgetReducer,
  auth: authReducer,
});

const store = createStore(rootReducer);

export default store;
