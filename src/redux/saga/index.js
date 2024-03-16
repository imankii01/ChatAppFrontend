import { takeLatest, all } from "redux-saga/effects";
import { getMessagesConstants, getUserDetailsConstant, getUserListConstants, sendMessagesConstants, updateUserDetailsConstant, verfiyOtpConstant } from "../constant";
import { getMessageSaga, getUserDetailsSaga, getUserListSaga, sendMessageSaga, updateUserDetailsSaga, verifyOtpSaga } from "./common";

function* actionWatcher() {
  yield takeLatest(verfiyOtpConstant.VERIFY_OTP_REQUEST, verifyOtpSaga);
  yield takeLatest(getUserDetailsConstant.GET_USER_DETAILS_REQUEST, getUserDetailsSaga);
  yield takeLatest(updateUserDetailsConstant.UPDATE_USER_DETAILS_REQUEST, updateUserDetailsSaga);
  yield takeLatest(getUserListConstants.GET_USER_LIST_REQUEST, getUserListSaga);
  yield takeLatest(sendMessagesConstants.SEND_MESSAGE_REQUEST, sendMessageSaga);
  yield takeLatest(getMessagesConstants.GET_MESSAGE_REQUEST, getMessageSaga);

}
export default function* rootSaga() {
  yield all([actionWatcher()]);
}
