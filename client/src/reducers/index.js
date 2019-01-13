import { fromJS } from 'immutable';
import { connectRouter } from 'connected-react-router/immutable'
import { combineReducers } from 'redux-immutable';
import { LOCATION_CHANGE } from 'react-router-redux';

import history from 'utils/history';

function globalReducer(state = fromJS({email: false}), action) {
  switch (action.type) {
    default:
      return state;
  }
}

const routeInitialState = fromJS({
  location: null
});

function routeReducer(state = routeInitialState, action) {
  switch (action.type) {
    case LOCATION_CHANGE:
      return state.merge({
        location: action.payload
      });

    default:
      return state;
  }
}

export default function createReducer(injectedReducers) {
  return combineReducers({
    route: routeReducer,
    global: globalReducer,
    router: connectRouter(history),
    ...injectedReducers
  });
}
