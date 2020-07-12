import { SIGNIN as SIGNIN_ACTION } from "../constants/actions";
import { SIGNIN as SIGNIN_ENDPOINT } from "../constants/endpoints";
import { post } from "../libs/utils/api";

export const signup = () => ({
  type: SIGNIN_ACTION,
  promise: post(SIGNIN_ENDPOINT),
});
