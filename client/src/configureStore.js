/* eslint-disable  no-underscore-dangle */
import { createStore, applyMiddleware, compose } from 'redux';
import { fromJS } from 'immutable';
import createSagaMiddleware from 'redux-saga';
import { routerMiddleware } from 'connected-react-router/immutable';

import createReducer from './reducers';

const sagaMiddleware = createSagaMiddleware();

export default function configureStore(initalState = {}, history) {
  const middlewares = [
    sagaMiddleware,
    routerMiddleware(history)
  ];

  const enhancers = [
    applyMiddleware(...middlewares)
  ];

  const composeEnhancers = process.env.NODE_ENV !== 'production'
    && typeof window === 'object'
    && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
      shouldHotReload: false,
    }) : compose;

  const store = createStore(
    createReducer({}, history),
    fromJS(initalState),
    composeEnhancers(...enhancers)
  );

  store.runSaga = sagaMiddleware.run;
  store.injectedReducers = {};
  store.injectedSagas = {};

  if (module.hot) {
    module.hot.accept('./reducers', () => {
      store.replaceReducer(createReducer(store.injectedReducers, history));
    });
  }

  return store;
}
