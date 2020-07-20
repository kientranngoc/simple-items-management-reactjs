import {
  FETCH_ITEMS as FETCH_ITEMS_ACTION,
  ADD_ITEM as ADD_ITEM_ACTION,
  UPDATE_ITEM as UPDATE_ITEM_ACTION,
} from "../constants/actions";
import { FETCH_CATEGORIES as CATEGORIES_ENDPOINT } from "../constants/endpoints";
import { get, post, put } from "../libs/utils/api";

const baseHeaders = { "content-type": "application/json" };

export const fetchItems = (categoryId, params) => {
  return {
    type: FETCH_ITEMS_ACTION,
    promise: get(
      CATEGORIES_ENDPOINT + `/${categoryId}/items`,
      baseHeaders,
      params
    ),
  };
};

export const addItem = (accessToken, categoryId, payload) => {
  const headers = { ...baseHeaders, authorization: `Bearer ${accessToken}` };
  return {
    type: ADD_ITEM_ACTION,
    promise: post(
      CATEGORIES_ENDPOINT + `/${categoryId}/items`,
      headers,
      payload
    ),
  };
};

export const updateItem = (accessToken, categoryId, itemId, payload) => {
  const headers = { ...baseHeaders, authorization: `Bearer ${accessToken}` };
  return {
    type: UPDATE_ITEM_ACTION,
    promise: put(
      CATEGORIES_ENDPOINT + `/${categoryId}/items/${itemId}`,
      headers,
      payload
    ),
  };
};
