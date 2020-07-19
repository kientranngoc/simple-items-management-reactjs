import {
  SIGNIN_SUCCESS,
  SIGNUP_SUCCESS,
  LOGOUT,
  GET_CURRENT_USER_SUCCESS,
} from "../constants/actions";
import { isLoggedIn, getToken, getCurrentUser } from "../libs/utils/auth";

const INITIAL_STATE = {
  isLoggedIn: isLoggedIn(),
  accessToken: getToken(),
  info: getCurrentUser(),
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case LOGOUT: {
      return { ...INITIAL_STATE, isLoggedIn: false };
    }

    case SIGNIN_SUCCESS: {
      return {
        ...state,
        accessToken: action.payload.data.access_token,
        isLoggedIn: true,
      };
    }

    case SIGNUP_SUCCESS: {
      return {
        ...state,
        accessToken: action.payload.data.access_token,
        isLoggedIn: true,
      };
    }

    case GET_CURRENT_USER_SUCCESS: {
      return {
        ...state,
        info: action.payload.data,
      };
    }

    default:
      break;
  }
  return state;
};
