import { FETCH_CATEGORIES as FETCH_CATEGORIES_ACTION } from "../constants/actions";
import { FETCH_CATEGORIES as FETCH_CATEGORIES_ENDPOINT } from "../constants/endpoints";
import { get } from "../libs/utils/api";

const baseHeaders = { "content-type": "application/json" };

export const fetchCategories = (params) => {
  return {
    type: FETCH_CATEGORIES_ACTION,
    promise: get(FETCH_CATEGORIES_ENDPOINT, baseHeaders, params),
  };
};
