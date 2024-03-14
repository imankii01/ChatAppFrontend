import { call, put } from "redux-saga/effects";
import { verfiyOtpConstant } from "../constant";
import { verifyOtpCall } from "../network";

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