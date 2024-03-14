import { verfiyOtpConstant } from "../constant";

export function verifyOtpAction(data) {
    return { type: verfiyOtpConstant.VERIFY_OTP_REQUEST, data };
  }