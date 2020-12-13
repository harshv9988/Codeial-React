import {
  LOGIN_START,
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  SIGNUP_START,
  SIGNUP_SUCCESS,
  SIGNUP_FAIL,
  AUTHENTICATE_USER,
  SIGNOUT_USER,
  CLEAR_ERROR_MSG,
  EDIT_USER_SUCCESSFUL,
  EDIT_USER_FAILED,
} from "./actionTypes";
import { APIUrls } from "../helpers/urls";
import { getFormBody, getJwtToken } from "../helpers/utils";

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

export function clearAuthState() {
  return {
    type: CLEAR_ERROR_MSG,
  };
}

export function editUserSuccessful(user) {
  return {
    type: EDIT_USER_SUCCESSFUL,
    user,
  };
}

export function editUserFailed(error) {
  return {
    type: EDIT_USER_FAILED,
    error,
  };
}

export function editUser(name, password, confirmPassword, userId) {
  return (dispatch) => {
    const url = APIUrls.editProfile();
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `Bearer ${getJwtToken()}`,
      },
      body: getFormBody({
        name,
        password,
        confirm_password: confirmPassword,
        id: userId,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("edit-profile-data", data);
        if (data.success) {
          dispatch(editUserSuccessful(data.data.user));
          if (data.data.token) {
            localStorage.setItem("token", data.data.token);
          }
          return;
        }
        dispatch(editUserFailed(data.message));
      });
  };
}
