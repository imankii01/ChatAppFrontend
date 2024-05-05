import { call, put } from "redux-saga/effects";
import {
  forgetPasswordLinkConstants,
  getuserDetailsConstants,
  loginUserConstants,
  signupUserConstants,
  updatePasswordConstants,
  updateUserDetailsConstants,
} from "../../constants";
import {
  forgetPasswordLinkCall,
  getUserDetailCall,
  loginUserCall,
  singupUserCall,
  updatePasswordCall,
  updateUserDetailCall,
} from "../../network";

export function* loginUserSaga(action) {
  try {
    const response = yield call(loginUserCall, action.data);

    yield put({
      type: loginUserConstants.LOGIN_USER_SUCCESS,
      data: response.data,
      status: response.status,
      error: response.error,
      message: response.message,
      headers: response.headers,
    });
  } catch (e) {
    yield put({
      type: loginUserConstants.LOGIN_USER_FAILURE,
      status: e.status,
      message: e.message,
      error: e.error,
      headers: e.response,
    });
  }
}
export function* singupUserSaga(action) {
  try {
    const response = yield call(singupUserCall, action.data);
    yield put({
      type: signupUserConstants.SIGNUP_USER_SUCCESS,
      data: response.data,
      status: response.status,
      error: response.error,
      message: response.message,
      headers: response.headers,
    });
  } catch (e) {
    yield put({
      type: signupUserConstants.SIGNUP_USER_FAILURE,
      status: e.status,
      message: e.message,
      error: e.error,
      headers: e.response,
    });
  }
}
export function* getUserDetailsSaga(action) {
  try {
    const response = yield call(getUserDetailCall, action.data);
    yield put({
      type: getuserDetailsConstants.GET_USER_DETAILS_SUCCESS,
      data: response.data,
      status: response.status,
      error: response.error,
    });
  } catch (e) {
    yield put({
      type: getuserDetailsConstants.GET_USER_DETAILS_FAILURE,
      status: e.status,
      message: e.message,
      error: e.error,
    });
  }
}
export function* UpdateUserDetailsSaga(action) {
  try {
    const response = yield call(updateUserDetailCall, action.data);
    yield put({
      type: updateUserDetailsConstants.UPDATE_USER_DETAILS_SUCCESS,
      data: response.data,
      status: response.status,
      error: response.error,
    });
  } catch (e) {
    yield put({
      type: updateUserDetailsConstants.UPDATE_USER_DETAILS_FAILURE,
      error: e.message,
    });
  }
}
export function* forgetPasswordLinkSaga(action) {
  try {
    const response = yield call(forgetPasswordLinkCall, action.data);
    yield put({
      type: forgetPasswordLinkConstants.FORGET_PASSWORD_LINK_REQUEST,
      data: response.data,
      status: response.status,
      error: response.error,
    });
  } catch (e) {
    yield put({
      type: forgetPasswordLinkConstants.FORGET_PASSWORD_LINK_SUCCESS,
      error: e.message,
    });
  }
}
export function* updatePasswordSaga(action) {
  try {
    const response = yield call(updatePasswordCall, action.data);
    yield put({
      type: updatePasswordConstants.UPDATE_PASSWORD_REQUEST,
      data: response.data,
      status: response.status,
      error: response.error,
    });
  } catch (e) {
    yield put({
      type: updatePasswordConstants.UPDATE_PASSWORD_SUCCESS,
      error: e.message,
    });
  }
}
