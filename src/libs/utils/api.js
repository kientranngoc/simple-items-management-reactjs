import axios from "axios";

export const get = (endpoint, headers, params) => {
  return axios.get(endpoint, {
    params,
    headers,
    baseURL: process.env.REACT_APP_BASE_URL,
  });
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

export const deleteAPI = (endpoint, headers) => {
  return axios.delete(endpoint, {
    baseURL: process.env.REACT_APP_BASE_URL,
    headers,
  });
};
