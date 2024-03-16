import { getMessagesConstants, getUserDetailsConstant, getUserListConstants, sendMessagesConstants, updateUserDetailsConstant, verfiyOtpConstant } from "../constant";

export const verifyOtpReducer = (state = {}, action) => {
    switch (action.type) {
      case verfiyOtpConstant.VERIFY_OTP_REQUEST:
        return {
          ...state,
          request: action.data,
          loading: true,
        };
      case verfiyOtpConstant.VERIFY_OTP_SUCCESS:
        return {
          ...state,
          loading: false,
          data: action.data,
          status: action.status,
          error: action.error,
        };
      case verfiyOtpConstant.VERIFY_OTP_FAILURE:
        return {
          ...state,
          loading: false,
          error: action.error,
        };
      default:
        return state;
    }
  };
export const getUserDetailsReducer = (state = {}, action) => {
    switch (action.type) {
      case getUserDetailsConstant.GET_USER_DETAILS_REQUEST:
        return {
          ...state,
          request: action.data,
          loading: true,
        };
      case getUserDetailsConstant.GET_USER_DETAILS_SUCCESS:
        return {
          ...state,
          loading: false,
          data: action.data,
          status: action.status,
          error: action.error,
        };
      case getUserDetailsConstant.GET_USER_DETAILS_FAILURE:
        return {
          ...state,
          loading: false,
          error: action.error,
        };
      default:
        return state;
    }
  };
export const updateUserDetailsReducer = (state = {}, action) => {
    switch (action.type) {
      case updateUserDetailsConstant.UPDATE_USER_DETAILS_REQUEST:
        return {
          ...state,
          request: action.data,
          loading: true,
        };
      case updateUserDetailsConstant.UPDATE_USER_DETAILS_SUCCESS:
        return {
          ...state,
          loading: false,
          data: action.data,
          status: action.status,
          error: action.error,
        };
      case updateUserDetailsConstant.UPDATE_USER_DETAILS_FAILURE:
        return {
          ...state,
          loading: false,
          error: action.error,
        };
      default:
        return state;
    }
  };
export const getUserListReducer = (state = {}, action) => {
    switch (action.type) {
      case getUserListConstants.GET_USER_LIST_REQUEST:
        return {
          ...state,
          request: action.data,
          loading: true,
        };
      case getUserListConstants.GET_USER_LIST_SUCCESS:
        return {
          ...state,
          loading: false,
          data: action.data,
          status: action.status,
          error: action.error,
        };
      case getUserListConstants.GET_USER_LIST_FAILURE:
        return {
          ...state,
          loading: false,
          error: action.error,
        };
      default:
        return state;
    }
  };
export const sendMessageReducer = (state = {}, action) => {
    switch (action.type) {
      case sendMessagesConstants.SEND_MESSAGE_REQUEST:
        return {
          ...state,
          request: action.data,
          loading: true,
        };
      case sendMessagesConstants.SEND_MESSAGE_SUCCESS:
        return {
          ...state,
          loading: false,
          data: action.data,
          status: action.status,
          error: action.error,
        };
      case sendMessagesConstants.SEND_MESSAGE_FAILURE:
        return {
          ...state,
          loading: false,
          error: action.error,
        };
      default:
        return state;
    }
  };
export const getMessagesReducer = (state = {}, action) => {
    switch (action.type) {
      case getMessagesConstants.GET_MESSAGE_REQUEST:
        return {
          ...state,
          request: action.data,
          loading: true,
        };
      case getMessagesConstants.GET_MESSAGE_SUCCESS:
        return {
          ...state,
          loading: false,
          data: action.data,
          status: action.status,
          error: action.error,
        };
      case getMessagesConstants.GET_MESSAGE_FAILURE:
        return {
          ...state,
          loading: false,
          error: action.error,
        };
      default:
        return state;
    }
  };