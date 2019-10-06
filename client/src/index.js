import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware, compose } from "redux";
import { createEpicMiddleware } from "redux-observable";
import reducers from "./reducers";
import epics from "./epics";
import * as serviceWorker from "./serviceWorker";
import "./styles.module.css";
import App from "./components/App";

/*
enable redux dev tools debug sessions in order to 
save all data in redux store betweeh refreshes of the page:
http://localhost:3000/?debug_session=<some_random_string>
*
*
we could use named debug sessions in order to jump between states we want to debug
for example:
httep://localhost:3000/?debug_session=logged_in //-> for the state where the user is logged in
http://localhost:3000/?debug_session=logged_out //-> for the state where the user is logged out
*/

const epicMiddleware = createEpicMiddleware();

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  reducers,
  composeEnhancers(applyMiddleware(epicMiddleware))
);

epicMiddleware.run(epics);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.querySelector("#root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
