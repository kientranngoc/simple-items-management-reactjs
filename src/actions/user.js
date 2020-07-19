import {
  SIGNIN as SIGNIN_ACTION,
  SIGNUP as SIGNUP_ACTION,
} from "../constants/actions";
import {
  SIGNIN as SIGNIN_ENDPOINT,
  SINGUP as SIGNUP_ENDPOINT,
} from "../constants/endpoints";
import { post } from "../libs/utils/api";

const baseHeaders = { "content-type": "application/json" };

export const signup = (payload) => ({
  type: SIGNUP_ACTION,
  promise: post(SIGNUP_ENDPOINT, baseHeaders, payload),
});

export const signin = (payload) => ({
  type: SIGNIN_ACTION,
  promise: post(SIGNIN_ENDPOINT, baseHeaders, payload),
});
