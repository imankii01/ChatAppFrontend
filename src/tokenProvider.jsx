export const REACT_TOKEN_AUTH = localStorage.getItem("token");
export const REACT_USER_ID = localStorage.getItem("user_id");
export const REACT_EMAIL_ID = localStorage.getItem("email");
export const logged = REACT_TOKEN_AUTH ? true : false;
console.log(REACT_USER_ID)
console.log(REACT_TOKEN_AUTH)
console.log(REACT_EMAIL_ID)