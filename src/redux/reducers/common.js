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

export const uploadImageReducer = (state = {}, action) => {
  switch (action.type) {
    case commonConstants.UPLOAD_IMAGE_REQUEST:
      return {
        ...state,
        request: action.data,
        loading: true,
      };
    case commonConstants.UPLOAD_IMAGE_REQUEST_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.data,
        status: action.status,
        error: action.error,
      };
    case commonConstants.UPLOAD_IMAGE_REQUEST_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    default:
      return state;
  }
};

export const uploadImageFileReducer = (state = {}, action) => {
  switch (action.type) {
    case commonConstants.UPLOAD_IMAGE_FILE_REQUEST:
      return {
        ...state,
        request: action.data,
        loading: true,
      };
    case commonConstants.UPLOAD_IMAGE_FILE_REQUEST_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.data,
        status: action.status,
        uploaded: true,
        error: action.error,
      };
    case commonConstants.UPLOAD_IMAGE_FILE_REQUEST_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    default:
      return state;
  }
};

export const postFeedbackReducer = (state = {}, action) => {
  switch (action.type) {
    case postFeedbackConstants.POST_FEEDBACK_REQUEST:
      return {
        ...state,
        request: action.data,
        loading: true,
      };
    case postFeedbackConstants.POST_FEEDBACK_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.data,
        status: action.status,
        error: action.error,
        headers: action.headers,
      };
    case postFeedbackConstants.POST_FEEDBACK_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error,
        status: action.status,
        headers: action.headers,
      };
    default:
      return state;
  }
};
export const enquiryReducer = (state = {}, action) => {
  switch (action.type) {
    case enquiryConstants.ENQUIRY_REQUEST:
      return {
        ...state,
        request: action.data,
        loading: true,
      };
    case enquiryConstants.ENQUIRY_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.data,
        status: action.status,
        error: action.error,
      };
    case enquiryConstants.ENQUIRY_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    default:
      return state;
  }
};
export const getEnquiryReducer = (state = {}, action) => {
  switch (action.type) {
    case getEnquiryConstants.GET_ENQUIRY_REQUEST:
      return {
        ...state,
        request: action.data,
        loading: true,
      };
    case getEnquiryConstants.GET_ENQUIRY_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.data,
        status: action.status,
        error: action.error,
      };
    case getEnquiryConstants.GET_ENQUIRY_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    default:
      return state;
  }
};
export const updateEnquiryReducer = (state = {}, action) => {
  switch (action.type) {
    case updateEnquiryConstants.UPDATE_ENQUIRY_REQUEST:
      return {
        ...state,
        request: action.data,
        loading: true,
      };
    case updateEnquiryConstants.UPDATE_ENQUIRY_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.data,
        status: action.status,
        error: action.error,
      };
    case updateEnquiryConstants.UPDATE_ENQUIRY_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    default:
      return state;
  }
};