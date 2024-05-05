import { combineReducers } from "redux";
import {
  uploadImageReducer,
  uploadImageFileReducer,
  postFeedbackReducer,
  enquiryReducer,
  getEnquiryReducer,
  updateEnquiryReducer,
} from "./common.js";
import {
  loginUserReducer,
  signupUserReducer,
  getUserDetailReducer,
  updateUserDetailReducer,
  forgetPasswordLinkReducer,
  updatePasswordReducer,
} from "./user.js";
const allReducers = combineReducers({
  uploadImageReducer,
  uploadImageFileReducer,
  signupUserReducer,
  loginUserReducer,
  getUserDetailReducer,
  updateUserDetailReducer,
  postFeedbackReducer,
  forgetPasswordLinkReducer,
  updatePasswordReducer,
  enquiryReducer,
  getEnquiryReducer,
  updateEnquiryReducer,
});

const rootReducer = (state, action) => {
  if (action.type === "LOGOUT_REQUEST") {
    state = undefined;
  }

  return allReducers(state, action);
};

export default rootReducer;
