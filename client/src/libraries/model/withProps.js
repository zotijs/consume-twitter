import { connect } from "react-redux";

const EMPTY_OBJ = {};

const mapStateToProps = propSelectors => (state, ownProps) =>
  Object.entries(propSelectors).reduce((props, [key, propSelector]) => {
    props[key] = propSelector(state, ownProps);
    return props;
  }, {});

const mapDispatchToProps = actionCreatorMappers => (dispatch, ownProps) =>
  Object.entries(actionCreatorMappers).reduce((props, [key, action]) => {
    props[key] = (...args) => dispatch(action(...args, ownProps));
    return props;
  }, {});

const withProps = (
  stateProps = EMPTY_OBJ,
  actionProps = EMPTY_OBJ,
  mergeProps,
  config
) =>
  connect(
    mapStateToProps(stateProps || EMPTY_OBJ),
    mapDispatchToProps(actionProps || EMPTY_OBJ),
    mergeProps,
    config
  );

export default withProps;
