export const BASE_URL =
  process.env.NODE_ENV === "production"
    ? process.env.REACT_APP_PRODUCT_SERVER
    : process.env.REACT_APP_DEV_SERVER;

export const TOKEN_NAME = "access_token";

export const setLocalStorage = ({ name, value }) => {
  localStorage.setItem(name, value);
};

export const getLocalStorage = ({ name }) => {
  return localStorage.getItem(name);
};

export const deleteLocalStorage = ({ name }) => {
  return localStorage.removeItem(name);
};
