import { call, put } from "redux-saga/effects";
import {
  commonConstants,
  postFeedbackConstants,
  enquiryConstants,
  getEnquiryConstants,
  updateEnquiryConstants,
  getMessageConstants,
  sendMessageConstants,
} from "../../constants";
import {
  postFeedbackCall,
  uploadImageFileReq,
  uploadImageReq,
  enquiryCall,
  getEnquiryCall,
  updateEnquiryCall,
} from "../../network";

export function* uploadImgaeSaga(action) {
  try {
    const response = yield call(uploadImageReq, action.data);
    yield put({
      type: commonConstants.UPLOAD_IMAGE_REQUEST_SUCCESS,
      data: response.data,
      status: response.status,
      error: response.error,
    });
  } catch (e) {
    yield put({
      type: commonConstants.UPLOAD_IMAGE_REQUEST_FAILURE,
      error: e.message,
    });
  }
}

export function* uploadImgaeFileSaga(action) {
  try {
    const response = yield call(uploadImageFileReq, action.data);
    yield put({
      type: commonConstants.UPLOAD_IMAGE_FILE_REQUEST_SUCCESS,
      data: response.data,
      status: response.status,
      error: response.error,
    });
  } catch (e) {
    yield put({
      type: commonConstants.UPLOAD_IMAGE_FILE_REQUEST_FAILURE,
      error: e.message,
    });
  }
}
export function* postFeedbackSaga(action) {
  try {
    const response = yield call(postFeedbackCall, action.data);
    yield put({
      type: postFeedbackConstants.POST_FEEDBACK_SUCCESS,
      data: response.data,
      status: response.status,
      error: response.error,
    });
  } catch (e) {
    yield put({
      type: postFeedbackConstants.POST_FEEDBACK_FAILURE,
      error: e.message,
      status: e.status,
      headers: e?.response?.data,
    });
  }
}

export function* enquirySaga(action) {
  try {
    const response = yield call(enquiryCall, action.data);
    yield put({
      type: enquiryConstants.ENQUIRY_SUCCESS,
      data: response.data,
      status: response.status,
      error: response.error,
    });
  } catch (e) {
    yield put({
      type: enquiryConstants.ENQUIRY_FAILURE,
      error: e.message,
    });
  }
}
export function* getEnquirySaga(action) {
  try {
    const response = yield call(getEnquiryCall, action.data);
    yield put({
      type: getEnquiryConstants.GET_ENQUIRY_SUCCESS,
      data: response.data,
      status: response.status,
      error: response.error,
    });
  } catch (e) {
    yield put({
      type: getEnquiryConstants.GET_ENQUIRY_FAILURE,
      error: e.message,
    });
  }
}
export function* updateEnquirySaga(action) {
  try {
    const response = yield call(updateEnquiryCall, action.data);
    yield put({
      type: updateEnquiryConstants.UPDATE_ENQUIRY_SUCCESS,
      data: response.data,
      status: response.status,
      error: response.error,
    });
  } catch (e) {
    yield put({
      type: updateEnquiryConstants.UPDATE_ENQUIRY_FAILURE,
      error: e.message,
    });
  }
}
export function* getMessageSaga(action) {
  try {
    const response = yield call(updateEnquiryCall, action.data);
    yield put({
      type: getMessageConstants.GET_MESSAGE_SUCCESS,
      data: response.data,
      status: response.status,
      error: response.error,
    });
  } catch (e) {
    yield put({
      type: getMessageConstants.GET_MESSAGE_FAILURE,
      error: e.message,
    });
  }
}
export function* sendMessageSaga(action) {
  try {
    const response = yield call(updateEnquiryCall, action.data);
    yield put({
      type: sendMessageConstants.SEND_MESSAGE_SUCCESS,
      data: response.data,
      status: response.status,
      error: response.error,
    });
  } catch (e) {
    yield put({
      type: sendMessageConstants.SEND_MESSAGE_FAILURE,
      error: e.message,
    });
  }
}
