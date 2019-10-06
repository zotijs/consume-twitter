import { combineEpics } from "redux-observable";
import { twitsEpic } from "./twitsEpic";

export default combineEpics(twitsEpic);
