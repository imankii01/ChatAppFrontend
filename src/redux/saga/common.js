import { call, put } from "redux-saga/effects";
import { getUserDetailsConstant, updateUserDetailsConstant, verfiyOtpConstant } from "../constant";
import { getUserDetailsCall, updatetUserDetailsCall, verifyOtpCall } from "../network";
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