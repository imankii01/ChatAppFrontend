export const reactUserId  = () => {
    return localStorage.getItem("REACT_USER_ID");
  };
  export const getAccessToken = () => {
    return localStorage.getItem('REACT_TOKEN_AUTH');
  };
  export const reactUserEmailId = () => {
    return localStorage.getItem('REACT_USER_EMAIL_ID');
  };
  export const reactUserType = () => {
    return localStorage.getItem('REACT_USER_TYPE');
  };
export const logged = () => {
const token = getAccessToken();
  return token ? true : false;
};


