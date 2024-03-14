import { takeLatest, all } from "redux-saga/effects";
import { verfiyOtpConstant } from "../constant";
import { verifyOtpSaga } from "./common";

function* actionWatcher() {
  yield takeLatest(verfiyOtpConstant.VERIFY_OTP_REQUEST, verifyOtpSaga);

}
export default function* rootSaga() {
  yield all([actionWatcher()]);
}
