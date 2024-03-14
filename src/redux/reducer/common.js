import { verfiyOtpConstant } from "../constant";

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