// const actionCreator = type => payload => ({
//   type,
//   payload
// });

const actionCreator = type => {
  const actionCreatorFunc = payload => ({
    type,
    payload
  });
  actionCreatorFunc.type = type;
  return actionCreatorFunc;
};

export { actionCreator };
