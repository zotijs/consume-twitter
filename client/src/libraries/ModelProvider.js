import React from "react";
import { Provider } from "react-redux";
import { combineReducers } from "redux";
import { createEpicMiddleware, combineEpics } from "redux-observable";
import configStore from "./configStore";

const ModelProvider = ({
  epics = [],
  reducers = [],
  middlewares = [],
  initialState = null,
  options = null,
  children
}) => {
  const rootEpic = combineEpics(...epics);
  const rootReducer = combineReducers(
    reducers.reduce(
      (reducersObj, reducer) => ({ ...reducersObj, [reducer.name]: reducer }),
      {}
    )
  );

  const epicMiddleware = createEpicMiddleware({
    dependencies: { options }
  });

  const _middlewares = [...middlewares, epicMiddleware];
  const store = configStore(rootReducer, initialState, _middlewares);

  epicMiddleware.run(rootEpic);

  return <Provider store={store}>{children}</Provider>;
};

export default ModelProvider;
