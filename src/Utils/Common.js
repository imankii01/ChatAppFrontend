
export const calculateRemainingTime = (targetDate) => {
  // Check if the targetDate is a valid date string
  if (!isNaN(new Date(targetDate))) {
    const difference = +new Date(targetDate) - +new Date();
    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);

    return {
      days,
      hours,
      minutes,
      seconds,
    };
  } else {
    return {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
    };
  }
};
export const validatePassword = (_, value) => {
  const passwordRegex =
    /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.*[^\s]).{8,}$/;
  if (!passwordRegex.test(value)) {
    return Promise.reject(
      "Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character"
    );
  } else {
    return Promise.resolve();
  }
};
export const validateEmail = (_, value) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(value)) {
    return Promise.reject("Please enter a valid email address");
  } else {
    return Promise.resolve();
  }
};

export function saveDataInLocalStorage(data) {
  const { email, token, user_id } = data;
  localStorage.setItem("REACT_USER_EMAIL_ID", email);
  localStorage.setItem("REACT_TOKEN_AUTH", token);
  localStorage.setItem("REACT_USER_ID", user_id);
}


export function saveTokenInSessionStorage(headers) {
  sessionStorage.setItem(
    "x-access-token",
    JSON.stringify(headers["x-access-token"])
  );
  sessionStorage.setItem(
    "x-refresh-token",
    JSON.stringify(headers["x-refresh-token"])
  );
}

