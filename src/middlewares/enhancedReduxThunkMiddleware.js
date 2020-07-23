const SUCCESS = '_SUCCESS';
const FAILURE = '_FAILURE';

const enhancedReduxThunkMiddleware = ({ dispatch, getState }) => (
  next,
) => async (action) => {
  // Thunk action
  if (typeof action === 'function') {
    return action(dispatch, getState);
  }

  // Promise action
  const { type, payload, promise } = action;
  next({ type, payload });
  if (promise) {
    try {
      const result = await promise;
      next({
        type: type + SUCCESS,
        payload: result,
      });
      return { success: true, result };
    } catch (error) {
      next({
        type: type + FAILURE,
        payload: error,
      });
      return { success: false, error };
    }
  }

  // Normal action
  return next(action);
};

export default enhancedReduxThunkMiddleware;
