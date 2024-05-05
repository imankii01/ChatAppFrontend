import {
  forgetPasswordLinkConstants,
  getuserDetailsConstants,
  loginUserConstants,
  signupUserConstants,
  updatePasswordConstants,
  updateUserDetailsConstants,
} from "../../constants";

export function loginUserAction(data) {
  return { type: loginUserConstants.LOGIN_USER_REQUEST, data };
}

export function singupUserAction(data) {
  return { type: signupUserConstants.SIGNUP_USER_REQUEST, data };
}

export function getuserDetailsAction(data) {
  return { type: getuserDetailsConstants.GET_USER_DETAILS_REQUEST, data };
}

export function updateUserDetailsAction(data) {
  return { type: updateUserDetailsConstants.UPDATE_USER_DETAILS_REQUEST, data };
}
export function forgetPasswordLinkAction(data) {
  return {
    type: forgetPasswordLinkConstants.FORGET_PASSWORD_LINK_REQUEST,
    data,
  };
}
export function updatePasswordAction(data) {
  return { type: updatePasswordConstants.UPDATE_PASSWORD_REQUEST, data };
}
