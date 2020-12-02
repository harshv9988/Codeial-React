import {
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGIN_START,
  AUTHENTICATE_USER,
  SIGNOUT_USER,
} from "../actions/actionTypes";

const initialAuthState = {
  user: {},
  error: null,
  isLoggedIn: false,
  inProgress: false,
};

export default function auth(state = initialAuthState, action) {
  switch (action.type) {
    case LOGIN_START:
      return {
        ...state,
        isProgress: true,
      };

    case LOGIN_SUCCESS:
      return {
        ...state,
        user: action.user,
        isLoggedIn: true,
        isProgress: false,
        error: null,
      };

    case LOGIN_FAIL:
      return {
        ...state,
        isProgress: false,
        error: action.error,
      };

    case AUTHENTICATE_USER:
      return {
        ...state,
        user: action.user,
        isLoggedIn: true,
      };

    case SIGNOUT_USER:
      return {
        ...state,
        user: {},
        isLoggedIn: false,
      };

    default:
      return state;
  }
}
