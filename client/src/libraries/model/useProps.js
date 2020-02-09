import { useMemo } from "react";

import { bindActionCreators } from "redux";

import { useSelector, useDispatch, shallowEqual } from "react-redux";

const EMPTY_OBJ = {};

const createProps = (propSelectors = EMPTY_OBJ) => state =>
  Object.entries(propSelectors).reduce((props, [key, propSelector]) => {
    props[key] = propSelector(state);
    return props;
  }, {});

const useProps = (
  statePropsCreators = EMPTY_OBJ,
  actionPropsCreators = EMPTY_OBJ
) => {
  const stateProps = useSelector(createProps(statePropsCreators), shallowEqual);

  const dispatch = useDispatch();

  const actionProps = useMemo(
    () => bindActionCreators(actionPropsCreators, dispatch),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  return { ...stateProps, ...actionProps };
};

export default useProps;
