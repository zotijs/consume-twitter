import { fetchTwits, fetchTwitsFulfilled, fetchTwitsRejected } from "./actions";
import { createState, createLoadingState, createErrorState } from "./props";

export const twitsReducer = (
  state = { twits: {}, isLoading: true, error: null },
  action
) => {
  switch (action.type) {
    case fetchTwits.type:
      return createLoadingState(state, action.payload);
    case fetchTwitsFulfilled.type:
      return createState(state, action.payload);
    case fetchTwitsRejected.type:
      return createErrorState(state, action.payload);
    default:
      return state;
  }
};
