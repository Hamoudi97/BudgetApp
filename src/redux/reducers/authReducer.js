import { LOGIN_USER, LOGOUT_USER, REGISTER_USER, SET_USER, CLEAR_USER,} from '../actions';

const initialState = {
  user: null,
  users: [],
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_USER:
      return {
        ...state,
        user: action.payload,
      };

    case LOGOUT_USER:
      return {
        ...state,
        user: null,
      };

    case REGISTER_USER:
      return {
        ...state,
        users: [...state.users, action.payload],
      };

    case SET_USER:
      return {
        ...state,
        user: action.payload,
      };

    case CLEAR_USER:
      return {
        ...state,
        user: null,
        users: [],
      };

    default:
      return state;
  }
};

export default authReducer;
