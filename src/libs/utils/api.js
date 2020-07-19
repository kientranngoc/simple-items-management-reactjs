import axios from "axios";

export const get = (endpoint, headers, params) => {
  const api = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL,
    headers,
    params,
  });
  return api.get(endpoint);
};

export const post = (endpoint, headers, data) => {
  return axios.post(endpoint, data, {
    baseURL: process.env.REACT_APP_BASE_URL,
    headers,
  });
};

export const put = (endpoint, headers, data) => {
  return axios.put(endpoint, data, {
    baseURL: process.env.REACT_APP_BASE_URL,
    headers,
  });
};
