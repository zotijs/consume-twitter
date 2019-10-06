import { combineReducers } from "redux";
import { fetchTwitsReducer, fetchTwitsErrorReducer } from "./twitsReducer";

export default combineReducers({
  twits: fetchTwitsReducer,
  error: fetchTwitsErrorReducer
});
