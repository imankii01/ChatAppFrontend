import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import { REACT_TOKEN_AUTH, REACT_USER_ID } from "../tokenProvider";

let API_BASE_URL = `http://localhost:3001/`;

const headers = {
  "x-app-name": "chatApp",
  "x-device-id": "deviceid1",
  "x-platform-id": "web",
  "x-correlation-id": uuidv4(),
  "x-app-version": "1.0",
  "x-test-otp": 12345,
};

if (REACT_TOKEN_AUTH && REACT_USER_ID) {
  headers["Authorization"] = "Bearer " + REACT_TOKEN_AUTH;
  headers["x-user-id"] = REACT_USER_ID;
}

export async function verifyOtpCall(data) {
  return await axios
    .post(`${API_BASE_URL}api/verify-otp`, data, {
      headers,
    })
    .then((res) => {
      return {
        headers: res.headers,
        data: res.data,
      };
    });
}
