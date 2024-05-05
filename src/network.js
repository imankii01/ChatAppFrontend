import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import { getAccessToken } from "./Components/Auth/tokenProvider";

let API_BASE_URL = `${process.env.REACT_APP_BASE_URL}`;
let API_LOCAL_URL = `${process.env.REACT_APP_BASE_URL_2}`;
const headers2 = {
  "x-app-name": "mentorpal",
  "x-device-id": "deviceid1",
  "x-platform-id": "web",
  "x-correlation-id": uuidv4(),
  "x-app-version": "1.0",
  "x-test-otp": 12345,
};

const api = axios.create({
  baseURL: API_LOCAL_URL,
  headers: {
    "x-app-name": "mentorpal",
    "x-device-id": "deviceid1",
    "x-platform-id": "web",
    "x-correlation-id": uuidv4(),
    "x-app-version": "1.0",
    "x-test-otp": 12345,
  },
});
api.interceptors.request.use((config) => {
  const token = getAccessToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
export async function uploadImageReq(data) {
  return await api
    .post(`${API_BASE_URL}platform-service/create/presigned/url/`, data)
    .then((res) => {
      return {
        data: res.data,
        status: res.status,
        headers: res.headers,
        message: res.message,
      };
    });
}

export async function uploadImageFileReq(data) {
  return await axios
    .put(data.url, data.fileData, {
      headers: headers2,
    })
    .then((res) => {
      return {
        data: res.data,
        status: res.status,
        headers: res.headers,
        message: res.message,
      };
    });
}
export async function resumeParserCall(data) {
  return await api
    .post(`${API_BASE_URL}third-party/v1/resume-parser`, data)
    .then((res) => {
      return {
        data: res.data,
        status: res.status,
        headers: res.headers,
        message: res.message,
      };
    });
}
export async function loginUserCall(data) {
  return await api.post(`${API_LOCAL_URL}auth/login`, data).then((res) => {
    localStorage.setItem("REACT_TOKEN_AUTH", res.data?.token);
    localStorage.setItem("REACT_USER_ID", res.data?.user_id);
    localStorage.setItem("REACT_USER_EMAIL_ID", res.data?.email);
    localStorage.setItem("REACT_USER_TYPE", res.data?.user_type);
    return {
      data: res.data,
      status: res.status,
      headers: res.headers,
      message: res.message,
    };
  });
}
export async function singupUserCall(data) {
  return await api.post(`${API_LOCAL_URL}auth/signup`, data).then((res) => {
    localStorage.setItem("REACT_TOKEN_AUTH", res.data?.token);
    localStorage.setItem("REACT_USER_ID", res.data?.user_id);
    localStorage.setItem("REACT_USER_EMAIL_ID", res.data?.email);
    localStorage.setItem("REACT_USER_TYPE", res.data?.user_type);
    return {
      data: res.data,
      status: res.status,
      headers: res.headers,
      message: res.message,
    };
  });
}

export async function getUserDetailCall(data) {
  return await api
    .get(`${API_LOCAL_URL}auth/get-user-details?user_id=${data?.user_id}`)
    .then((res) => {
      localStorage.setItem("REACT_USER_TYPE", res.data?.user_type);
      return {
        data: res.data,
        status: res.status,
        headers: res.headers,
        message: res.message,
      };
    });
}
export async function updateUserDetailCall(data) {
  return await api
    .put(
      `${API_LOCAL_URL}auth/update-user-details?user_id=${data?.user_id}`,
      data
    )
    .then((res) => {
      return {
        data: res.data,
        status: res.status,
        headers: res.headers,
        message: res.message,
      };
    });
}
export async function postFeedbackCall(data) {
  return await api.post(`${API_LOCAL_URL}public/feedback`, data).then((res) => {
    return {
      data: res.data,
      status: res.status,
      headers: res.headers,
      message: res.message,
    };
  });
}
export async function updatePasswordCall(data) {
  return await api
    .put(`${API_LOCAL_URL}auth/update-password`, data)
    .then((res) => {
      return {
        data: res.data,
        status: res.status,
        headers: res.headers,
        message: res.message,
      };
    });
}
export async function forgetPasswordLinkCall(data) {
  return await api
    .post(`${API_LOCAL_URL}auth/forget-password-link`, data)
    .then((res) => {
      return {
        data: res.data,
        status: res.status,
        headers: res.headers,
        message: res.message,
      };
    });
}
export async function enquiryCall(data) {
  return await api.post(`${API_LOCAL_URL}public/enquiry`, data).then((res) => {
    return {
      data: res.data,
      status: res.status,
      headers: res.headers,
      message: res.message,
    };
  });
}
export async function getEnquiryCall(data) {
  return await api
    .get(`${API_LOCAL_URL}public/enquiry-list?status=${data?.status}`, data)
    .then((res) => {
      return {
        data: res.data,
        status: res.status,
        headers: res.headers,
        message: res.message,
      };
    });
}
export async function getAllUserCall(data) {
  return await api
    .get(`${API_LOCAL_URL}auth/get-all-user`, data)
    .then((res) => {
      return {
        data: res.data,
        status: res.status,
        headers: res.headers,
        message: res.message,
      };
    });
}
export async function updateEnquiryCall(data) {
  return await api
    .put(
      `${API_LOCAL_URL}public/enquiry-update?enquiry_id=${data?.enquiry_id}`,
      data
    )
    .then((res) => {
      return {
        data: res.data,
        status: res.status,
        headers: res.headers,
        message: res.message,
      };
    });
}
export async function sendMessageCall(data) {
  return await api
    .post(
      `${API_LOCAL_URL}message/send-message`,
      data
    )
    .then((res) => {
      return {
        data: res.data,
        status: res.status,
        headers: res.headers,
        message: res.message,
      };
    });
}
export async function getMessageCall(data) {
  return await api
    .get(
      `${API_LOCAL_URL}message/get-message?sender_id=${data?.sender_id}`,
      data
    )
    .then((res) => {
      return {
        data: res.data,
        status: res.status,
        headers: res.headers,
        message: res.message,
      };
    });
}
