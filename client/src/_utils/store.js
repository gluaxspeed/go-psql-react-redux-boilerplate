import { createStore, compose, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';

import rootReducer from '../_reducers';

const loggerMiddleware = createLogger();

let mode;

if(process.env.NODE_ENV === 'development') {
  console.log('here')
  let devTools = window.__REDUX_DEVTOOLS_EXTENSION__ && 
    window.__REDUX_DEVTOOLS_EXTENSION__();

  devTools = a => a;

  mode = createStore(
    rootReducer,
    {},
    compose(
      applyMiddleware(
        composeWithDevTools,
        devTools,
        loggerMiddleware,
        thunk
      )
    ),
  );
} else {
  console.log('here instead')
  mode = createStore(
    rootReducer,
    {},
    compose(
      applyMiddleware(
        loggerMiddleware,
        thunk
      )
    )
  );
}

console.log(typeof mode)

export { mode as store };