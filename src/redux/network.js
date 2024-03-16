import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import { REACT_TOKEN_AUTH, REACT_USER_ID } from "../tokenProvider";

let API_BASE_URL = `http://localhost:3001/`;

const headers = {
  "x-app-name": "gupChup",
  "x-device-id": "deviceid1",
  "x-platform-id": "web",
  "x-correlation-id": uuidv4(),
  "x-app-version": "1.0",
  "x-test-otp": 12345,
  // Add Authorization header if REACT_TOKEN_AUTH is available
  ...(REACT_TOKEN_AUTH && { Authorization: REACT_TOKEN_AUTH }),
};

// If REACT_USER_ID is available, add it to the headers
if (REACT_USER_ID) {
  headers["x-user-id"] = REACT_USER_ID;
}

export async function verifyOtpCall(data) {
  return await axios
    .post(`${API_BASE_URL}api/verify-otp`, data, {
      headers:headers,
    })
    .then((res) => {
      return {
        headers: res.headers,
        data: res.data,
      };
    });
}
export async function getUserDetailsCall(data) {
  return await axios
    .get(`${API_BASE_URL}api/get-user/${data}`, data, {
      headers:headers,
    })
    .then((res) => {
      return {
        headers: res.headers,
        data: res.data,
      };
    });
}
export async function updatetUserDetailsCall(data) {
  return await axios
    .put(`${API_BASE_URL}api/update-user/${data?.user_id}`, data, {
      headers:headers,
    })
    .then((res) => {
      return {
        headers: res.headers,
        data: res.data,
      };
    });
}
export async function getUserListCall(data) {
  return await axios
    .get(`${API_BASE_URL}api/update-user/${data?.user_id}`, data, {
      headers:headers,
    })
    .then((res) => {
      return {
        headers: res.headers,
        data: res.data,
      };
    });
}
export async function sendMessageCall(data) {
  return await axios
    .post(`${API_BASE_URL}api/send-messages/${data?.user_id}`, data, {
      headers:headers,
    })
    .then((res) => {
      return {
        headers: res.headers,
        data: res.data,
      };
    });
}
export async function getMessageCall(data) {
  return await axios
    .get(`${API_BASE_URL}api/get-messages/${data?.user_id}`, data, {
      headers:headers,
    })
    .then((res) => {
      return {
        headers: res.headers,
        data: res.data,
      };
    });
}
