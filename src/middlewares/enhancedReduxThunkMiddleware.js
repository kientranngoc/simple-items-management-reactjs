const _SUCCESS = '_SUCCESS'
const _FAILURE = '_FAILURE'

const enhancedReduxThunkMiddleware = () => (next) => async (action) => {
  next({ type: action['type'], payload: action['payload'] })
  if (action['promise']) {
    try {
      const result = await action['promise']
      next({ type: action['type'] + _SUCCESS, payload: result })
    } catch (e) {
      next({ type: action['type'] + _FAILURE, payload: e })
    }
  }
}

export default enhancedReduxThunkMiddleware
