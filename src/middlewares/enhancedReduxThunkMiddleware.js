const _SUCCESS = "_SUCCESS";
const _FAILURE = "_FAILURE";

const enhancedReduxThunkMiddleware = ({ dispatch, getState }) => (
  next
) => async (action) => {
  // Thunk action
  if (typeof action === "function") {
    return action(dispatch, getState);
  }
  // Normal action
  if (!action.promise) {
    return next(action);
  }
  // Promise action
  const { type, payload, promise } = action;
  next({ type, payload });
  if (promise) {
    try {
      const result = await promise;
      next({
        type: type + _SUCCESS,
        payload: result,
      });
      return { success: true, result };
    } catch (error) {
      next({
        type: type + _FAILURE,
        payload: error,
      });
      return { success: false, error };
    }
  }
};

export default enhancedReduxThunkMiddleware;
