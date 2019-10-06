import { of } from "rxjs";
import { ajax } from "rxjs/ajax";
import { map, catchError, mergeMap } from "rxjs/operators";
import { ofType } from "redux-observable";
import { fetchTwitsFulfilled } from "../actions";
import { FETCH_TWITS, FETCH_TWITS_REJECTED } from "../actions/types";

export const twitsEpic = action$ =>
  action$.pipe(
    ofType(FETCH_TWITS),
    mergeMap(action =>
      ajax({
        url: `/`,
        method: "POST",
        body: action.payload
      }).pipe(
        map(response => fetchTwitsFulfilled(response)),
        catchError(error =>
          of({
            type: FETCH_TWITS_REJECTED,
            payload: error.xhr.response,
            error: true
          })
        )
      )
    )
  );
