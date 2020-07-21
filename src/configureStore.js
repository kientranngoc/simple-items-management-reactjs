import { createStore, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';
import enhancedReduxThunkMiddleware from './middlewares/enhancedReduxThunkMiddleware';
import rootReducer from './reducers';

const configureStore = () => {
  const middlewares = [thunk, enhancedReduxThunkMiddleware];
  if (process.env.NODE_ENV !== 'production') {
    middlewares.push(createLogger());
  }

  return createStore(rootReducer, applyMiddleware(...middlewares));
};

export default configureStore;
