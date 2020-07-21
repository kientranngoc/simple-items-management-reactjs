import axios from 'axios';

export const get = (endpoint, headers, params) => axios.get(endpoint, {
  params,
  headers,
  baseURL: process.env.REACT_APP_BASE_URL,
});

export const post = (endpoint, headers, data) => axios.post(endpoint, data, {
  baseURL: process.env.REACT_APP_BASE_URL,
  headers,
});

export const put = (endpoint, headers, data) => axios.put(endpoint, data, {
  baseURL: process.env.REACT_APP_BASE_URL,
  headers,
});

export const deleteAPI = (endpoint, headers) => axios.delete(endpoint, {
  baseURL: process.env.REACT_APP_BASE_URL,
  headers,
});
