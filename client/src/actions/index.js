import {
  FETCH_TWITS,
  FETCH_TWITS_FULFILLED,
  FETCH_TWITS_REJECTED
} from "./types";

export const fetchTwits = payload => ({
  type: FETCH_TWITS,
  payload
});
export const fetchTwitsFulfilled = payload => ({
  type: FETCH_TWITS_FULFILLED,
  payload
});
export const fetchTwitsRejected = payload => ({
  type: FETCH_TWITS_REJECTED,
  payload,
  error: true
});
