/* eslint-disable consistent-return */
import invariant from 'invariant';
import isEmpty from 'lodash/isEmpty';
import isFunction from 'lodash/isFunction';
import isString from 'lodash/isString';

import checkStore from './checkStore';
import createReducer from '../reducers';

export function injectReducerFactory(store, isValid) {
  return function injectReduce(key, reducer) {
    if (!isValid) return checkStore(store);

    invariant(
      isString(key) && !isEmpty(key) && isFunction(reducer),
      'injectReducer: Expected \'reducer\' to be reducer function'
    );

    if (Reflect.has(store.injectedReducers, key) && store.injectedReducers[key] === reducer) return;

    store.injectedReducers[key] = reducer;
    store.replaceReducer(createReducer(store.injectedReducers));
  };
}

export default function getInjectors(store) {
  checkStore(store);

  return {
    injectReducer: injectReducerFactory(store, true)
  };
}
