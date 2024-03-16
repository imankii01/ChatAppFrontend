import { call, put } from "redux-saga/effects";
import { getMessagesConstants, getUserDetailsConstant, getUserListConstants, sendMessagesConstants, updateUserDetailsConstant, verfiyOtpConstant } from "../constant";
import { getMessageCall, getUserDetailsCall, getUserListCall, sendMessageCall, updatetUserDetailsCall, verifyOtpCall } from "../network";
import { updateUserDetailsAction } from "../actions/common";

export function* verifyOtpSaga(action) {
    try {
      const response = yield call(verifyOtpCall, action.data);
      yield put({
        type: verfiyOtpConstant.VERIFY_OTP_SUCCESS,
        data: response.data,
        status: response.status,
        error: response.error,
      });
    } catch (e) {
      yield put({
        type: verfiyOtpConstant.VERIFY_OTP_FAILURE,
        error: e.message,
      });
    }
  }
export function* getUserDetailsSaga(action) {
    try {
      const response = yield call(getUserDetailsCall, action.data);
      yield put({
        type: getUserDetailsConstant.GET_USER_DETAILS_SUCCESS,
        data: response.data,
        status: response.status,
        error: response.error,
      });
    } catch (e) {
      yield put({
        type: getUserDetailsConstant.GET_USER_DETAILS_FAILURE,
        error: e.message,
      });
    }
  }
export function* updateUserDetailsSaga(action) {
    try {
      const response = yield call(updatetUserDetailsCall, action.data);
      yield put({
        type: updateUserDetailsConstant.UPDATE_USER_DETAILS_SUCCESS,
        data: response.data,
        status: response.status,
        error: response.error,
      });
    } catch (e) {
      yield put({
        type: updateUserDetailsConstant.UPDATE_USER_DETAILS_FAILURE,
        error: e.message,
      });
    }
  }
export function* getUserListSaga(action) {
    try {
      const response = yield call(getUserListCall, action.data);
      yield put({
        type: getUserListConstants.GET_USER_LIST_SUCCESS,
        data: response.data,
        status: response.status,
        error: response.error,
      });
    } catch (e) {
      yield put({
        type: getUserListConstants.GET_USER_LIST_FAILURE,
        error: e.message,
      });
    }
  }
export function* sendMessageSaga(action) {
    try {
      const response = yield call(sendMessageCall, action.data);
      yield put({
        type: sendMessagesConstants.SEND_MESSAGE_SUCCESS,
        data: response.data,
        status: response.status,
        error: response.error,
      });
    } catch (e) {
      yield put({
        type: sendMessagesConstants.SEND_MESSAGE_FAILURE,
        error: e.message,
      });
    }
  }
export function* getMessageSaga(action) {
    try {
      const response = yield call(getMessageCall, action.data);
      yield put({
        type: getMessagesConstants.GET_MESSAGE_SUCCESS,
        data: response.data,
        status: response.status,
        error: response.error,
      });
    } catch (e) {
      yield put({
        type: getMessagesConstants.GET_USER_DETAILS_FAILURE,
        error: e.message,
      });
    }
  }