//state creators
const createState = ({ twits }, payload) => ({
  twits: { ...twits, [payload.lastEventId]: payload },
  isLoading: false,
  error: null
});

const createLoadingState = (state, payload) => ({
  ...state,
  isLoading: true,
  error: null
});

const createErrorState = (state, payload) => ({
  ...state,
  isLoading: false,
  error: { ...payload }
});

//state selectors
const twits = ({ twitsReducer }) =>
  twitsReducer && twitsReducer.twits && Object.values(twitsReducer.twits);

const isLoading = ({ twitsReducer }) => twitsReducer && twitsReducer.isLoading;

const error = ({ twitsReducer }) => twitsReducer && twitsReducer.error;

export {
  createState,
  createLoadingState,
  createErrorState,
  twits,
  isLoading,
  error
};
