export const REACT_TOKEN_AUTH = localStorage.getItem("token");
export const REACT_USER_ID = localStorage.getItem("user_id");
export const logged = REACT_TOKEN_AUTH ? true : false;
