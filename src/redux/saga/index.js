import { takeLatest, all } from "redux-saga/effects";
import { getUserDetailsConstant, updateUserDetailsConstant, verfiyOtpConstant } from "../constant";
import { getUserDetailsSaga, updateUserDetailsSaga, verifyOtpSaga } from "./common";

function* actionWatcher() {
  yield takeLatest(verfiyOtpConstant.VERIFY_OTP_REQUEST, verifyOtpSaga);
  yield takeLatest(getUserDetailsConstant.GET_USER_DETAILS_REQUEST, getUserDetailsSaga);
  yield takeLatest(updateUserDetailsConstant.UPDATE_USER_DETAILS_REQUEST, updateUserDetailsSaga);

}
export default function* rootSaga() {
  yield all([actionWatcher()]);
}
