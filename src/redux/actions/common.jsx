import { getMessagesConstants, getUserDetailsConstant, sendMessagesConstants, updateUserDetailsConstant, verfiyOtpConstant } from "../constant";

export function verifyOtpAction(data) {
    return { type: verfiyOtpConstant.VERIFY_OTP_REQUEST, data };
  }
export function getUserDetailsAction(data) {
    return { type: getUserDetailsConstant.GET_USER_DETAILS_REQUEST, data };
  }
export function updateUserDetailsAction(data) {
    return { type: updateUserDetailsConstant.UPDATE_USER_DETAILS_REQUEST, data };
  }
export function getuserlistAction(data) {
    return { type: getUserDetailsConstant.GET_USER_DETAILS_REQUEST, data };
  }
export function sendMessageAction(data) {
    return { type: sendMessagesConstants.SEND_MESSAGE_REQUEST, data };
  }
export function getMessagesAction(data) {
    return { type: getMessagesConstants.GET_MESSAGE_REQUEST, data };
  }