import {
  addCandidateConstants,
  addClientConstants,
  applyJobConstants,
  commonConstants,
  getAllCandidateActions,
  getClientDetailsConstants,
  getClientJobsConstants,
  getClientListConstants,
  getJobDetailConstants,
  logoutConstants,
  postFeedbackConstants,
  resumeParserConstants,
  updateClientDetailsConstants,
  updateJobApplicationConstants,
  updateJobConstants,
  getCandidateProfileConstants,
  createJobConstants,
  getJobConstants,
  getJobApplicationConstants,
  enquiryConstants,
  getEnquiryConstants,
  updateEnquiryConstants,
} from "../../constants";

export function logoutUser(data) {
  return { type: logoutConstants.LOGOUT_REQUEST, data };
}
export function uploadImageAction(data) {
  return { type: commonConstants.UPLOAD_IMAGE_REQUEST, data };
}

export function uploadImageFileAction(data) {
  return { type: commonConstants.UPLOAD_IMAGE_FILE_REQUEST, data };
}

export function postFeedbackAction(data) {
  return {
    type: postFeedbackConstants.POST_FEEDBACK_REQUEST,
    data,
  };
}
export function enquiryAction(data) {
  return { type: enquiryConstants.ENQUIRY_REQUEST, data };
}
export function getEnquiryAction(data) {
  return { type: getEnquiryConstants.GET_ENQUIRY_REQUEST, data };
}
export function updateEnquiryAction(data) {
  return { type: updateEnquiryConstants.UPDATE_ENQUIRY_REQUEST, data };
}
