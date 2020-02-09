import { fromEvent } from "rxjs";
import { map, catchError, switchMap, takeUntil, tap } from "rxjs/operators";
import { ofType } from "redux-observable";
import { fetchTwits, fetchTwitsFulfilled } from "./actions";

const twitsEvent = new EventSource("/statuses");
const twits$ = fromEvent(twitsEvent, "message");

export default action$ =>
  action$.pipe(
    ofType(fetchTwits.type),
    switchMap(() =>
      twits$.pipe(
        map(payload => fetchTwitsFulfilled(payload)) //,
        //tap(payload => console.log(payload))
      )
    ),
    takeUntil(action$.ofType("STOP_SSE_TYPE")) //TO-DO
  );
