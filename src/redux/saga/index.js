import { all, takeLatest } from "redux-saga/effects";
import {
  commonConstants,
  enquiryConstants,
  forgetPasswordLinkConstants,
  getEnquiryConstants,
  getMessageConstants,
  getuserDetailsConstants,
  loginUserConstants,
  postFeedbackConstants,
  sendMessageConstants,
  signupUserConstants,
  updateEnquiryConstants,
  updatePasswordConstants,
  updateUserDetailsConstants,
} from "../../constants";
import {
  enquirySaga,
  getEnquirySaga,
  getMessageSaga,
  postFeedbackSaga,
  sendMessageSaga,
  updateEnquirySaga,
  uploadImgaeFileSaga,
  uploadImgaeSaga,
} from "./common";
import {
  UpdateUserDetailsSaga,
  forgetPasswordLinkSaga,
  getUserDetailsSaga,
  loginUserSaga,
  singupUserSaga,
  updatePasswordSaga,
} from "./user";

function* actionWatcher() {
  yield takeLatest(commonConstants.UPLOAD_IMAGE_REQUEST, uploadImgaeSaga);
  yield takeLatest(
    commonConstants.UPLOAD_IMAGE_FILE_REQUEST,
    uploadImgaeFileSaga
  );

  yield takeLatest(loginUserConstants.LOGIN_USER_REQUEST, loginUserSaga);
  yield takeLatest(signupUserConstants.SIGNUP_USER_REQUEST, singupUserSaga);
  yield takeLatest(
    getuserDetailsConstants.GET_USER_DETAILS_REQUEST,
    getUserDetailsSaga
  );
  yield takeLatest(
    updateUserDetailsConstants.UPDATE_USER_DETAILS_REQUEST,
    UpdateUserDetailsSaga
  );
  yield takeLatest(
    postFeedbackConstants.POST_FEEDBACK_REQUEST,
    postFeedbackSaga
  );
  yield takeLatest(
    forgetPasswordLinkConstants.FORGET_PASSWORD_LINK_REQUEST,
    forgetPasswordLinkSaga
  );
  yield takeLatest(
    updatePasswordConstants.UPDATE_PASSWORD_REQUEST,
    updatePasswordSaga
  );
  yield takeLatest(enquiryConstants.ENQUIRY_REQUEST, enquirySaga);
  yield takeLatest(getEnquiryConstants.GET_ENQUIRY_REQUEST, getEnquirySaga);
  yield takeLatest(
    updateEnquiryConstants.UPDATE_ENQUIRY_REQUEST,
    updateEnquirySaga
  );
  yield takeLatest(
    updateEnquiryConstants.UPDATE_ENQUIRY_REQUEST,
    updateEnquirySaga
  );
  yield takeLatest(getMessageConstants.GET_MESSAGE_REQUEST, getMessageSaga);
  yield takeLatest(sendMessageConstants.SEND_MESSAGE_REQUEST, sendMessageSaga);
}
export default function* rootSaga() {
  yield all([actionWatcher()]);
}
