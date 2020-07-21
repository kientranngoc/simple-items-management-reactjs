import {
  SIGNIN as SIGNIN_ACTION,
  SIGNUP as SIGNUP_ACTION,
  LOGOUT as LOGOUT_ACTION,
  GET_CURRENT_USER as GET_CURRENT_USER_ACTION,
} from '../constants/actions';
import {
  SIGNIN as SIGNIN_ENDPOINT,
  SINGUP as SIGNUP_ENDPOINT,
  GET_CURRENT_USER as GET_CURRENT_USER_ENDPOINT,
} from '../constants/endpoints';
import { post, get } from '../libs/utils/api';

const baseHeaders = { 'content-type': 'application/json' };

export const signup = (payload) => ({
  type: SIGNUP_ACTION,
  promise: post(SIGNUP_ENDPOINT, baseHeaders, payload),
});

export const signin = (payload) => ({
  type: SIGNIN_ACTION,
  promise: post(SIGNIN_ENDPOINT, baseHeaders, payload),
});

export const logout = () => ({
  type: LOGOUT_ACTION,
});

export const getCurrentUser = (accessToken) => {
  const headers = {
    ...baseHeaders,
    authorization: `Bearer ${accessToken}`,
  };
  return {
    type: GET_CURRENT_USER_ACTION,
    promise: get(GET_CURRENT_USER_ENDPOINT, headers),
  };
};
