import {
  forgetPasswordLinkConstants,
  getAllUserConstants,
  getuserDetailsConstants,
  loginUserConstants,
  signupUserConstants,
  updatePasswordConstants,
  updateUserDetailsConstants,
} from "../../constants";

export const signupUserReducer = (state = {}, action) => {
  switch (action.type) {
    case signupUserConstants.SIGNUP_USER_REQUEST:
      return {
        ...state,
        request: action.data,
        loading: true,
      };
    case signupUserConstants.SIGNUP_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.data,
        status: action.status,
        message: action.message,
        error: action.error,
      };
    case signupUserConstants.SIGNUP_USER_FAILURE:
      return {
        ...state,
        loading: false,
        data: action.data,
        error: action.error,
        message: action.message,
        headers: action.headers,
      };
    default:
      return state;
  }
};
export const loginUserReducer = (state = {}, action) => {
  switch (action.type) {
    case loginUserConstants.LOGIN_USER_REQUEST:
      return {
        ...state,
        request: action.data,
        loading: true,
      };
    case loginUserConstants.LOGIN_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.data,
        status: action.status,
        message: action.message,
        error: action.error,
      };
    case loginUserConstants.LOGIN_USER_FAILURE:
      return {
        ...state,
        loading: false,
        data: action.data,
        error: action.error,
        message: action.message,
        headers: action.headers,
      };
    default:
      return state;
  }
};
export const getUserDetailReducer = (state = {}, action) => {
  switch (action.type) {
    case getuserDetailsConstants.GET_USER_DETAILS_REQUEST:
      return {
        ...state,
        request: action.data,
        loading: true,
      };
    case getuserDetailsConstants.GET_USER_DETAILS_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.data,
        status: action.status,
        error: action.error,
      };
    case getuserDetailsConstants.GET_USER_DETAILS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    default:
      return state;
  }
};
export const updateUserDetailReducer = (state = {}, action) => {
  switch (action.type) {
    case updateUserDetailsConstants.UPDATE_USER_DETAILS_REQUEST:
      return {
        ...state,
        request: action.data,
        loading: true,
      };
    case updateUserDetailsConstants.UPDATE_USER_DETAILS_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.data,
        status: action.status,
        error: action.error,
      };
    case updateUserDetailsConstants.UPDATE_USER_DETAILS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    default:
      return state;
  }
};
export const forgetPasswordLinkReducer = (state = {}, action) => {
  switch (action.type) {
    case forgetPasswordLinkConstants.FORGET_PASSWORD_LINK_REQUEST:
      return {
        ...state,
        request: action.data,
        loading: true,
      };
    case forgetPasswordLinkConstants.FORGET_PASSWORD_LINK_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.data,
        status: action.status,
        error: action.error,
      };
    case forgetPasswordLinkConstants.FORGET_PASSWORD_LINK_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    default:
      return state;
  }
};
export const updatePasswordReducer = (state = {}, action) => {
  switch (action.type) {
    case updatePasswordConstants.UPDATE_PASSWORD_REQUEST:
      return {
        ...state,
        request: action.data,
        loading: true,
      };
    case updatePasswordConstants.UPDATE_PASSWORD_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.data,
        status: action.status,
        error: action.error,
      };
    case updatePasswordConstants.UPDATE_PASSWORD_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    default:
      return state;
  }
};
export const getAllUserReducer = (state = {}, action) => {
  switch (action.type) {
    case getAllUserConstants.GET_USER_REQUEST:
      return {
        ...state,
        request: action.data,
        loading: true,
      };
    case getAllUserConstants.GET_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.data,
        status: action.status,
        error: action.error,
      };
    case getAllUserConstants.GET_USER_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    default:
      return state;
  }
};
