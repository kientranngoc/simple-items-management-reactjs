import { getData, storeData, removeData } from "./dataSource";

const TOKEN = "access_token";
const CURRENT_USER = "current_user";

export const isLoggedIn = () => {
  const token = getToken();
  if (token) return true;
  return false;
};

export const getToken = () => {
  return getData(TOKEN);
};

export const setToken = (token) => {
  storeData(TOKEN, token);
};

export const getCurrentUser = () => {
  return getData(CURRENT_USER);
};

export const storeCurrentUser = (user) => {
  storeData(CURRENT_USER, user);
};

export const removeAuth = () => {
  removeData(TOKEN);
  removeData(CURRENT_USER);
};
