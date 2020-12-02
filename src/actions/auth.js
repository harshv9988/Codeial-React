import {
  LOGIN_START,
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  SIGNUP_START,
  SIGNUP_SUCCESS,
  SIGNUP_FAIL,
  AUTHENTICATE_USER,
  SIGNOUT_USER,
} from "./actionTypes";
import { APIUrls } from "../helpers/urls";
import { getFormBody } from "../helpers/utils";

export function startLogin() {
  return {
    type: LOGIN_START,
  };
}

export function loginFailed(errorMessage) {
  return {
    type: LOGIN_FAIL,
    error: errorMessage,
  };
}

export function loginSuccess(user) {
  return {
    type: LOGIN_SUCCESS,
    user: user,
  };
}

export function login(email, password) {
  return (dispatch) => {
    const url = APIUrls.login();
    dispatch(startLogin());
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: getFormBody({ email, password }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("data", data);
        if (data.success) {
          localStorage.setItem("token", data.data.token);
          dispatch(loginSuccess(data.data.user));
          return;
        }
        dispatch(loginFailed(data.message));
      });
  };
}

export function startSignup() {
  return {
    type: SIGNUP_START,
  };
}

export function signupSuccess(user) {
  return {
    type: SIGNUP_SUCCESS,
    user: user,
  };
}

export function signupFailed(errorMessage) {
  return {
    type: SIGNUP_FAIL,
    error: errorMessage,
  };
}

export function signup(name, email, password, confirmpass) {
  return (dispatch) => {
    const url = APIUrls.signup();
    dispatch(startSignup());
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: getFormBody({
        name,
        email,
        password,
        confirm_password: confirmpass,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("signup-data", data);
        if (data.success) {
          localStorage.setItem("token", data.data.token);
          dispatch(signupSuccess(data.data.user));
          return;
        }
        dispatch(signupFailed(data.message));
      });
  };
}

export function authenticateUser(user) {
  return {
    type: AUTHENTICATE_USER,
    user: user,
  };
}

export function signoutuser() {
  return {
    type: SIGNOUT_USER,
  };
}
