import { actionCreator } from "libraries/model/";

const fetchTwits = actionCreator("FETCH_TWITS");
const fetchTwitsFulfilled = actionCreator("FETCH_TWITS_FULFILLED");
const fetchTwitsRejected = actionCreator("FETCH_TWITS_REJECTED");

export { fetchTwits, fetchTwitsFulfilled, fetchTwitsRejected };
