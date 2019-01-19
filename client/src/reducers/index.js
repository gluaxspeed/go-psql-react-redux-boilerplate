import { fromJS } from 'immutable';
import { connectRouter } from 'connected-react-router/immutable'
import { combineReducers } from 'redux-immutable';
import { LOCATION_CHANGE } from 'react-router-redux';

import history from 'utils/history';
import globalReducer from 'containers/App/reducer.js';

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
