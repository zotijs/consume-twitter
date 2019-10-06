import _ from "lodash";
import {
  FETCH_TWITS,
  FETCH_TWITS_FULFILLED,
  FETCH_TWITS_REJECTED
} from "../actions/types";

export const fetchTwitsReducer = (state = {}, action) => {
  if (action.type === FETCH_TWITS) return state;
  if (action.type === FETCH_TWITS_FULFILLED)
    return { ...state, ..._.mapKeys(action.payload.response.data, "id") };

  return state;
};

export const fetchTwitsErrorReducer = (state = null, action) => {
  if (action.type === FETCH_TWITS) return null;
  if (action.type === FETCH_TWITS_FULFILLED) return null;
  if (action.type === FETCH_TWITS_REJECTED) return state;

  return state;
};
