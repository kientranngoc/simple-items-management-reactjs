import { FETCH_ITEMS as FETCH_ITEMS_ACTION } from "../constants/actions";
import { FETCH_CATEGORIES as FETCH_CATEGORIES_ENDPOINT } from "../constants/endpoints";
import { get } from "../libs/utils/api";

const baseHeaders = { "content-type": "application/json" };

export const fetchItems = (categoryId, params) => {
  return {
    type: FETCH_ITEMS_ACTION,
    promise: get(
      FETCH_CATEGORIES_ENDPOINT + `/${categoryId}/items`,
      baseHeaders,
      params
    ),
  };
};
