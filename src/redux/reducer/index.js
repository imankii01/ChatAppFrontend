import { combineReducers } from "redux";

import {
    verifyOtpReducer,
    getUserDetailsReducer,
    updateUserDetailsReducer,
    getMessagesReducer,
    getUserListReducer,
    sendMessageReducer,
  } from "./common";
  

const allReducers = combineReducers({
    verifyOtpReducer,
    getUserDetailsReducer,
    updateUserDetailsReducer,
    getUserListReducer,
    sendMessageReducer,
    getMessagesReducer,
});

const rootReducer = (state, action) => {
  if (action.type === "LOGOUT_REQUEST") {
    state = undefined;
  }

  return allReducers(state, action);
};

export default rootReducer;
